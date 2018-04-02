import { environment } from './../../environments/environment';
import * as models from './../models';
import * as express from 'express';
import * as radweb from 'radweb';
import { SQLServerDataProvider, ExpressBridge, PostgresDataProvider } from 'radweb/server';
import { Pool } from 'pg';
import { config } from 'dotenv';
config();

let app = express();
let port = process.env.PORT || 3000;


if (!process.env.DATABASE_URL) {
    console.log("No DATABASE_URL environment variable found, if you are developing locally, please add a '.env' with DATABASE_URL='postgres://*USERNAME*:*PASSWORD*@*HOST*:*PORT*/*DATABASE*'");
}

environment.dataSource = new PostgresDataProvider(new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:true
}));

let eb = new ExpressBridge(app);
let dataApi = eb.addArea('/dataApi');

dataApi.add(new models.Categories());

app.use(express.static( 'dist'));


app.listen(port);
