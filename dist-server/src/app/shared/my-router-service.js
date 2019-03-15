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
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var MyRouterService = /** @class */ (function () {
    function MyRouterService(router) {
        this.router = router;
    }
    MyRouterService.prototype.navigate = function (toComponent) {
        var _this = this;
        var done = false;
        this.router.config.forEach(function (path) {
            if (done)
                return;
            if (path.component == toComponent) {
                done = true;
                _this.router.navigate(['/' + path.path]);
            }
        });
        if (!done)
            console.warn("couldn't find path for ", toComponent, this.router.config);
    };
    MyRouterService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], MyRouterService);
    return MyRouterService;
}());
exports.MyRouterService = MyRouterService;
//# sourceMappingURL=my-router-service.js.map