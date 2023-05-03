import { json } from 'body-parser';
import { default as express } from 'express';
import { feedRoutes } from './routes';
import { setHeaders } from './middlewares';

const app = express();

app.use(json());
app.use(setHeaders);

app.use('/feed', feedRoutes);

app.listen(4000);
