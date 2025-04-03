import express, { Request, Response, NextFunction } from 'express';
import db from './models';
import canchaRoutes from './routes/canchas';
import pendingCanchaRoutes from './routes/pendingCancha';
import bodyParser from 'body-parser';
import cors from "cors";
import 'dotenv/config'

const app = express();

const corsOptions = {
  origin: [process.env.CLIENT_BASE_URL || 'http://localhost:3000', 'http://localhost:3001', 'https://www.getpostman.com'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // Allow cookies, if your application uses them
  credentials: true,
  optionsSuccessStatus: 204, 
  // headers: 'Content-Type, Authorization, Content-Length, X-Requested-With',
};

app.use(cors(corsOptions)); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.disable('x-powered-by')

// TODO: imagenes canchas
app.use('/uploads', express.static('uploads'));


// TODO: port on env
const PORT = process.env.PORT || 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello my pelotari friend!');
});
app.use('/canchas', canchaRoutes);
app.use('/pending-canchas', pendingCanchaRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

// db sync
const syncDatabase = async () => {
  try {
    // await (db as any).sequelize.sync({ force: true });
    await (db as any).sequelize.sync({ force: false });
    console.log('\nDatabase successfully synchronized.');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
};

// sync db and after start server
syncDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} \n`);
  });
});
