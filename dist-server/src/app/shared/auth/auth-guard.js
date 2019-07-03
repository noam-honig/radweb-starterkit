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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_service_1 = require("./auth-service");
var my_router_service_1 = require("../my-router-service");
var home_component_1 = require("../../home/home.component");
var LoggedInGuard = /** @class */ (function () {
    function LoggedInGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    LoggedInGuard.prototype.canActivate = function (route) {
        if (this.auth.auth.valid)
            return true;
        if (!(route instanceof dummyRoute))
            this.router.navigate(LoginComponent);
        return false;
    };
    LoggedInGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            my_router_service_1.MyRouterService])
    ], LoggedInGuard);
    return LoggedInGuard;
}());
exports.LoggedInGuard = LoggedInGuard;
var NotLoggedInGuard = /** @class */ (function () {
    function NotLoggedInGuard(auth) {
        this.auth = auth;
    }
    NotLoggedInGuard.prototype.canActivate = function (route) {
        return !this.auth.auth.valid;
    };
    NotLoggedInGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [auth_service_1.AuthService])
    ], NotLoggedInGuard);
    return NotLoggedInGuard;
}());
exports.NotLoggedInGuard = NotLoggedInGuard;
var AdminGuard = /** @class */ (function () {
    function AdminGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AdminGuard.prototype.canActivate = function (route) {
        if (this.auth.auth.valid && (this.auth.auth.info.superAdmin))
            return true;
        if (!(route instanceof dummyRoute))
            this.router.navigate(home_component_1.HomeComponent);
        return false;
    };
    AdminGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [auth_service_1.AuthService, my_router_service_1.MyRouterService])
    ], AdminGuard);
    return AdminGuard;
}());
exports.AdminGuard = AdminGuard;
var dummyRoute = /** @class */ (function (_super) {
    __extends(dummyRoute, _super);
    function dummyRoute() {
        return _super.call(this) || this;
    }
    return dummyRoute;
}(router_1.ActivatedRouteSnapshot));
exports.dummyRoute = dummyRoute;
//# sourceMappingURL=auth-guard.js.map