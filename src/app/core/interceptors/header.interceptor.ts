import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  const _PLATFORM_ID = inject(PLATFORM_ID)
  if (isPlatformBrowser(_PLATFORM_ID)) {
    if (localStorage.getItem('socialToken') !==null) {
      req = req.clone({
        setHeaders:{token: localStorage.getItem('socialToken') !}
      })
    }
  }

  return next(req);
};