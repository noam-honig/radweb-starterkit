"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authentication_1 = require("./authentication");
var environment_1 = require("../../environments/environment");
var radweb_1 = require("radweb");
var auth = new authentication_1.Authentication();
var passwordHelper = {
    generateHash: function (x) { throw ""; },
    verify: function (x, y) { throw ""; }
};
exports.evilStatics = {
    passwordHelper: passwordHelper,
    auth: auth,
    //dataSource: new radweb.LocalStorageDataProvider() as radweb.DataProviderFactory
    dataSource: new radweb_1.RestDataProvider(environment_1.environment.serverUrl + 'api', auth.AddAuthInfoToRequest()),
    routes: {
        families: '',
        myFamilies: '',
        updateInfo: '',
        login: '',
        register: '',
        myWeeklyFamilies: '',
        weeklyFamiliesPack: ''
    },
};
//# sourceMappingURL=evil-statics.js.map