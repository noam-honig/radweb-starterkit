"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var login_component_1 = require("./users/login/login.component");
var register_component_1 = require("./users/register/register.component");
var update_info_component_1 = require("./users/update-info/update-info.component");
var auth_guard_1 = require("./shared/auth/auth-guard");
var users_component_1 = require("./users/users.component");
var routes = [
    { path: 'Home', component: home_component_1.HomeComponent },
    { path: 'User Accounts', component: users_component_1.UsersComponent, canActivate: [auth_guard_1.AdminGuard] },
    { path: 'Sign In', component: login_component_1.LoginComponent, canActivate: [auth_guard_1.NotLoggedInGuard] },
    { path: 'Register', component: register_component_1.RegisterComponent, canActivate: [auth_guard_1.NotLoggedInGuard] },
    { path: 'Account Info', component: update_info_component_1.UpdateInfoComponent, canActivate: [auth_guard_1.LoggedInGuard] },
    { path: '', redirectTo: '/Home', pathMatch: 'full' },
    { path: '**', redirectTo: '/Home', pathMatch: 'full' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map