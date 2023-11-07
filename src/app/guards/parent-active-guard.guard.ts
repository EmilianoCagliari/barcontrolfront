import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const parentActiveGuardGuard: CanActivateFn = (route, state) => {

  // console.log("CanActivateFn");
  
  const router: Router = inject(Router);

  let token = localStorage.getItem('token');

  // console.log("token", token)
  if (token != null) {
    return true
  } else {
    // console.log("else");

    router.navigate(['login']);
    return false;
  }
};
