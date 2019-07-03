import { RunOnServer } from './server-action';
import { UserInfo, Roles } from './userInfo';
import { Context } from '../context';
import { Users } from '../../users/users';
import { evilStatics } from './evil-statics';
import { AuthHelperOnServer } from './auth-helper-on-server';

export class AuthOnServer {

    static helper:AuthHelperOnServer<UserInfo>;

    @RunOnServer({ allowed: () => true })
    static async signIn(user: string, password: string, context?: Context) {
        let result: UserInfo;


        await context.for(Users).foreach(h => h.name.isEqualTo(user), async h => {
            if (!h.realStoredPassword.value || evilStatics.passwordHelper.verify(password, h.realStoredPassword.value)) {
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
            return {
                valid: true,
                authToken: AuthOnServer.helper.createSecuredTokenBasedOn(<any>result)

            };
        }
        return { valid: false };
    }
  
}
