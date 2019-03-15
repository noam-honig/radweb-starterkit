"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authentication_1 = require("./authentication");
var radweb_1 = require("radweb");
var environment_1 = require("../../../environments/environment");
var auth = new authentication_1.Authentication();
var passwordHelper = {
    generateHash: function (x) { throw ""; },
    verify: function (x, y) { throw ""; }
};
exports.evilStatics = {
    passwordHelper: passwordHelper,
    auth: auth,
    dataSource: new radweb_1.RestDataProvider(environment_1.environment.serverUrl + 'api', auth.AddAuthInfoToRequest()),
};
//# sourceMappingURL=evil-statics.js.map