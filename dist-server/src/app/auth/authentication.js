"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var radweb_1 = require("radweb");
var environment_1 = require("../../environments/environment");
//import { JwtHelperService } from '@auth0/angular-jwt';
var authToken = 'auth-token';
var Authentication = /** @class */ (function () {
    function Authentication() {
        var _this = this;
        this.valid = false;
        this.validateToken = function (x) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                try {
                    result = this.jwt.verify(x, this.tokenSignKey);
                }
                catch (err) { }
                return [2 /*return*/, result];
            });
        }); };
        this.setEmptyInfo();
    }
    Authentication.prototype.initForBrowser = function (jwt) {
        var _this = this;
        this.jwt = jwt;
        if (typeof (Storage) !== 'undefined') {
            try {
                var load = function (what) {
                    if (what && what != 'undefined') {
                        _this.setToken(what);
                    }
                };
                load(sessionStorage.getItem(authToken));
                if (!this._info)
                    load(localStorage.getItem(authToken));
            }
            catch (err) {
                console.log(err);
            }
        }
    };
    Authentication.prototype.loggedIn = function (info, remember) {
        if (info.valid) {
            this.setToken(info.authToken);
            if (typeof (Storage) !== 'undefined') {
                sessionStorage.setItem(authToken, this._token);
                if (remember)
                    localStorage.setItem(authToken, this._token);
            }
        }
        else {
            this.setEmptyInfo();
        }
    };
    Authentication.prototype.setToken = function (token) {
        this._info = this.jwt.decode(token); // new JwtHelperService().decodeToken(token) as T;//  jwt.decode(token) as T;
        if (this._info) {
            this.valid = true;
            this._token = token;
            this.__theInfo = Promise.resolve(this._info);
        }
        if (this.tokenInfoChanged)
            this.tokenInfoChanged();
    };
    Authentication.prototype.setEmptyInfo = function () {
        this.valid = false;
        this._token = '';
        this._info = undefined;
        if (this.tokenInfoChanged)
            this.tokenInfoChanged();
    };
    Authentication.prototype.signout = function () {
        this.setEmptyInfo();
        if (typeof (Storage) !== 'undefined') {
            sessionStorage.removeItem(authToken);
            localStorage.removeItem(authToken);
        }
    };
    Object.defineProperty(Authentication.prototype, "info", {
        get: function () {
            if (!this.valid)
                return undefined;
            return this._info;
        },
        enumerable: true,
        configurable: true
    });
    Authentication.prototype.AddAuthInfoToRequest = function () {
        var _this = this;
        return function (add) {
            if (_this.info)
                add(authToken, _this._token);
        };
    };
    Authentication.prototype.applyTo = function (server, area, jwt) {
        var _this = this;
        this.jwt = jwt;
        server.addRequestProcessor(function (req) { return __awaiter(_this, void 0, void 0, function () {
            var h, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        h = req.getHeader(authToken);
                        if (!this.validateToken) return [3 /*break*/, 2];
                        _a = req;
                        return [4 /*yield*/, this.validateToken(h)];
                    case 1:
                        _a.authInfo = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, true];
                }
            });
        }); });
        server.addAllowedHeader(authToken);
        area.addAction(new GetCurrentSession(environment_1.environment.serverUrl, undefined, this.AddAuthInfoToRequest()));
    };
    Authentication.prototype.createTokenFor = function (item) {
        return this.jwt.sign(item, this.tokenSignKey);
    };
    Authentication.prototype.getAuthInfoAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.__theInfo) {
                    this.__theInfo = new GetCurrentSession(environment_1.environment.serverUrl, undefined, this.AddAuthInfoToRequest()).run(undefined).then(function (x) {
                        _this._info = x;
                        return _this.info;
                    });
                }
                return [2 /*return*/, this.__theInfo];
            });
        });
    };
    return Authentication;
}());
exports.Authentication = Authentication;
var GetCurrentSession = /** @class */ (function (_super) {
    __extends(GetCurrentSession, _super);
    function GetCurrentSession() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetCurrentSession.prototype.execute = function (info, context) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, context.authInfo];
            });
        });
    };
    return GetCurrentSession;
}(radweb_1.Action));
exports.GetCurrentSession = GetCurrentSession;
//# sourceMappingURL=authentication.js.map