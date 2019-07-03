import { Injectable } from '@angular/core';
import { UserInfo } from './auth/userInfo';

@Injectable()
export class ContextUserProvider {
    getUser(): UserInfo {
        return undefined;
    }
}
