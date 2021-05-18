import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import * as faker from "faker";
import { ShortenAPIService } from './shorten-api.service';
import { PlatformLocation } from '@angular/common';

describe('AppComponent', () => {
  let shortenAPISrvcSpy: ShortenAPIService;
  let platformLocation: PlatformLocation;
  beforeEach(async () => {
    shortenAPISrvcSpy = jasmine.createSpyObj("ShortenAPIService", [
      "shortenUrl"
    ])
    platformLocation = jasmine.createSpyObj("PlatformLocation", [
      "hostname",
      "protocol",
      "port",
    ]);

    (platformLocation as any).hostname = "localhost";
    (platformLocation as any).protocol = "http";
    (platformLocation as any).port = "4200";

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: ShortenAPIService, useValue: shortenAPISrvcSpy },
        { provide: PlatformLocation, useValue: platformLocation }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  it('should shorten the url in the input field', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.form.controls.url.setValue(faker.internet.url());
    app.shortenItAction()
    expect(app.shortenedUrl.indexOf("http:")).toEqual(0)
    expect(app.shortenedUrl.indexOf("4200")).toBeGreaterThan(0)
    expect(app.shortenedUrl.indexOf("localhost")).toBeGreaterThan(0)

    fixture.detectChanges();

    const responseText = fixture.debugElement.query(By.css('.response-text'));
    expect(responseText.nativeElement.text).toEqual(app.shortenedUrl)
  });


});
