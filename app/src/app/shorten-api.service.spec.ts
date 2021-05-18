import { TestBed } from '@angular/core/testing';

import { ShortenAPIService } from './shorten-api.service';

import * as faker from 'faker';
import { PlatformLocation } from '@angular/common';

describe('ShortenAPIService', () => {
  let service: ShortenAPIService;
  let platformLocationSpy: PlatformLocation;

  beforeEach(() => {
    platformLocationSpy = jasmine.createSpyObj('PlatformLocation', [
      'hostname',
      'protocol',
      'port',
    ]);

    (platformLocationSpy as any).hostname = 'localhost';
    (platformLocationSpy as any).protocol = 'http';
    (platformLocationSpy as any).port = '4200';
    service = new ShortenAPIService(platformLocationSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a shorten url', async () => {
    const url = faker.internet.url();
    const shortenedUrl = await service.shortenUrl(faker.internet.url());
    expect(shortenedUrl.length - 21).toBeLessThan(url.length);
  });

  it('should load the Url from the API', async () => {
    const url = await service.loadUrl(faker.datatype.number);
    expect(url).not.toBeNull();
  });
});
