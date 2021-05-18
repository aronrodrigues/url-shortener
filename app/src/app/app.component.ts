import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShortenAPIService } from './shorten-api.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  root: string;
  shortenedUrl: string;
  form: FormGroup;

  constructor(
    private shortenAPISrvc: ShortenAPIService,
    private platformLocation: PlatformLocation
  ) {
    this.buildFormGroup();
    this.root = `${platformLocation.protocol}://${platformLocation.hostname}`;
    if (platformLocation) {
      this.root += `:${platformLocation.port}`;
    }
  }

  private buildFormGroup() {
    const fb = new FormBuilder();
    this.form = fb.group({
      url: fb.control(''),
    });
  }

  shortenItAction() {
    const url = this.form.controls.url.value;
    this.shortenedUrl = `${this.root}/${this.shortenAPISrvc.shortenUrl(url)}`;
  }
}
