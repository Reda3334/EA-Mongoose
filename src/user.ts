import { Schema, model } from 'mongoose';
import { IProduct, productSchema } from './product.js';

// 1. Create an interface representing a TS object.
export interface IUser {
  name: string;
  email: string;
  avatar?: string;
  products?: IProduct[]; // Embedding products
  _id?: string;
}

// 2. Create a Schema corresponding to the document in MongoDB.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
  products: [productSchema] // Embedding products
});

// 3. Create a Model.
export const UserModel = model('User', userSchema);