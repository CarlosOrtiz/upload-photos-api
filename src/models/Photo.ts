import { Schema, model, Document } from 'mongoose';

const schema = new Schema({
  name: String,
  detail: String,
  url: String,
  state: String,
  date: String
});

interface IPhoto extends Document {
  name: string;
  detail: string;
  url: string;
  state: string;
  date: string;
}

export default model<IPhoto>('Photo', schema);
