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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var register_component_1 = require("./users/register/register.component");
var update_info_component_1 = require("./users/update-info/update-info.component");
var users_component_1 = require("./users/users.component");
var routes = [
    { path: 'Home', component: home_component_1.HomeComponent },
    { path: 'User Accounts', component: users_component_1.UsersComponent },
    { path: 'Register', component: register_component_1.RegisterComponent },
    { path: 'Account Info', component: update_info_component_1.UpdateInfoComponent },
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
var dummyRoute = /** @class */ (function (_super) {
    __extends(dummyRoute, _super);
    function dummyRoute() {
        return _super.call(this) || this;
    }
    return dummyRoute;
}(router_1.ActivatedRouteSnapshot));
exports.dummyRoute = dummyRoute;
//# sourceMappingURL=app-routing.module.js.map