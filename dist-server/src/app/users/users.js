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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var radweb = require("radweb");
var types_1 = require("../shared/types");
var context_1 = require("../shared/context");
var evil_statics_1 = require("../shared/auth/evil-statics");
var Users = /** @class */ (function (_super) {
    __extends(Users, _super);
    function Users(context) {
        var _this = _super.call(this, new UserId(context), {
            name: "Users",
            allowApiRead: true,
            allowApiDelete: context.isLoggedIn(),
            allowApiUpdate: context.isLoggedIn(),
            allowApiInsert: true,
            onSavingRow: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!context.onServer) return [3 /*break*/, 3];
                            if (this.password.value && this.password.value != this.password.originalValue && this.password.value != Users_1.emptyPassword) {
                                this.realStoredPassword.value = evil_statics_1.evilStatics.passwordHelper.generateHash(this.password.value);
                            }
                            return [4 /*yield*/, context.for(Users_1).count()];
                        case 1:
                            if ((_a.sent()) == 0)
                                this.admin.value = true;
                            return [4 /*yield*/, types_1.checkForDuplicateValue(this, this.name)];
                        case 2:
                            _a.sent();
                            if (this.isNew())
                                this.createDate.dateValue = new Date();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); },
            apiDataFilter: function () {
                if (!context.isLoggedIn())
                    return _this.id.isEqualTo("No User");
                else if (!(context.info.superAdmin))
                    return _this.id.isEqualTo(_this.context.info.helperId);
            }
        }) || this;
        _this.context = context;
        _this.name = new radweb.StringColumn({
            caption: "name",
            onValidate: function (v) {
                if (!v.value || v.value.length < 2)
                    _this.name.error = 'Name is too short';
            }
        });
        _this.realStoredPassword = new types_1.StringColumn({
            dbName: 'password',
            excludeFromApi: true
        });
        _this.password = new radweb.StringColumn({ caption: 'password', inputType: 'password', virtualData: function () { return _this.realStoredPassword.value ? Users_1.emptyPassword : ''; } });
        _this.createDate = new types_1.changeDate('Create Date');
        _this.admin = new types_1.BoolColumn();
        return _this;
    }
    Users_1 = Users;
    var Users_1;
    Users.emptyPassword = 'password';
    Users = Users_1 = __decorate([
        context_1.EntityClass,
        __metadata("design:paramtypes", [context_1.Context])
    ], Users);
    return Users;
}(types_1.IdEntity));
exports.Users = Users;
var UserId = /** @class */ (function (_super) {
    __extends(UserId, _super);
    function UserId(context, settingsOrCaption) {
        var _this = _super.call(this, settingsOrCaption) || this;
        _this.context = context;
        return _this;
    }
    UserId.prototype.getColumn = function () {
        var _this = this;
        return {
            column: this,
            getValue: function (f) { return (f ? (f).__getColumn(_this) : _this).getValue(); },
            hideDataOnInput: true,
            readonly: this.readonly,
            width: '200'
        };
    };
    UserId.prototype.getValue = function () {
        return this.context.for(Users).lookup(this).name.value;
    };
    UserId.prototype.getTheName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.context.for(Users).lookupAsync(this)];
                    case 1:
                        r = _a.sent();
                        if (r && r.name && r.name.value)
                            return [2 /*return*/, r.name.value];
                        return [2 /*return*/, ''];
                }
            });
        });
    };
    UserId.prototype.getTheValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.context.for(Users).lookupAsync(this)];
                    case 1:
                        r = _a.sent();
                        if (r && r.name && r.name.value)
                            return [2 /*return*/, r.name.value];
                        return [2 /*return*/, ''];
                }
            });
        });
    };
    return UserId;
}(types_1.Id));
exports.UserId = UserId;
var UserIdReadonly = /** @class */ (function (_super) {
    __extends(UserIdReadonly, _super);
    function UserIdReadonly(myContext, caption) {
        var _this = _super.call(this, myContext, types_1.updateSettings(caption, function (x) { return x.readonly = true; })) || this;
        _this.myContext = myContext;
        return _this;
    }
    Object.defineProperty(UserIdReadonly.prototype, "displayValue", {
        get: function () {
            return this.myContext.for(Users).lookup(this).name.value;
        },
        enumerable: true,
        configurable: true
    });
    return UserIdReadonly;
}(UserId));
exports.UserIdReadonly = UserIdReadonly;
//# sourceMappingURL=users.js.map