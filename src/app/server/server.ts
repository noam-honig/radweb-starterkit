
import * as express from 'express';
import * as secure from 'express-force-https';
import * as compression from 'compression';
import { ExpressBridge, ActualSQLServerDataProvider } from 'radweb-server';
import { DataApi } from 'radweb';
import * as fs from 'fs';
import { evilStatics } from '../shared/auth/evil-statics';
import { serverInit } from './serverInit';
import { serverActionField, myServerAction, actionInfo } from "../shared/auth/server-action";
import { SiteArea } from "radweb-server";
import '../app.module';
import { ContextEntity, ServerContext, allEntities } from "../shared/context";
import * as jwt from 'jsonwebtoken';
import * as passwordHash from 'password-hash';
import { AuthOnServer } from '../shared/auth/auth-on-server';
import { AuthHelperOnServer } from '../shared/auth/auth-helper-on-server';
import { UserInfo } from '../shared/auth/userInfo';

serverInit().then(async () => {


    let app = express();

    if (process.env.logSqls) {
        ActualSQLServerDataProvider.LogToConsole = true;
    }

    app.use(compression());

    if (!process.env.DISABLE_HTTPS)
        app.use(secure);
    let port = process.env.PORT || 3000;

    let eb = new ExpressBridge<UserInfo>(app);

    let allUsersAlsoNotLoggedIn = eb.addArea('/api');
    var tokenSignKey = process.env.TOKEN_SIGN_KEY;
    AuthOnServer.helper = new AuthHelperOnServer<UserInfo>(eb, {
        verify: (t) => jwt.verify(t, tokenSignKey),
        sign: (i) => jwt.sign(i, tokenSignKey),
        decode: t => jwt.decode(t)
    });

    var addAction = (area: SiteArea<UserInfo>, a: any) => {
        let x = <myServerAction>a[serverActionField];
        if (!x) {
            throw 'failed to set server action, did you forget the RunOnServerDecorator?';
        }
        area.addAction(x);
    };


    actionInfo.runningOnServer = true;
    AuthOnServer.helper.applyTo(eb, allUsersAlsoNotLoggedIn);
    evilStatics.passwordHelper = {
        generateHash: p => passwordHash.generate(p),
        verify: (p, h) => passwordHash.verify(p, h)
    }

    actionInfo.allActions.forEach(a => {
        addAction(allUsersAlsoNotLoggedIn, a);
    });
    let errors = '';
    //add Api Entries
    allEntities.forEach(e => {
        let x = new ServerContext().for(e).create();
        if (x instanceof ContextEntity) {
            let j = x;
            allUsersAlsoNotLoggedIn.add(r => {
                let c = new ServerContext();
                c.setReq(r);
                let y = j._getEntityApiSettings(c);
                if (y.allowRead === undefined)
                    errors += '\r\n' + j.__getName()
                return new DataApi(c.create(e), y);
            });
        }
    });
    if (errors.length > 0) {
        console.log('Security not set for:' + errors);
    }

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
    app.listen(port);
});