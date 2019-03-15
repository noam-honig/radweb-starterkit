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
var radweb_1 = require("radweb");
var utils_1 = require("./utils");
var core_1 = require("@angular/core");
var evil_statics_1 = require("./auth/evil-statics");
var Context = /** @class */ (function () {
    function Context() {
        this._getInfo = function () { return evil_statics_1.evilStatics.auth.info; };
        this._dataSource = evil_statics_1.evilStatics.dataSource;
        this._onServer = false;
        this.cache = {};
        this._lookupCache = new stamEntity();
    }
    Context.prototype.clearAllCache = function () {
        this.cache = {};
        this._lookupCache = new stamEntity();
    };
    Context.prototype.isAdmin = function () {
        return !!this.info && !!this.info.superAdmin;
    };
    Context.prototype.isLoggedIn = function () {
        return !!this.info && !!this.info.loggedIn;
    };
    Object.defineProperty(Context.prototype, "onServer", {
        get: function () {
            return this._onServer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "info", {
        get: function () {
            return this._getInfo();
        },
        enumerable: true,
        configurable: true
    });
    Context.prototype.create = function (c) {
        var e = new c(this);
        e.setSource(this._dataSource);
        if (e instanceof ContextEntity) {
            e._setContext(this);
        }
        return e;
    };
    Context.prototype.for = function (c) {
        var classType = c;
        if (this.cache[classType.__key])
            return this.cache[classType.__key];
        return this.cache[classType.__key] = new SpecificEntityHelper(this.create(c), this._lookupCache);
    };
    Context = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], Context);
    return Context;
}());
exports.Context = Context;
var ServerContext = /** @class */ (function (_super) {
    __extends(ServerContext, _super);
    function ServerContext() {
        var _this = _super.call(this) || this;
        _this._onServer = true;
        _this._getInfo = function () { return ({ loggedIn: false }); };
        return _this;
    }
    ServerContext.prototype.setReq = function (req) {
        this.req = req;
        this._getInfo = function () { return req.authInfo ? req.authInfo : { loggedIn: false }; };
    };
    ServerContext.prototype.setDataProvider = function (dataProvider) {
        this._dataSource = dataProvider;
    };
    ServerContext.prototype.getOrigin = function () {
        return this.req.getHeader('origin');
    };
    return ServerContext;
}(Context));
exports.ServerContext = ServerContext;
function buildEntityOptions(o) {
    if (typeof (o) == 'string')
        return o;
    return {
        name: o.name,
        caption: o.caption,
        dbName: o.dbName,
        onSavingRow: o.onSavingRow,
    };
}
var ContextEntity = /** @class */ (function (_super) {
    __extends(ContextEntity, _super);
    function ContextEntity(contextEntityOptions) {
        var _this = _super.call(this, function () {
            if (!_this.__context) {
                throw _this._noContextErrorWithStack;
            }
            if (!_this.entityType) {
                throw _this._noContextErrorWithStack;
            }
            return _this.__context.create(_this.entityType);
        }, evil_statics_1.evilStatics.dataSource, buildEntityOptions(contextEntityOptions)) || this;
        _this.contextEntityOptions = contextEntityOptions;
        _this._noContextErrorWithStack = new Error('@EntityClass not used or context was not set for' + _this.constructor.name);
        return _this;
    }
    ContextEntity.prototype._setContext = function (context) {
        this.__context = context;
    };
    ContextEntity.prototype._setFactoryClassAndDoInitColumns = function (entityType) {
        this.entityType = entityType;
        this.initColumns(this.id);
    };
    ContextEntity.prototype._getExcludedColumns = function (x) {
        var r = x.__iterateColumns().filter(function (c) {
            var y = c;
            if (y && y.__getMoreDataColumnSettings) {
                if (y.__getMoreDataColumnSettings() && y.__getMoreDataColumnSettings().excludeFromApi)
                    return true;
            }
            return false;
        });
        return r;
    };
    ContextEntity.prototype._getEntityApiSettings = function (r) {
        var _this = this;
        var x = r.for(this.entityType).create();
        if (typeof (x.contextEntityOptions) == "string") {
            return {};
        }
        else {
            var options_1 = x.contextEntityOptions;
            if (options_1.allowApiCRUD) {
                options_1.allowApiDelete = true;
                options_1.allowApiInsert = true;
                options_1.allowApiUpdate = true;
            }
            return {
                allowRead: options_1.allowApiRead,
                allowUpdate: options_1.allowApiUpdate,
                allowDelete: options_1.allowApiDelete,
                allowInsert: options_1.allowApiInsert,
                excludeColumns: function (x) {
                    return _this._getExcludedColumns(x);
                },
                readonlyColumns: function (x) {
                    var r = x.__iterateColumns().filter(function (c) { return c.readonly; });
                    return r;
                },
                get: {
                    where: function (x) { return options_1.apiDataFilter ? options_1.apiDataFilter() : undefined; }
                }
            };
        }
    };
    return ContextEntity;
}(radweb_1.Entity));
exports.ContextEntity = ContextEntity;
var stamEntity = /** @class */ (function (_super) {
    __extends(stamEntity, _super);
    function stamEntity() {
        var _this = _super.call(this, function () { return new stamEntity(); }, evil_statics_1.evilStatics.dataSource, "stamEntity") || this;
        _this.id = new radweb_1.NumberColumn();
        _this.initColumns();
        return _this;
    }
    return stamEntity;
}(radweb_1.Entity));
var SpecificEntityHelper = /** @class */ (function () {
    function SpecificEntityHelper(entity, _lookupCache) {
        this.entity = entity;
        this._lookupCache = _lookupCache;
    }
    SpecificEntityHelper.prototype.lookupAsync = function (filter) {
        return this._lookupCache.lookupAsync(this.entity, filter);
    };
    SpecificEntityHelper.prototype.lookup = function (filter) {
        return this._lookupCache.lookup(this.entity, filter);
    };
    SpecificEntityHelper.prototype.count = function (where) {
        return __awaiter(this, void 0, void 0, function () {
            var dl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dl = new radweb_1.DataList(this.entity);
                        return [4 /*yield*/, dl.count(where)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SpecificEntityHelper.prototype.foreach = function (where, what) {
        return __awaiter(this, void 0, void 0, function () {
            var options, items;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {};
                        if (where) {
                            options.where = where(this.entity);
                        }
                        return [4 /*yield*/, this.entity.source.find(options)];
                    case 1:
                        items = _a.sent();
                        return [2 /*return*/, utils_1.foreachSync(items, function (item) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, what(item)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); })];
                }
            });
        });
    };
    SpecificEntityHelper.prototype.find = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var dl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dl = new radweb_1.DataList(this.entity);
                        return [4 /*yield*/, dl.get(options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SpecificEntityHelper.prototype.findFirst = function (where) {
        return __awaiter(this, void 0, void 0, function () {
            var r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entity.source.find({ where: where ? where(this.entity) : undefined })];
                    case 1:
                        r = _a.sent();
                        if (r.length == 0)
                            return [2 /*return*/, undefined];
                        return [2 /*return*/, r[0]];
                }
            });
        });
    };
    SpecificEntityHelper.prototype.toPojoArray = function (items) {
        var exc = new radweb_1.ColumnHashSet();
        if (this.entity instanceof ContextEntity)
            exc.add.apply(exc, this.entity._getExcludedColumns(this.entity));
        return Promise.all(items.map(function (f) { return f.__toPojo(exc); }));
    };
    SpecificEntityHelper.prototype.create = function () {
        return this.entity.source.createNewItem();
    };
    SpecificEntityHelper.prototype.gridSettings = function (settings) {
        return new radweb_1.GridSettings(this.entity, settings);
    };
    return SpecificEntityHelper;
}());
exports.SpecificEntityHelper = SpecificEntityHelper;
exports.allEntities = [];
function EntityClass(theEntityClass) {
    var original = theEntityClass;
    // a utility function to generate instances of a class
    function construct(constructor, args) {
        var c = function () {
            return constructor.apply(this, args);
        };
        c.prototype = constructor.prototype;
        return new c();
    }
    var newEntityType;
    // the new constructor behaviour
    var f = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var r = construct(original, args);
        if (r instanceof ContextEntity) {
            r._setFactoryClassAndDoInitColumns(newEntityType);
        }
        return r;
    };
    newEntityType = f;
    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;
    // copy static methods
    for (var x in original) {
        f[x] = original[x];
    }
    exports.allEntities.push(f);
    f.__key = original.name + exports.allEntities.indexOf(f);
    // return new constructor (will override original)
    return f;
}
exports.EntityClass = EntityClass;
//# sourceMappingURL=context.js.map