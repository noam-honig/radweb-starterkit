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
var uuid = require("uuid");
var radweb = require("radweb");
var radweb_1 = require("radweb");
var context_1 = require("../shared/context");
var IdEntity = /** @class */ (function (_super) {
    __extends(IdEntity, _super);
    function IdEntity(id, options) {
        var _this = _super.call(this, options) || this;
        _this.disableNewId = false;
        _this.id = id;
        id.readonly = true;
        var x = _this.onSavingRow;
        _this.onSavingRow = function () {
            if (_this.isNew() && !_this.id.value && !_this.disableNewId)
                _this.id.setToNewId();
            return x();
        };
        return _this;
    }
    IdEntity.prototype.setEmptyIdForNewRow = function () {
        this.id.value = '';
        this.disableNewId = true;
    };
    return IdEntity;
}(context_1.ContextEntity));
exports.IdEntity = IdEntity;
var StringColumn = /** @class */ (function (_super) {
    __extends(StringColumn, _super);
    function StringColumn(settingsOrCaption) {
        var _this = _super.call(this, settingsOrCaption) || this;
        _this.settingsOrCaption = settingsOrCaption;
        return _this;
    }
    StringColumn.prototype.__getMoreDataColumnSettings = function () {
        return this.settingsOrCaption;
    };
    return StringColumn;
}(radweb.StringColumn));
exports.StringColumn = StringColumn;
var NumberColumn = /** @class */ (function (_super) {
    __extends(NumberColumn, _super);
    function NumberColumn(settingsOrCaption) {
        var _this = _super.call(this, settingsOrCaption) || this;
        _this.settingsOrCaption = settingsOrCaption;
        return _this;
    }
    NumberColumn.prototype.__getMoreDataColumnSettings = function () {
        return this.settingsOrCaption;
    };
    return NumberColumn;
}(radweb.NumberColumn));
exports.NumberColumn = NumberColumn;
var Id = /** @class */ (function (_super) {
    __extends(Id, _super);
    function Id() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Id.prototype.setToNewId = function () {
        this.value = uuid();
    };
    return Id;
}(StringColumn));
exports.Id = Id;
var BoolColumn = /** @class */ (function (_super) {
    __extends(BoolColumn, _super);
    function BoolColumn(settingsOrCaption) {
        var _this = _super.call(this, settingsOrCaption) || this;
        _this.settingsOrCaption = settingsOrCaption;
        return _this;
    }
    BoolColumn.prototype.__getMoreDataColumnSettings = function () {
        return this.settingsOrCaption;
    };
    return BoolColumn;
}(radweb.BoolColumn));
exports.BoolColumn = BoolColumn;
function updateSettings(original, addValues) {
    var result = {};
    if (typeof (original) == "string")
        result.caption = original;
    else
        result = original;
    addValues(result);
    return result;
}
exports.updateSettings = updateSettings;
var changeDate = /** @class */ (function (_super) {
    __extends(changeDate, _super);
    function changeDate(optionsOrCaption) {
        var _this = _super.call(this, updateSettings(optionsOrCaption, function (x) { return x.readonly = true; })) || this;
        _this.optionsOrCaption = optionsOrCaption;
        return _this;
    }
    changeDate.prototype.__getMoreDataColumnSettings = function () {
        return this.optionsOrCaption;
    };
    return changeDate;
}(radweb_1.DateTimeColumn));
exports.changeDate = changeDate;
function checkForDuplicateValue(row, column, message) {
    return __awaiter(this, void 0, void 0, function () {
        var rows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(row.isNew() || column.value != column.originalValue)) return [3 /*break*/, 2];
                    return [4 /*yield*/, row.source.find({ where: column.isEqualTo(column.value) })];
                case 1:
                    rows = _a.sent();
                    console.log(rows.length);
                    if (rows.length > 0)
                        column.error = message || 'כבר קיים במערכת';
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
exports.checkForDuplicateValue = checkForDuplicateValue;
var SqlBuilder = /** @class */ (function () {
    function SqlBuilder() {
        this.dict = new Map();
        this.entites = new Map();
        this.last = 1;
    }
    SqlBuilder.prototype.str = function (val) {
        return '\'' + val.replace('\'', '\'\'') + '\'';
    };
    SqlBuilder.prototype.addEntity = function (e, alias) {
        var _this = this;
        if (alias) {
            e.__iterateColumns().forEach(function (c) {
                _this.dict.set(c, alias);
            });
            this.entites.set(e, alias);
        }
    };
    SqlBuilder.prototype.columnWithAlias = function (a, b) {
        return this.build(a, ' ', b);
    };
    SqlBuilder.prototype.build = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = '';
        args.forEach(function (e) {
            result += _this.getItemSql(e);
        });
        return result;
    };
    SqlBuilder.prototype.getItemSql = function (e) {
        var _this = this;
        if (this.dict.has(e))
            return this.dict.get(e) + '.' + e.__getDbName();
        var v = e;
        if (e instanceof radweb_1.Entity)
            v = e.__getDbName();
        if (e instanceof radweb_1.Column)
            v = e.__getDbName();
        if (e instanceof Array) {
            v = e.map(function (x) { return _this.getItemSql(x); }).join(', ');
        }
        return v;
    };
    SqlBuilder.prototype.eq = function (a, b) {
        return this.build(a, ' = ', b);
    };
    SqlBuilder.prototype.ne = function (a, b) {
        return this.build(a, ' <> ', b);
    };
    SqlBuilder.prototype.notNull = function (col) {
        return this.build(col, ' is not null');
    };
    SqlBuilder.prototype.gt = function (a, b) {
        return this.build(a, ' > ', b);
    };
    SqlBuilder.prototype.and = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args.map(function (x) { return _this.getItemSql(x); }).join(' and ');
    };
    SqlBuilder.prototype.getEntityAlias = function (e) {
        var result = this.entites.get(e);
        if (result)
            return result;
        result = 'e' + this.last++;
        this.addEntity(e, result);
        return result;
    };
    SqlBuilder.prototype.columnSumInnerSelect = function (rootEntity, col, query) {
        var _this = this;
        return this.columnDbName(rootEntity, {
            select: function () { return [_this.build("sum(", col, ")")]; },
            from: query.from,
            innerJoin: query.innerJoin,
            outerJoin: query.outerJoin,
            crossJoin: query.crossJoin,
            where: query.where
        });
    };
    SqlBuilder.prototype.columnCount = function (rootEntity, query) {
        var _this = this;
        return this.columnDbName(rootEntity, {
            select: function () { return [_this.build("count(*)")]; },
            from: query.from,
            innerJoin: query.innerJoin,
            outerJoin: query.outerJoin,
            crossJoin: query.crossJoin,
            where: query.where
        });
    };
    SqlBuilder.prototype.columnInnerSelect = function (rootEntity, query) {
        this.addEntity(rootEntity, rootEntity.__getDbName());
        return '(' + this.query(query) + ' limit 1)';
    };
    SqlBuilder.prototype.countInnerSelect = function (query, mappedColumn) {
        var _this = this;
        return this.build("(", this.query({
            select: function () { return [_this.build("count(*)")]; },
            from: query.from,
            innerJoin: query.innerJoin,
            outerJoin: query.outerJoin,
            crossJoin: query.crossJoin,
            where: query.where
        }), ") ", mappedColumn);
    };
    SqlBuilder.prototype.countDistinct = function (col, mappedColumn) {
        return this.build("count (distinct ", col, ") ", mappedColumn);
    };
    SqlBuilder.prototype.min = function (col, query, mappedColumn) {
        var _this = this;
        return this.build('(', this.query({
            select: function () { return [_this.build("min(", col, ")")]; },
            from: query.from,
            innerJoin: query.innerJoin,
            outerJoin: query.outerJoin,
            crossJoin: query.crossJoin,
            where: query.where
        }), ") ", mappedColumn);
    };
    SqlBuilder.prototype.columnDbName = function (rootEntity, query) {
        this.addEntity(rootEntity, rootEntity.__getDbName());
        return '(' + this.query(query) + ')';
    };
    SqlBuilder.prototype.entityDbName = function (query) {
        return '(' + this.query(query) + ') result';
    };
    SqlBuilder.prototype.entityDbNameUnion = function (query1, query2) {
        return '(' + this.query(query1) + ' union ' + this.query(query2) + ') result';
    };
    SqlBuilder.prototype.in = function (col) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        return this.build(col, ' in (', values, ')');
    };
    SqlBuilder.prototype.not = function (arg0) {
        return this.build(' not (', arg0, ')');
    };
    SqlBuilder.prototype.query = function (query) {
        var _this = this;
        var from = [];
        from.push(' from ');
        from.push(query.from, ' ', this.getEntityAlias(query.from));
        if (query.crossJoin) {
            query.crossJoin().forEach(function (j) {
                from.push(' cross join ', j, ' ', _this.getEntityAlias(j));
            });
        }
        if (query.innerJoin) {
            query.innerJoin().forEach(function (j) {
                var alias = _this.getEntityAlias(j.to);
                from.push(' left join ', j.to, ' ', alias, ' on ', _this.and.apply(_this, j.on()));
            });
        }
        if (query.outerJoin) {
            query.outerJoin().forEach(function (j) {
                var alias = _this.getEntityAlias(j.to);
                from.push(' left outer join ', j.to, ' ', alias, ' on ', _this.and.apply(_this, j.on()));
            });
        }
        var result = [];
        result.push('select ');
        result.push(query.select());
        result.push.apply(result, from);
        if (query.where) {
            result.push(' where ', this.and.apply(this, query.where()));
        }
        if (query.orderBy) {
            result.push(' order by ', query.orderBy.map(function (x) {
                var f = x;
                if (f && f.column) {
                    return _this.build(f.column, ' ', f.descending ? 'desc' : '');
                }
                else
                    return x;
            }));
        }
        return this.build.apply(this, result);
    };
    SqlBuilder.prototype.case = function (args, else_) {
        var _this = this;
        if (args.length == 0)
            return else_;
        var result = [];
        result.push('case');
        args.forEach(function (x) {
            result.push(' when ');
            result.push(_this.and.apply(_this, x.when));
            result.push(' then ');
            result.push(x.then);
        });
        result.push(' else ');
        result.push(else_);
        result.push(' end');
        return this.build.apply(this, result);
    };
    SqlBuilder.prototype.innerSelect = function (builder, col) {
        return this.build('(', this.query(builder), ' limit 1) ', col);
    };
    return SqlBuilder;
}());
exports.SqlBuilder = SqlBuilder;
//# sourceMappingURL=types.js.map