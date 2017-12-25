import * as express from 'express';
let app = express();
let port = 3000;

app.route('/').get((req, res) => res.send('hello world'));
app.listen(port);
