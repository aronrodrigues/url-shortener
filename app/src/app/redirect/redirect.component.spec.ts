import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ShortenAPIService } from '../shorten-api.service';

import { RedirectComponent } from './redirect.component';
import * as faker from 'faker';
import { DOCUMENT } from '@angular/common';

describe('RedirectComponent', () => {
  let component: RedirectComponent;
  let fixture: ComponentFixture<RedirectComponent>;
  let shortenAPISrvcSpy: ShortenAPIService;
  let routeSpy: ActivatedRouteSnapshot;
  let routerSpy: Router;
  let id: any;
  let originalDefaultView: any;


  beforeEach(async () => {
    id = faker.datatype.number();
    shortenAPISrvcSpy = jasmine.createSpyObj('ShortenAPIService', [
      'loadUrl'
    ]);
    routeSpy = jasmine.createSpyObj('Route', ['*']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    (routeSpy as any).snapshot = {
      params: { id }
    };
    originalDefaultView = document.defaultView;

    spyOnProperty(document, 'defaultView', 'get').and.returnValue({
      location: { href: undefined }
    });

    await TestBed.configureTestingModule({
      declarations: [ RedirectComponent ],
      providers: [
        { provide: ShortenAPIService, useValue: shortenAPISrvcSpy },
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: Router, useValue: routerSpy },
        { provide: DOCUMENT, useValue: document}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to url if it exists', async () => {
    const url = faker.internet.url();

    (shortenAPISrvcSpy.loadUrl as jasmine.Spy).and.resolveTo(url);
    await component.ngOnInit();
    expect(shortenAPISrvcSpy.loadUrl).toHaveBeenCalledWith(id);
    expect(document.defaultView.location.href).toEqual(url);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to home if it does not exists', async () => {
    const id = faker.datatype.number();
    (routeSpy as any).snapshot = {
      params: { id }
    };
    (shortenAPISrvcSpy.loadUrl as jasmine.Spy).and.returnValue(null);
    await component.ngOnInit();
    expect(shortenAPISrvcSpy.loadUrl).toHaveBeenCalledWith(id);
    expect(document.defaultView.location.href).toBeUndefined();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
