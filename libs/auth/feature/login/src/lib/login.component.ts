import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { AuthDataService } from '@ui/auth/data-access';
import { LocalStorageService } from '@ui/shared/data-access';
import { finalize } from 'rxjs';

@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [NzLayoutModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less',
})
export class LoginComponent {
  form = new FormGroup({
    loginId: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });
  loading!: boolean;
  private authDataService = inject(AuthDataService);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  onSubmit() {
    this.loading = true;
    const { loginId, password } = this.form.value;
    this.authDataService
      .login(loginId, password)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: ({ token, refreshToken, tokenExpirationInstant }) => {
          this.localStorageService.set(
            'auth',
            JSON.stringify({ token, refreshToken, tokenExpirationInstant })
          );
          void this.router.navigateByUrl('/');
        },
      });
  }
}
