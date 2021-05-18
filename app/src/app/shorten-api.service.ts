import { PlatformLocation } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShortenAPIService {
  private root: string;
  constructor(platformLocation: PlatformLocation) {
    this.root = `${platformLocation.protocol}://${platformLocation.hostname}`;
    if (platformLocation) {
      this.root += `:${platformLocation.port}`;
    }
  }

  async shortenUrl(url: string): Promise<string> {
    return `${this.root}/${url.substr(0, 3)}`;
  }

  async loadUrl(id: any): Promise<string> {
    return 'http://www.uol.com.br'; // `${this.root}/${id}`;
  }
}
