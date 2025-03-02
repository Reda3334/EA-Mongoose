import express from 'express';
import mongoose from 'mongoose';
import { UserModel, IUser } from './user.js';
import productRoutes from './productRoutes.js';
import { ProductModel, IProduct } from './product.js';



async function main() {
  mongoose.set('strictQuery', true); // Mantiene el comportamiento actual

  await mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar:', err));

  // Define embedded products
  const product1: IProduct = {
    name: 'Product 1',
    price: 50,
    description: 'Description for product 1'
  };

  const product2: IProduct = {
    name: 'Product 2',
    price: 75,
    description: 'Description for product 2'
  };

  // Create a user with embedded products
  const user1: IUser = {
    name: 'Bill',
    email: 'bill@initech.com',
    avatar: 'https://i.imgur.com/dM7Thhn.png',
    products: [product1, product2] // Embedding products
  };

  console.log("user1", user1);
  const newUser = new UserModel(user1);
  const user2: IUser = await newUser.save();
  console.log("user2", user2);

  // findById devuelve un objeto usando el _id.
  const user3: IUser | null = await UserModel.findById(user2._id);
  console.log("user3", user3);

  // findOne devuelve un objeto usando un filtro.
  const user4: IUser | null = await UserModel.findOne({ name: 'Bill' });
  console.log("user4", user4);

  // Partial<IUser> Indica que el objeto puede tener solo algunos campos de IUser.
  // select('name email') solo devuelve name y email.
  // lean() devuelve un objeto plano de JS en lugar de un documento de Mongoose.
  const user5: Partial<IUser> | null = await UserModel.findOne({ name: 'Bill' })
    .select('name email').lean();
  console.log("user5", user5);

  const app = express();
  const port = 3000;

  app.use(express.json());
  app.use('/api', productRoutes);

  mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  // Example of using aggregation pipeline to get products by price range
  const minPrice = 10;
  const maxPrice = 100;
  const products = await ProductModel.aggregate([
    { $match: { price: { $gte: minPrice, $lte: maxPrice } } }, // Filter by price range
    { $sort: { price: 1 } } // Sort by price in ascending order
  ]);
  console.log("Products in price range:", products);
}

main();

    
