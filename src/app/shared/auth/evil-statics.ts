
import { DataProviderFactory, RestDataProvider } from "radweb";



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
    
    
    dataSource: new RestDataProvider('api') as DataProviderFactory,
    

}
