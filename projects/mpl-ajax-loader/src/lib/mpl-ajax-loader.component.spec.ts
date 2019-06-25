import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MplAjaxLoaderComponent } from './mpl-ajax-loader.component';

describe('MplAjaxLoaderComponent', () => {
  let component: MplAjaxLoaderComponent;
  let fixture: ComponentFixture<MplAjaxLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MplAjaxLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MplAjaxLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
