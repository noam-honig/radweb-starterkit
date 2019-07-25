import { Roles } from './userInfo';
import { JWTCookieAuthorizationHelper } from 'radweb-server';
import { RunOnServer } from './server-action';
import { UserInfo, Context } from 'radweb';
import { Users } from '../../users/users';
export class ServerSignIn {
    static helper: JWTCookieAuthorizationHelper<UserInfo>;
    @RunOnServer({ allowed: () => true })
    static async signIn(user: string, password: string, context?: Context) {
        let result: UserInfo;
        await context.for(Users).foreach(h => h.name.isEqualTo(user), async (h) => {
            if (!h.realStoredPassword.value || Users.passwordHelper.verify(password, h.realStoredPassword.value)) {
                result = {
                    id: h.id.value,
                    roles: [],
                    name: h.name.value
                };
                if (h.admin.value) {
                    result.roles.push(Roles.superAdmin);
                }
            }
        });
        if (result) {
            return ServerSignIn.helper.createSecuredTokenBasedOn(<any>result);
        }
        return undefined;
    }
}
