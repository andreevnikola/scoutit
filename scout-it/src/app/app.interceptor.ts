import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, tap, throwError } from "rxjs";

@Injectable()
export class AppInterceptor implements HttpInterceptor{

    constructor( private router: Router ){ }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = req;
        if(req.url.endsWith('/key')){
            if(localStorage.getItem('key')){
                request = req.clone({
                    url: req.url.replace('/key', ('/'+localStorage.getItem('key')!))
                });
            }else{
                request = req.clone({
                    url: req.url.replace('/key', '/null')
                });
            }
        }
        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                if(err.status === 401){
                    localStorage.clear();
                    sessionStorage.clear();
                    const returnUrl = this.router.routerState.snapshot.url;
                    this.router.navigate(['/auth/signin'], { queryParams: { returnUrl } });
                }
                return throwError(err);
            })
        );
    }
}

export const appInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true
}