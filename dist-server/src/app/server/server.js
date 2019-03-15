"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var secure = require("express-force-https");
var compression = require("compression");
var radweb_server_1 = require("radweb-server");
var radweb_1 = require("radweb");
var fs = require("fs");
var evil_statics_1 = require("../shared/auth/evil-statics");
var serverInit_1 = require("./serverInit");
var server_events_1 = require("./server-events");
var server_action_1 = require("../shared/auth/server-action");
require("../helpers/helpers.component");
require("../app.module");
var context_1 = require("../shared/context");
var jwt = require("jsonwebtoken");
var passwordHash = require("password-hash");
serverInit_1.serverInit().then(function () { return __awaiter(_this, void 0, void 0, function () {
    function sendIndex(res) {
        return __awaiter(this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                index = 'dist/index.html';
                if (fs.existsSync(index)) {
                    res.send(fs.readFileSync(index).toString());
                }
                else {
                    res.send('No Result' + fs.realpathSync(index));
                }
                return [2 /*return*/];
            });
        });
    }
    var app, serverEvents, port, eb, allUsersAlsoNotLoggedIn, addAction, errors;
    var _this = this;
    return __generator(this, function (_a) {
        app = express();
        if (!process.env.DISABLE_SERVER_EVENTS) {
            serverEvents = new server_events_1.ServerEvents(app);
        }
        if (process.env.logSqls) {
            radweb_server_1.ActualSQLServerDataProvider.LogToConsole = true;
        }
        app.use(compression());
        if (!process.env.DISABLE_HTTPS)
            app.use(secure);
        port = process.env.PORT || 3000;
        eb = new radweb_server_1.ExpressBridge(app);
        allUsersAlsoNotLoggedIn = eb.addArea('/api');
        evil_statics_1.evilStatics.auth.tokenSignKey = process.env.TOKEN_SIGN_KEY;
        addAction = function (area, a) {
            var x = a[server_action_1.serverActionField];
            if (!x) {
                throw 'failed to set server action, did you forget the RunOnServerDecorator?';
            }
            area.addAction(x);
        };
        server_action_1.actionInfo.runningOnServer = true;
        evil_statics_1.evilStatics.auth.applyTo(eb, allUsersAlsoNotLoggedIn, {
            verify: function (t, k) { return jwt.verify(t, k); },
            sign: function (i, k) { return jwt.sign(i, k); },
            decode: function (t) { return jwt.decode(t); }
        });
        evil_statics_1.evilStatics.passwordHelper = {
            generateHash: function (p) { return passwordHash.generate(p); },
            verify: function (p, h) { return passwordHash.verify(p, h); }
        };
        server_action_1.actionInfo.allActions.forEach(function (a) {
            addAction(allUsersAlsoNotLoggedIn, a);
        });
        errors = '';
        //add Api Entries
        context_1.allEntities.forEach(function (e) {
            var x = new context_1.ServerContext().for(e).create();
            if (x instanceof context_1.ContextEntity) {
                var j_1 = x;
                allUsersAlsoNotLoggedIn.add(function (r) {
                    var c = new context_1.ServerContext();
                    c.setReq(r);
                    var y = j_1._getEntityApiSettings(c);
                    if (y.allowRead === undefined)
                        errors += '\r\n' + j_1.__getName();
                    return new radweb_1.DataApi(c.create(e), y);
                });
            }
        });
        if (errors.length > 0) {
            console.log('Security not set for:' + errors);
        }
        app.get('/cache.manifest', function (req, res) {
            var result = "CACHE MANIFEST\n    CACHE:\n    /\n    /home\n    ";
            fs.readdirSync('dist').forEach(function (x) {
                result += "/" + x + "\n        ";
            });
            result += "\n    FALLBACK:\n    / /\n    \n    NETWORK:\n    /dataApi/";
            res.send(result);
        });
        app.use('/assets/apple-touch-icon.png', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    res.send(fs.readFileSync('dist/assets/apple-touch-icon.png'));
                }
                catch (err) {
                    res.statusCode = 404;
                    res.send(err);
                }
                return [2 /*return*/];
            });
        }); });
        app.use('/favicon.ico', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.contentType('ico');
                try {
                    res.send(fs.readFileSync('dist/favicon.ico'));
                }
                catch (err) {
                    res.statusCode = 404;
                    res.send(err);
                }
                return [2 /*return*/];
            });
        }); });
        app.get('', function (req, res) {
            sendIndex(res);
        });
        app.get('/index.html', function (req, res) {
            sendIndex(res);
        });
        app.use(express.static('dist'));
        app.use('/*', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.method == 'OPTIONS')) return [3 /*break*/, 1];
                        res.send('');
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, sendIndex(res)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        app.listen(port);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=server.js.map