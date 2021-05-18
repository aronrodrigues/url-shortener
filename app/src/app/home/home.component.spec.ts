import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import * as faker from 'faker';
import { ShortenAPIService } from '../shorten-api.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let shortenAPISrvcSpy: ShortenAPIService;
  beforeEach(async () => {
    shortenAPISrvcSpy = jasmine.createSpyObj('ShortenAPIService', [
      'shortenUrl'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        HomeComponent
      ],
      providers: [
        { provide: ShortenAPIService, useValue: shortenAPISrvcSpy },
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should shorten the url in the input field', async () => {
    const apiShortenedUrl = faker.internet.url();
    (shortenAPISrvcSpy.shortenUrl as jasmine.Spy).and.returnValue(apiShortenedUrl);
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    app.form.controls.url.setValue(faker.internet.url());
    await app.shortenItAction();
    expect(app.shortenedUrl).toEqual(apiShortenedUrl);

    fixture.detectChanges();

    const responseText = fixture.debugElement.query(By.css('.response-text'));
    expect(responseText.nativeElement.text).toEqual(apiShortenedUrl);
  });


});
