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
var select_popup_component_1 = require("./select-popup.component");
var yes_no_question_component_1 = require("./yes-no-question/yes-no-question.component");
var input_area_component_1 = require("./input-area/input-area.component");
var busy_service_1 = require("./busy-service");
var environment_1 = require("../../environments/environment");
var server_event_authorize_action_1 = require("../server/server-event-authorize-action");
var rxjs_1 = require("rxjs");
var DialogService = /** @class */ (function () {
    function DialogService(dialog, zone, busy, snackBar) {
        this.dialog = dialog;
        this.zone = zone;
        this.busy = busy;
        this.snackBar = snackBar;
        this.mediaMatcher = matchMedia("(max-width: 720px)");
        this.newsUpdate = new rxjs_1.Subject();
        this.mediaMatcher.addListener(function (mql) { return zone.run(function () { /*this.mediaMatcher = mql*/ return "".toString(); }); });
    }
    DialogService.prototype.Info = function (info) {
        this.snackBar.open(info, "close", { duration: 4000 });
    };
    DialogService.prototype.Error = function (err) {
        this.YesNoQuestion(err);
    };
    DialogService.prototype.isScreenSmall = function () {
        return this.mediaMatcher.matches;
    };
    DialogService.prototype.refreshEventListener = function (enable) {
        var _this = this;
        if (typeof (window) !== 'undefined') {
            var EventSource_1 = window['EventSource'];
            if (enable && typeof (EventSource_1) !== "undefined") {
                this.zone.run(function () {
                    var source = new EventSource_1(environment_1.environment.serverUrl + 'stream', { withCredentials: true });
                    if (_this.eventSource) {
                        _this.eventSource.close();
                        _this.eventSource = undefined;
                    }
                    _this.eventSource = source;
                    source.onmessage = function (e) {
                        _this.zone.run(function () {
                            _this.newsUpdate.next(e.data.toString());
                            _this.Info(e.data.toString() + ' ');
                        });
                    };
                    var x = _this;
                    source.addEventListener("authenticate", function (e) {
                        return __awaiter(this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, x.busy.donotWait(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, server_event_authorize_action_1.ServerEventAuthorizeAction.DoAthorize(e.data.toString())];
                                                case 1: return [2 /*return*/, _a.sent()];
                                            }
                                        }); }); })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                });
            }
        }
    };
    DialogService.prototype.displayArea = function (settings) {
        this.dialog.open(input_area_component_1.InputAreaComponent, { data: settings });
    };
    DialogService.prototype.showPopup = function (entityType, selected, settings) {
        var data = {
            onSelect: selected,
            entity: entityType,
            settings: settings
        };
        var ref = this.dialog.open(select_popup_component_1.SelectPopupComponent, {
            data: data
        });
    };
    DialogService.prototype.YesNoQuestion = function (question, onYes) {
        var data = {
            question: question,
            onYes: onYes
        };
        this.dialog.open(yes_no_question_component_1.YesNoQuestionComponent, { data: data });
    };
    DialogService.prototype.confirmDelete = function (of, onOk) {
        this.YesNoQuestion("האם את בטוחה שאת מעוניית למחוק את " + of + "?", onOk);
    };
    DialogService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [material_1.MatDialog, core_1.NgZone, busy_service_1.BusyService, material_1.MatSnackBar])
    ], DialogService);
    return DialogService;
}());
exports.DialogService = DialogService;
//# sourceMappingURL=dialog.js.map