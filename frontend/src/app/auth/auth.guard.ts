import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

// canActivateFn for content only admins can access
export const canActivateAdmin: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AuthService).isAdmin$.pipe(
    take(1),
    map((isAdmin) => {
      if (isAdmin) return true;
      return inject(Router).createUrlTree(['/login']);
    })
  );
};

// canActivateFn for content only normal users can access
export const canActivateUser: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AuthService).isAdmin$.pipe(
    take(1),
    map((isAdmin) => {
      if (isAdmin != null && isAdmin != undefined && isAdmin == false)
        return true;
      return inject(Router).createUrlTree(['/login']);
    })
  );
};

// canActivateFn for content which is accessible to all logged users
export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AuthService).isLoggedIn$.pipe(
    take(1),
    map((isLogged) => {
      if (isLogged) return true;
      return inject(Router).createUrlTree(['/login']);
    })
  );
};
