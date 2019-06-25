import { TestBed } from '@angular/core/testing';

import { MplAjaxLoaderService } from './mpl-ajax-loader.service';

describe('MplAjaxLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MplAjaxLoaderService = TestBed.get(MplAjaxLoaderService);
    expect(service).toBeTruthy();
  });
});
