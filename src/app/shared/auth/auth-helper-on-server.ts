import { DataApiServer, Action, DataApiRequest } from 'radweb';
import { SiteArea } from 'radweb-server';

export class AuthHelperOnServer<T>
{

    constructor(private jwt: JsonWebTokenHelper, private authToken?: string) {
        if (!authToken) {
            this.authToken = 'authorization';
        }
    }
    createSecuredTokenBasedOn(what: any) {
        return this.jwt.sign(what);
    }

    applyTo(server: DataApiServer<T>, area: SiteArea<T>): void {

        server.addRequestProcessor(async req => {
            var h = req.getHeader(this.authToken);

            if (this.validateToken)
                req.authInfo = await this.validateToken(h);
            return true;
        })
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