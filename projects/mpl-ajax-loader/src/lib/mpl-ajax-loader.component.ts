import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { MplAjaxLoaderService, MplXhrRequestState, MplXhrStateChangeEventData } from './mpl-ajax-loader.service';
import { MplAjaxLoaderOptions } from './mpl-ajax-loader.options';
import { DEFAULT_OPTIONS } from './local-config';

@Component({
  selector: 'mpl-ajax-loader',
  templateUrl: './mpl-ajax-loader.component.html',
  styleUrls: ['./mpl-ajax-loader.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MplAjaxLoaderComponent implements OnInit, OnDestroy, OnChanges {
  @Input() loaderId: string;
  @Input() options?: MplAjaxLoaderOptions;


  public config: MplAjaxLoaderOptions;
  public canShow = true;
  public currentState: MplXhrRequestState;
  public statusMessage: string;
  public requestStates = MplXhrRequestState;
  private loaderStateChangeSubscription: Subscription;


  constructor(private mplAjaxLoaderService: MplAjaxLoaderService) {
    this.config = {
      ...DEFAULT_OPTIONS
    };
    this.updateUI();
  }

  ngOnInit() {
    // console.log('ajax loader component');
    this.loaderStateChangeSubscription = this.mplAjaxLoaderService.subscribe((loaderStateEvent: MplXhrStateChangeEventData) => {
      if (this.loaderId === loaderStateEvent.id) {
        // this timeout is required to avoid "Expression has changed error"
        // we are giving a time delay so that it will update the values in next execution cycle
        setTimeout(() => {
          this.currentState = loaderStateEvent.state;
          this.updateUI(loaderStateEvent.data);
        });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const options = changes.options;
    // if optios has changed
    if (options) {
      this.updateOptions();
      this.updateUI();
    }
  }

  ngOnDestroy() {
    if (this.loaderStateChangeSubscription) {
      this.loaderStateChangeSubscription.unsubscribe();
    }
  }

  public close(event) {
    this.canShow = false;
  }

  private updateOptions() {
    this.config = {
      closeIcon: {
        ...DEFAULT_OPTIONS.closeIcon,
        ...this.options.closeIcon
      },
      loader: {
        ...DEFAULT_OPTIONS.loader,
        ...this.options.loader
      },
      text: {
        ...DEFAULT_OPTIONS.text,
        ...this.options.text
      },
      template: {
        ...DEFAULT_OPTIONS.template,
        ...this.options.template
      }
    };
  }

  private updateUI(data = {}) {
    switch (this.currentState) {
      case MplXhrRequestState.PROGRESS: {
        this.canShow = (this.config.loader.progress === true);
        break;
      }
      case MplXhrRequestState.ERROR: {
        this.canShow = (this.config.loader.error === true);
        this.statusMessage = this.getStatus(data);
        break;
      }
      case MplXhrRequestState.SUCCESS: {
        this.canShow = (this.config.loader.success === true);
        break;
      }
      case MplXhrRequestState.CANCELED: {
        this.canShow = (this.config.loader.cancelled === true);
        this.statusMessage = this.getStatus(data);
        break;
      }
      default: {
        this.canShow = false;
      }
    }
  }

  private getStatus(xhrStatusData: any) {
    let status = '';
    if (xhrStatusData && typeof xhrStatusData === 'object') {
      status = xhrStatusData.error || xhrStatusData.detail || '';
    }
    return status;
  }

}





