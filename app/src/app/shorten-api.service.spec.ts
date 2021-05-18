import { TestBed } from '@angular/core/testing';

import { ShortenAPIService } from './shorten-api.service';

import * as faker from 'faker';

describe('ShortenAPIService', () => {
  let service: ShortenAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortenAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a shorten url', ()=> {
    const url = faker.internet.url()
    const shortenedUrl = service.shortenUrl(faker.internet.url());
    expect(shortenedUrl.length).toBeLessThan(url.length);
  })
});
