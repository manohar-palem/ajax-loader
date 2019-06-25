/*
    Holds the list of active ajax loaders & their states
    expose the API to listen for state change event & udpate ajax loader state

    NOTE: This will be added to the root module of the application
*/

import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

// custom header name that is used to track the status of ajax call
export const MPL_AJAX_LOADER_HEADER = 'mpl-ajax-loader-id';

export enum MplXhrRequestState {
    PROGRESS = 'PROGRESS',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    CANCELED = 'CANCELED',
    NONE = 'NONE'
}

export interface MplXhrStateChangeEventData {
    id: string;
    state: MplXhrRequestState;
    data: any;
}

@Injectable({
    providedIn: 'root'
})
export class MplAjaxLoaderService {

    private xhrStateChangeEvent: EventEmitter<any> = new EventEmitter();
    /*
    *   Request id/name will be the 'key' of the dictionary
    *   Request state will be the 'value' of the dictinoary
    */
    private activeAjaxLoaders: {
        [requestId: string]: MplXhrRequestState
    } = {};

    constructor() { }

    // subscribe the callback to the xhr state change event and returns the subscription
    public subscribe(callbackFun: ((data: MplXhrStateChangeEventData) => void)): Subscription {
        return this.xhrStateChangeEvent.subscribe(callbackFun);
    }

    // add or updates the loader with the current request state
    public updateLoaderState(loaderId: string, requestCurrentState: MplXhrRequestState, eventData = null) {
        const requestPrevState = this.activeAjaxLoaders[loaderId];
        // if the loader is not there or laoder state is updated, then add/update the loader state
        // emit the change event, so that the listener will represent the change
        if (!requestPrevState || requestPrevState !== requestCurrentState) {
            let timeoutVal = 0;
            // Updating error or success state with a delay of 200 ms, so that progress state can have enough visibility time in UI for User
            // if API is responding quickly, user can not see progress state, it looks like a jerk to the UX
            if (requestCurrentState === MplXhrRequestState.ERROR || requestCurrentState === MplXhrRequestState.SUCCESS) {
                timeoutVal = 100;
            }

            setTimeout(() => {
                this.activeAjaxLoaders[loaderId] = requestCurrentState;
                // emit state change event
                this.emitXHRStateChangeEvent(loaderId, requestCurrentState, eventData);
                // deleting the loader from the list, if the XHR request is completed ( either success or error )
                if (requestPrevState === MplXhrRequestState.ERROR || requestPrevState === MplXhrRequestState.SUCCESS) {
                    this.deleteLoader(loaderId);
                }
            }, timeoutVal);
        }
    }

    private deleteLoader(xhrLoaderId: string) {
        delete this.activeAjaxLoaders[xhrLoaderId];
    }

    private emitXHRStateChangeEvent(xhrLoaderId: string, xhrState: MplXhrRequestState, eventData: any) {
        const eventObj: MplXhrStateChangeEventData = {
            id: xhrLoaderId,
            state: xhrState,
            data: eventData
        };
        this.xhrStateChangeEvent.emit(eventObj);
    }

}
