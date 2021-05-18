import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShortenAPIService {

  constructor() { }

  shortenUrl(url: string) {
    return url.substr(0, 3);
  }
}
