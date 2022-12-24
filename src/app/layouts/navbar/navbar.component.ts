import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  user: any;
  langs = [
    { name: 'EN', value: 'en' },
    { name: 'EL', value: 'el' },
    { name: 'FR', value: 'fr' },
    { name: 'ES', value: 'es' },
    { name: 'PT', value: 'pt-PT' },
    { name: 'IT', value: 'it' },
    { name: 'DE', value: 'de' },
    { name: 'SV', value: 'sv' },
    { name: 'RU', value: 'ru' },
    { name: 'HE', value: 'he' },
    { name: 'NO', value: 'no' },
    { name: 'NL', value: 'nl' },
  ];

  currentLang: { name: string; value: string } | undefined = {
    name: 'EN',
    value: 'en',
  };

  constructor(
    public translate: TranslateService,
    private _authService: AuthService
  ) {
    for (const lang of this.langs) {
      translate.addLangs([lang.value]);
    }
    this.user = _authService.getUser();
    translate.setDefaultLang('en');

    this.currentLang = translate.currentLang
      ? this.langs.find((l) => l.value === translate.currentLang)
      : this.langs[0];
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = translate.currentLang
        ? this.langs.find((l) => l.value === translate.currentLang)
        : this.langs[0];
    });

    const browserLang: any = translate.getBrowserLang();
  }

  logout() {
    this._authService.logout();
  }
}
