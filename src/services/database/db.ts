import { connect as mongoConnect } from 'mongoose';

export const connect = async (callback: (success: boolean) => void) => {
  try {
    await mongoConnect(process.env.MONGO_CONN_STRING as string);

    callback(true);
  } catch (error) {
    console.log(error);
    callback(false);
  }
};
