import { Schema, model } from 'mongoose';

// 1. Create an interface representing a TS object.
export interface IProduct {
  name: string;
  price: number;
  description?: string;
  _id?: string;
}

// 2. Create a Schema corresponding to the document in MongoDB.
export const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String
});

// 3. Create a Model.
export const ProductModel = model('Product', productSchema);