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
Object.defineProperty(exports, "__esModule", { value: true });
var server_action_1 = require("../shared/auth/server-action");
var ServerEventAuthorizeAction = /** @class */ (function () {
    function ServerEventAuthorizeAction() {
    }
    ServerEventAuthorizeAction.DoAthorize = function (key) {
        ServerEventAuthorizeAction.authorize(key);
    };
    ServerEventAuthorizeAction.authorize = function (key) { };
    __decorate([
        server_action_1.RunOnServer({ allowed: function (c) { return c.isAdmin(); } }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ServerEventAuthorizeAction, "DoAthorize", null);
    return ServerEventAuthorizeAction;
}());
exports.ServerEventAuthorizeAction = ServerEventAuthorizeAction;
//# sourceMappingURL=server-event-authorize-action.js.map