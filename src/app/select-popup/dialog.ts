import { Injectable, NgZone } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { Entity, IDataSettings } from "radweb";
import { SelectPopupComponent, SelectComponentInfo } from "./select-popup.component";
import { YesNoQuestionComponentData, YesNoQuestionComponent } from "./yes-no-question/yes-no-question.component";
import { InputAreaComponentData, InputAreaComponent } from "./input-area/input-area.component";
import { BusyService } from "./busy-service";
import { environment } from "../../environments/environment";
import { ServerEventAuthorizeAction } from "../server/server-event-authorize-action";
import { Subject } from "rxjs";


@Injectable()
export class DialogService {
    Info(info: string): any {
        this.snackBar.open(info, "close", { duration: 4000 });
    }
    Error(err: string): any {

        this.YesNoQuestion(err);
    }
    private mediaMatcher: MediaQueryList = matchMedia(`(max-width: 720px)`);


    isScreenSmall() {
        return this.mediaMatcher.matches;
    }

    newsUpdate = new Subject<string>();


    constructor(private dialog: MatDialog, private zone: NgZone, private snackBar: MatSnackBar) {
        this.mediaMatcher.addListener(mql => zone.run(() => /*this.mediaMatcher = mql*/"".toString() ));


    }
    
    
    displayArea(settings: InputAreaComponentData) {
        this.dialog.open(InputAreaComponent, { data: settings });
    }
    showPopup<T extends Entity<any>>(entityType: { new(...args: any[]): T; }, selected: (selectedValue: T) => void, settings?: IDataSettings<T>) {

        let data: SelectComponentInfo<T> = {
            onSelect: selected,
            entity: entityType,
            settings: settings
        };
        let ref = this.dialog.open(SelectPopupComponent, {
            data
        });
    }
    YesNoQuestion(question: string, onYes?: () => void) {
        let data: YesNoQuestionComponentData = {
            question: question,
            onYes: onYes
        };
        this.dialog.open(YesNoQuestionComponent, { data });
    }
    confirmDelete(of: string, onOk: () => void) {
        this.YesNoQuestion("האם את בטוחה שאת מעוניית למחוק את " + of + "?", onOk);
    }
}
