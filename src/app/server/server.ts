import { environment } from './../../environments/environment';
import * as models from './../models';
import * as express from 'express';
import * as radweb from 'radweb';
import { SQLServerDataProvider, ExpressBridge } from 'radweb/server';
let app = express();
let port = 3000;

let sqlServer = new SQLServerDataProvider('sa', 'MASTERKEY', '127.0.0.1', 'northwind', 'sqlexpress');
environment.dataSource = sqlServer;

let eb = new ExpressBridge(app);
let dataApi = eb.addArea('/dataApi');
dataApi.addSqlDevHelpers(sqlServer);

app.route('/').get((req, res) => res.send('hello world'));

app.listen(port);
