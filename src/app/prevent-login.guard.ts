import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route,
  Router
} from '@angular/router';
import { AuthService } from './auth.service';
import { CanDeactivate } from '@angular/router/src/utils/preactivation';
import { Observable } from 'rxjs';
import { MainPageComponent } from './main-page/main-page.component';


@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.auth.isUserValid()) {
      return true;
    }
    else {
      // alert("Please")
      this.router.navigate(["/homepage"]);

      return false;
    }


  }
}


// @Injectable()
// export class DeactivateGuardService implements CanDeactivate {
//   component: Object;
//   route: ActivatedRouteSnapshot;

//   constructor() { }

//   canDeactivate(component: IDeactivateComponent,
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot,
//     nextState: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

//     return component.canExit();

//   }

// }
