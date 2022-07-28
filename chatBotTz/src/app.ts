import express, {Application, Request, Response} from 'express';
import {connect} from 'mongoose';
import AnimalRouter from './routers/animals';
import bodyParser from 'body-parser';

const app: Application = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/static', express.static('img'));

app.get('/', (req: Request, res: Response) => {
    res.send('hello');
});
// eslint-disable-next-line @typescript-eslint/no-var-requires
app.use('/api', AnimalRouter);
app.use('/static', express.static('img'))

async function start() {
    try {
        await connect('mongodb://localhost:27017/tz', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log('Server running'));
    } catch (error) {
        console.log('Error: ' + error.message);
        process.exit(1);
    }
}

start();
