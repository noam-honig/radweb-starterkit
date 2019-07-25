import * as radweb from 'radweb';
import { ColumnSetting, Entity } from "radweb";
import { IdEntity, changeDate, Id, HasAsyncGetTheValue, checkForDuplicateValue, StringColumn, BoolColumn, updateSettings } from '../shared/types';
import { DataColumnSettings } from 'radweb';
import { Context, MoreDataColumnSettings, EntityClass } from '../shared/context';
import { Roles } from '../shared/auth/userInfo';




@EntityClass
export class Users extends IdEntity<UserId>  {
  
    constructor(private context: Context) {

        super(new UserId(context), {
            name: "Users",
            allowApiRead: true,
            allowApiDelete: context.isLoggedIn(),
            allowApiUpdate: context.isLoggedIn(),
            allowApiInsert: true,
            onSavingRow: async () => {
                if (context.onServer) {
                    if (this.password.value && this.password.value != this.password.originalValue && this.password.value != Users.emptyPassword) {
                        this.realStoredPassword.value = Users.passwordHelper.generateHash(this.password.value);
                    }
                    if ((await context.for(Users).count()) == 0)
                        this.admin.value = true;

                    await checkForDuplicateValue(this, this.name);
                    if (this.isNew())
                        this.createDate.value = new Date();
                }
            },
            apiDataFilter: () => {
                if (!context.isLoggedIn())
                    return this.id.isEqualTo("No User");
                else if (!(context.hasRole(Roles.superAdmin) ))
                    return this.id.isEqualTo(this.context.user.id);
            }
        });
    }
    public static emptyPassword = 'password';
    name = new radweb.StringColumn({
        caption: "name",
        onValidate: v => {
            if (!v.value || v.value.length < 2)
                this.name.error = 'Name is too short';
        }
    });
    
    realStoredPassword = new StringColumn({
        dbName: 'password',
        excludeFromApi: true
    });
    password = new radweb.StringColumn({ caption: 'password', inputType: 'password', virtualData: () => this.realStoredPassword.value ? Users.emptyPassword : '' });

    createDate = new changeDate('Create Date');
    
    
    
    admin = new BoolColumn();
    static passwordHelper: PasswordHelper = {
        generateHash: x => { throw ""; },
        verify: (x, y) => { throw ""; }
    };
 
}
export interface PasswordHelper {
    generateHash(password: string): string;
    verify(password: string, realPasswordHash: string): boolean;
}


export class UserId extends Id implements HasAsyncGetTheValue {

    constructor(private context: Context, settingsOrCaption?: DataColumnSettings<string, StringColumn> | string) {
        super(settingsOrCaption);
    }
    getColumn(): ColumnSetting<Entity<any>> {
        return {
            column: this,
            getValue: f => (f ? (<UserId>(f).__getColumn(this)) : this).getValue(),
            hideDataOnInput: true,
            readonly: this.readonly,
            width: '200'

        }
    }

    getValue() {
        return this.context.for(Users).lookup(this).name.value;
    }
   
    async getTheName() {
        let r = await this.context.for(Users).lookupAsync(this);
        if (r && r.name && r.name.value)
            return r.name.value;
        return '';
    }
    async getTheValue() {
        let r = await this.context.for(Users).lookupAsync(this);
        if (r && r.name && r.name.value )
            return r.name.value ;
        return '';
    }
}

export class UserIdReadonly extends UserId {
    constructor(private myContext: Context, caption: MoreDataColumnSettings<string, UserId> | string) {
        super(myContext, updateSettings(caption, x => x.readonly = true));
    }

    get displayValue() {
        return this.myContext.for(Users).lookup(this).name.value;
    }
}