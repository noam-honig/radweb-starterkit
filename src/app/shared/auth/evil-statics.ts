import { Authentication } from "./authentication";
import { myAuthInfo } from "./my-auth-info";

import { DataProviderFactory, RestDataProvider } from "radweb";
import { environment } from '../../../environments/environment';

const auth = new Authentication<myAuthInfo>();
export interface PasswordHelper {
    generateHash(password: string): string;
    verify(password: string, realPasswordHash: string): boolean;
}
const passwordHelper: PasswordHelper = {
    generateHash: x => { throw ""; },
    verify: (x, y) => { throw ""; }
};
export const evilStatics = {
    passwordHelper,
    auth: auth,
    
    dataSource: new RestDataProvider('api') as DataProviderFactory,
    

}
