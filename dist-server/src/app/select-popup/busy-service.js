"use strict";
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
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var radweb_1 = require("radweb");
var wait_component_1 = require("../shared/wait/wait.component");
var BusyService = /** @class */ (function () {
    function BusyService(dialog) {
        var _this = this;
        this.dialog = dialog;
        this.id = 0;
        this.numOfWaits = 0;
        this.disableWait = false;
        radweb_1.wrapFetch.wrap = function () {
            var id = _this.id++;
            if (_this.disableWait)
                return function () { };
            _this.log(id, 'start busy ');
            if (_this.numOfWaits == 0) {
                setTimeout(function () {
                    if (_this.numOfWaits > 0 && !_this.waitRef) {
                        _this.log(id, 'actual start busy ');
                        _this.waitRef = _this.dialog.open(wait_component_1.WaitComponent, { disableClose: true });
                    }
                }, 2);
            }
            _this.numOfWaits++;
            return function () {
                _this.numOfWaits--;
                _this.log(id, 'close busy ');
                if (_this.numOfWaits == 0) {
                    _this.log(id, 'close top busy ');
                    if (_this.waitRef) {
                        _this.log(id, 'actual close top busy ');
                        _this.waitRef.close();
                        _this.waitRef = undefined;
                    }
                }
            };
        };
    }
    BusyService.prototype.donotWait = function (what) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.disableWait = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, what()];
                    case 2: return [2 /*return*/, (_a.sent())];
                    case 3:
                        this.disableWait = false;
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BusyService.prototype.log = function (id, what) {
        //  console.log(what + ' id:' + this.id + ' w:' + this.numOfWaits);
    };
    BusyService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [material_1.MatDialog])
    ], BusyService);
    return BusyService;
}());
exports.BusyService = BusyService;
//# sourceMappingURL=busy-service.js.map