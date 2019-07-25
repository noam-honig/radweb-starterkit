import { CustomModuleLoader } from '../../../../radweb/src/app/server/CustomModuleLoader';
let moduleLoader = new CustomModuleLoader('/dist-server/radweb');
import * as express from 'express';
import * as secure from 'express-force-https';
import * as compression from 'compression';
import { ExpressBridge } from 'radweb-server';
import * as fs from 'fs';
import { serverInit } from './serverInit';
import { registerActionsOnServer } from "../shared/auth/server-action";
import '../app.module';
import { Context, UserInfo } from "radweb";
import { registerEntitiesOnServer } from "radweb-server";


import { ServerSignIn } from "../shared/auth/server-sign-in";
import { JWTCookieAuthorizationHelper } from '../shared/auth/jwt-cookie-authoerization-helper';

serverInit().then(async (dataSource) => {

    let app = express();
    app.use(compression());

    if (!process.env.DISABLE_HTTPS)
        app.use(secure);

    let eb = new ExpressBridge<UserInfo>(app);

    var tokenSignKey = process.env.TOKEN_SIGN_KEY;
    ServerSignIn.helper = new JWTCookieAuthorizationHelper<UserInfo>(eb, tokenSignKey);

    let apiArea = eb.addArea('/' + Context.apiBaseUrl);

    registerActionsOnServer(apiArea, dataSource);
    registerEntitiesOnServer(apiArea, dataSource);

    app.use(express.static('dist'));

    app.use('/*', async (req, res) => {

        const index = 'dist/index.html';
        if (fs.existsSync(index)) {
            res.send(fs.readFileSync(index).toString());
        }
        else {
            res.send('No Result' + fs.realpathSync(index));

        }
    });

    let port = process.env.PORT || 3000;
    app.listen(port);
});