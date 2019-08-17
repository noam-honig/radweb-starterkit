import { SignedInGuard } from 'radweb';
import { Injectable } from '@angular/core';



export const Roles = { 
    superAdmin: 'SuperAdmin'
}


@Injectable()
export class SuperAdminGuard extends SignedInGuard {

    isAllowed() {
        return Roles.superAdmin;
    }
}