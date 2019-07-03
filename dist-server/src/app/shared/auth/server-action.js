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
var evil_statics_1 = require("./evil-statics");
require("reflect-metadata");
var context_1 = require("../context");
var myServerAction = /** @class */ (function (_super) {
    __extends(myServerAction, _super);
    function myServerAction(name, types, options, originalMethod) {
        var _this = _super.call(this, 'api/', name) || this;
        _this.types = types;
        _this.options = options;
        _this.originalMethod = originalMethod;
        return _this;
    }
    myServerAction.prototype.execute = function (info, req) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = { data: {} };
                        return [4 /*yield*/, evil_statics_1.evilStatics.dataSource.doInTransaction(function (ds) { return __awaiter(_this, void 0, void 0, function () {
                                var context, i, _a, err_1;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            context = new context_1.ServerContext();
                                            context.setReq(req);
                                            context.setDataProvider(ds);
                                            if (!this.options.allowed(context))
                                                throw 'not allowed';
                                            for (i = 0; i < this.types.length; i++) {
                                                if (info.args.length < i) {
                                                    info.args.push(undefined);
                                                }
                                                if (this.types[i] == context_1.Context || this.types[i] == context_1.ServerContext) {
                                                    info.args[i] = context;
                                                }
                                            }
                                            _b.label = 1;
                                        case 1:
                                            _b.trys.push([1, 3, , 4]);
                                            _a = result;
                                            return [4 /*yield*/, this.originalMethod(info.args)];
                                        case 2:
                                            _a.data = _b.sent();
                                            return [3 /*break*/, 4];
                                        case 3:
                                            err_1 = _b.sent();
                                            console.log(err_1);
                                            throw err_1;
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return myServerAction;
}(radweb_1.Action));
exports.myServerAction = myServerAction;
exports.actionInfo = {
    allActions: [],
    runningOnServer: false
};
function RunOnServer(options) {
    return function (target, key, descriptor) {
        var originalMethod = descriptor.value;
        var types = Reflect.getMetadata("design:paramtypes", target, key);
        var serverAction = new myServerAction(key, types, options, function (args) { return originalMethod.apply(undefined, args); });
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!exports.actionInfo.runningOnServer) return [3 /*break*/, 2];
                            return [4 /*yield*/, serverAction.run({ args: args })];
                        case 1: return [2 /*return*/, (_a.sent()).data];
                        case 2: return [4 /*yield*/, originalMethod.apply(undefined, args)];
                        case 3: return [2 /*return*/, (_a.sent())];
                    }
                });
            });
        };
        exports.actionInfo.allActions.push(descriptor.value);
        descriptor.value[exports.serverActionField] = serverAction;
        return descriptor;
    };
}
exports.RunOnServer = RunOnServer;
exports.serverActionField = Symbol('serverActionField');
//# sourceMappingURL=server-action.js.map