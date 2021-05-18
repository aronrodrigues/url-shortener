import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShortenAPIService } from '../shorten-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  shortenedUrl: string;
  form: FormGroup;

  constructor(private shortenAPISrvc: ShortenAPIService) {
    this.buildFormGroup();
  }

  private buildFormGroup(): void {
    const fb = new FormBuilder();
    this.form = fb.group({
      url: fb.control('', [
        Validators.required,
        Validators.pattern('http(s)?://.*'),
      ]),
    });
  }

  async shortenItAction(): Promise<void> {
    const url = this.form.controls.url.value;
    this.shortenedUrl = await this.shortenAPISrvc.shortenUrl(url);
  }
}
