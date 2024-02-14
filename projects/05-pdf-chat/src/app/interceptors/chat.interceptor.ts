import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const chatInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = environment.apiUrl;

  const clonedReq = req.clone({
    url: `${apiUrl}${req.url}`,
  });

  return next(clonedReq);
};
