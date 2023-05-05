import { model, Schema } from 'mongoose';
import { POST_SCHEMA_NAME } from '../../util';

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    creator: {
      type: Object,
    },
  },
  { timestamps: true },
);

export const Post = model(POST_SCHEMA_NAME, postSchema);
