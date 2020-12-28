import { Schema, model, Document } from 'mongoose';

const schema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: false
  },
  state: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  images: {
    type: Object,
    required: false
  }
});

interface IPhoto extends Document {
  name: string;
  detail: string;
  url: string;
  state: string;
  date: string;
  images: any[];
}

let Gallery = model<IPhoto>('Gallery', schema);
let PhotoModel = model<IPhoto>('Photo', schema);

export default {
  Gallery, PhotoModel
}

