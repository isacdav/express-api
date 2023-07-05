import { json } from 'body-parser';
import { default as dotenv } from 'dotenv';
import { default as express } from 'express';
import { errorHandler, setHeaders } from './middlewares';
import { authRoutes, feedRoutes } from './routes';
import { Database } from './services';

const app = express();

dotenv.config();

app.use(json());
app.use(setHeaders);

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use(errorHandler);

Database.connect((success) => {
  const port = process.env.PORT || 4000;
  if (success) {
    app.listen(port);
    console.log(`Server is running on port ${port}`);
  }
});
