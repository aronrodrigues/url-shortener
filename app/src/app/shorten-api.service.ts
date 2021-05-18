import { PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShortenAPIService {
  private root: string;
  constructor(platformLocation: PlatformLocation, private http: HttpClient) {
    this.root = `${platformLocation.protocol}://${platformLocation.hostname}`;
    if (platformLocation) {
      this.root += `:${platformLocation.port}`;
    }
  }

  async shortenUrl(url: string): Promise<string> {
    const response: any = await this.http
    .put(`${environment.api.endpoint}/links/`, { url }, {
      responseType: 'json',
    })
    .toPromise();
    return response.id;
  }

  async loadUrl(id: any): Promise<string> {
    const response: any = await this.http
      .get(`${environment.api.endpoint}/links/${id}`, {
        responseType: 'json',
      })
      .toPromise();
    return response.url;
  }
}
