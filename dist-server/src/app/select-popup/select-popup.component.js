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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var context_1 = require("../shared/context");
var SelectPopupComponent = /** @class */ (function () {
    function SelectPopupComponent(dialogRef, data, context) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.context = context;
        this.helpers = this.context.for(data.entity).gridSettings(data.settings);
    }
    SelectPopupComponent.prototype.ngOnInit = function () {
    };
    SelectPopupComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    SelectPopupComponent.prototype.select = function () {
        this.data.onSelect(this.helpers.currentRow);
        this.dialogRef.close();
    };
    SelectPopupComponent = __decorate([
        core_1.Component({
            selector: 'app-select-popup',
            templateUrl: './select-popup.component.html',
            styleUrls: ['./select-popup.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, context_1.Context])
    ], SelectPopupComponent);
    return SelectPopupComponent;
}());
exports.SelectPopupComponent = SelectPopupComponent;
//# sourceMappingURL=select-popup.component.js.map