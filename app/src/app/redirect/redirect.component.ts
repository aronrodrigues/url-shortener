import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShortenAPIService } from '../shorten-api.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
})
export class RedirectComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private router: Router,
    private shortenApiSrvc: ShortenAPIService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params.id;
    const url = await this.shortenApiSrvc.loadUrl(id);
    if (url !== null) {
      this.document.defaultView.location.href = url;
    } else {
      this.router.navigate(['/']);
    }

  }
}
