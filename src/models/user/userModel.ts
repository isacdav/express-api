import { model, Schema } from 'mongoose';
import { USER_SCHEMA_NAME } from '../../util';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'New user here!',
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  { timestamps: true },
);

export const User = model(USER_SCHEMA_NAME, userSchema);
