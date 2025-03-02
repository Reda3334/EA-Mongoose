import { Request, Response } from 'express';
import { ProductModel, IProduct } from './product.js';

// Create a new product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product: IProduct = req.body;
    const newProduct = new ProductModel(product);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get a product by ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update a product by ID
export const updateProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Delete a product by ID
export const deleteProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// List all products
export const listProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
// Get products by price range using aggregation pipeline
export const getProductsByPriceRange = async (req: Request, res: Response): Promise<void> => {
    try {
      const { minPrice, maxPrice } = req.query;
      const products = await ProductModel.aggregate([
        { $match: { price: { $gte: Number(minPrice), $lte: Number(maxPrice) } } }, // Filter by price range
        { $sort: { price: 1 } } // Sort by price in ascending order
      ]);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };