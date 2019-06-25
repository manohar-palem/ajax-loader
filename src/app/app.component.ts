import { Component, AfterViewInit } from '@angular/core';

import { MplAjaxLoaderService, MplXhrRequestState, MPL_AJAX_LOADER_HEADER } from 'projects/mpl-ajax-loader/src/public-api';

import { AppService } from './app.service';

@Component({
  selector: 'mpl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public loaderId = 'GET_USERS';
  public user: any;

  constructor(
    private appService: AppService,
    private mplAjaxLoaderService: MplAjaxLoaderService
  ) {}

  ngAfterViewInit() {
    this.getUsers();
  }

  public getUsers() {
    this.appService.getUsers().subscribe( (data) => {
      this.user = data;
      // console.log('users ', data);
    } );
  }

  progress() {
    this.mplAjaxLoaderService.updateLoaderState(this.loaderId, MplXhrRequestState.PROGRESS);
  }

  error() {
    this.mplAjaxLoaderService.updateLoaderState(this.loaderId, MplXhrRequestState.ERROR);
  }

  success() {
    this.mplAjaxLoaderService.updateLoaderState(this.loaderId, MplXhrRequestState.SUCCESS);
  }

  cancel() {
    this.mplAjaxLoaderService.updateLoaderState(this.loaderId, MplXhrRequestState.CANCELED);
  }

}
