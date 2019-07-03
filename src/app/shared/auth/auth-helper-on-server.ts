import { DataApiServer, Action, DataApiRequest } from 'radweb';
import { SiteArea } from 'radweb-server';

export class AuthHelperOnServer<T>
{

    constructor(server: DataApiServer<T>, private jwt: JsonWebTokenHelper, private authToken?: string) {
        if (!authToken) {
            this.authToken = 'authorization';
        }
        server.addRequestProcessor(async req => {
            return await this.authenticateRequest(req);
        })
    }
    async authenticateRequest(req: DataApiRequest<T>) {
        var h = req.getHeader('cookie');
        if (h) {
            for (const iterator of h.split(';')) {
                let itemInfo = iterator.split('=');
                if (itemInfo && itemInfo[0].trim() == this.authToken) {
                    if (this.validateToken)
                        req.authInfo = await this.validateToken(itemInfo[1]);
                }
            }
            return true;
        }
    }
    createSecuredTokenBasedOn(what: any) {
        return this.jwt.sign(what);
    }

    applyTo(server: DataApiServer<T>, area: SiteArea<T>): void {


        server.addAllowedHeader(this.authToken);


    }

    validateToken: (token: string) => Promise<T> = async (x) => {
        let result: T;
        try {
            result = <T><any>this.jwt.verify(x);
        } catch (err) { }

        return result;
    };

}

export interface JsonWebTokenHelper {
    decode(token: string): any;
    verify(token: string): any;
    sign(item: any): string;
}