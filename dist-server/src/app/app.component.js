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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var dialog_1 = require("./select-popup/dialog");
var context_1 = require("./shared/context");
var auth_guard_1 = require("./shared/auth/auth-guard");
var auth_service_1 = require("./shared/auth/auth-service");
var AppComponent = /** @class */ (function () {
    function AppComponent(auth, router, activeRoute, injector, dialog, context) {
        this.auth = auth;
        this.router = router;
        this.activeRoute = activeRoute;
        this.injector = injector;
        this.dialog = dialog;
        this.context = context;
        auth.auth.tokenInfoChanged = function () { return dialog.refreshEventListener(false); };
        auth.auth.tokenInfoChanged();
    }
    AppComponent.prototype.routeName = function (route) {
        var name = route.path;
        if (route.data && route.data.name)
            name = route.data.name;
        return name;
    };
    AppComponent.prototype.currentTitle = function () {
        if (this.activeRoute && this.activeRoute.snapshot && this.activeRoute.firstChild)
            if (this.activeRoute.firstChild.data && this.activeRoute.snapshot.firstChild.data.name) {
                return this.activeRoute.snapshot.firstChild.data.name;
            }
            else {
                if (this.activeRoute.firstChild.routeConfig)
                    return this.activeRoute.firstChild.routeConfig.path;
            }
        return 'radweb starter kit';
    };
    AppComponent.prototype.signOut = function () {
        this.routeClicked();
        this.auth.signout();
    };
    AppComponent.prototype.shouldDisplayRoute = function (route) {
        if (!(route.path && route.path.indexOf(':') < 0 && route.path.indexOf('**') < 0))
            return false;
        if (!route.canActivate)
            return true;
        for (var _i = 0, _a = route.canActivate; _i < _a.length; _i++) {
            var guard = _a[_i];
            var g = this.injector.get(guard);
            if (g && g.canActivate) {
                var r = new auth_guard_1.dummyRoute();
                r.routeConfig = route;
                var canActivate = g.canActivate(r, undefined);
                if (!canActivate)
                    return false;
            }
        }
        return true;
    };
    AppComponent.prototype.routeClicked = function () {
        if (this.dialog.isScreenSmall())
            this.sidenav.close();
    };
    AppComponent.prototype.test = function () {
    };
    __decorate([
        core_1.ViewChild('sidenav'),
        __metadata("design:type", material_1.MatSidenav)
    ], AppComponent.prototype, "sidenav", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            router_1.Router,
            router_1.ActivatedRoute,
            core_1.Injector,
            dialog_1.DialogService,
            context_1.Context])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map