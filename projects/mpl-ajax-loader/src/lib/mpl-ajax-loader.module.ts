import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { MplAjaxLoaderInterceptor } from './mpl-ajax-loader.interceptor';
import { MplAjaxLoaderComponent } from './mpl-ajax-loader.component';
import { MplAjaxLoaderOptions } from './mpl-ajax-loader.options';
import { updateDefaultOptions } from './local-config';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MplAjaxLoaderComponent
  ],
  exports: [
    MplAjaxLoaderComponent
  ]
})
export class MplAjaxLoaderModule {
  static forRoot(options?: MplAjaxLoaderOptions): ModuleWithProviders {
    if (options) {
      updateDefaultOptions(options);
    }

    return {
      ngModule: MplAjaxLoaderModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MplAjaxLoaderInterceptor,
          multi: true
        }
      ]
    };
  }
}
