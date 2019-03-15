"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var sidenav_1 = require("@angular/material/sidenav");
var list_1 = require("@angular/material/list");
var toolbar_1 = require("@angular/material/toolbar");
var icon_1 = require("@angular/material/icon");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var animations_1 = require("@angular/platform-browser/animations");
var radweb_1 = require("radweb");
var forms_1 = require("@angular/forms");
var auth_service_1 = require("./shared/auth/auth-service");
var dialog_1 = require("./select-popup/dialog");
var checkbox_1 = require("@angular/material/checkbox");
var card_1 = require("@angular/material/card");
var dialog_2 = require("@angular/material/dialog");
var busy_service_1 = require("./select-popup/busy-service");
var snack_bar_1 = require("@angular/material/snack-bar");
var context_1 = require("./shared/context");
var material_1 = require("@angular/material");
var users_component_1 = require("./users/users.component");
var login_component_1 = require("./users/login/login.component");
var update_info_component_1 = require("./users/update-info/update-info.component");
var register_component_1 = require("./users/register/register.component");
var home_component_1 = require("./home/home.component");
var auth_guard_1 = require("./shared/auth/auth-guard");
var wait_component_1 = require("./shared/wait/wait.component");
var yes_no_question_component_1 = require("./select-popup/yes-no-question/yes-no-question.component");
var my_router_service_1 = require("./shared/my-router-service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                users_component_1.UsersComponent,
                login_component_1.LoginComponent,
                update_info_component_1.UpdateInfoComponent,
                register_component_1.RegisterComponent,
                wait_component_1.WaitComponent,
                yes_no_question_component_1.YesNoQuestionComponent,
                home_component_1.HomeComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                sidenav_1.MatSidenavModule,
                list_1.MatListModule,
                toolbar_1.MatToolbarModule,
                icon_1.MatIconModule,
                checkbox_1.MatCheckboxModule,
                material_1.MatProgressSpinnerModule,
                card_1.MatCardModule,
                dialog_2.MatDialogModule,
                snack_bar_1.MatSnackBarModule,
                material_1.MatFormFieldModule,
                material_1.MatInputModule,
                material_1.MatButtonModule,
                radweb_1.RadWebModule
            ],
            providers: [
                auth_service_1.AuthService,
                dialog_1.DialogService,
                busy_service_1.BusyService,
                context_1.Context,
                auth_guard_1.NotLoggedInGuard,
                auth_guard_1.LoggedInGuard,
                my_router_service_1.MyRouterService,
                auth_guard_1.AdminGuard
            ],
            entryComponents: [wait_component_1.WaitComponent, yes_no_question_component_1.YesNoQuestionComponent],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map