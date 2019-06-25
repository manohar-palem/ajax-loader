/*
    Intercepts the request and add
    expose the API to listen for stage change event & udpate api loader state

    NOTE:
        1.  Value of <loaderProp> should be same as the header key
        2.  Ajax Loader <ajaxLoaderEnabled> should be enabled in service class
*/

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MplAjaxLoaderService, MplXhrRequestState, MPL_AJAX_LOADER_HEADER } from './mpl-ajax-loader.service';


@Injectable()
export class MplAjaxLoaderInterceptor implements HttpInterceptor {

    constructor(
        private mplAjaxLoaderService: MplAjaxLoaderService
    ) { }

    intercept(request: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('ajax-loader interceptor');
        const loaderName = request.headers.get(MPL_AJAX_LOADER_HEADER);
        const newReq: HttpRequest<any> = request.clone({
            headers: request.headers.delete(MPL_AJAX_LOADER_HEADER)
        });

        this.updateLoaderState(loaderName, MplXhrRequestState.PROGRESS);

        return httpHandler.handle(newReq).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.updateLoaderState(loaderName, MplXhrRequestState.SUCCESS, event);
                }
                return event;
            }),
            catchError((errorResponse: HttpErrorResponse) => {
                // console.log('ajax-loader interceptor error handler ');
                const responseErrorBody = errorResponse.error;
                let errorMessage = ('Unknown Error in API call. ' + loaderName);
                if (responseErrorBody) {
                    if (typeof responseErrorBody === 'string' && responseErrorBody.length > 500) {
                        // left it to default error message
                    } else {
                        errorMessage = (responseErrorBody.error || responseErrorBody.message
                            || responseErrorBody.detail || JSON.stringify(responseErrorBody));
                    }
                }
                if (errorResponse.status === 0) {
                    errorMessage = ('Unknown Error in API call. ' + loaderName);
                }
                this.updateLoaderState(loaderName, MplXhrRequestState.ERROR, { error: errorMessage });

                return throwError(errorResponse);
            })
        );
    }

    private updateLoaderState(loaderName: string, loaderState: MplXhrRequestState, data: any = null) {
        if (loaderName) {
            this.mplAjaxLoaderService.updateLoaderState(loaderName, loaderState, data);
        }
    }
}
