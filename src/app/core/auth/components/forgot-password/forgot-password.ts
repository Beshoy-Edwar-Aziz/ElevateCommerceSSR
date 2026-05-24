import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { ValidationMessages } from '../../../../shared/components/validation-messages/validation-messages';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, ValidationMessages],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword implements OnInit {
  private readonly authService = inject(Auth);
  private readonly formBuilder = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  private destroy = inject(DestroyRef);
  forgotForm!: FormGroup;
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  submitForm() {
    if (this.forgotForm.valid) {
      this.isLoading.set(true);
      this.authService
        .forgotPassword(this.forgotForm.value)
        .pipe(takeUntilDestroyed(this.destroy))
        .subscribe((res) => {
          console.log(res);
          this.isLoading.set(false);
          this.toastrService.success(res.message,'Success');
          this.router.navigate(['/auth/verify']);
        });
    }
  }
  formInit() {
    this.forgotForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.email, Validators.required]),
    });
  }
  ngOnInit(): void {
    this.formInit();
  }
}
