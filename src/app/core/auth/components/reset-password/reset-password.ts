import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationMessages } from '../../../../shared/components/validation-messages/validation-messages';
import { Auth } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, ValidationMessages],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit {
  private readonly authService = inject(Auth);
  private readonly toastrService = inject(ToastrService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private destroy = inject(DestroyRef);
  resetForm!: FormGroup;
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  submitForm() {
    this.isLoading.set(true);
    if (this.resetForm.valid) {
      this.authService
        .resetPassword(this.resetForm.value)
        .pipe(takeUntilDestroyed(this.destroy))
        .subscribe({
          next: () => {
            this.isLoading.set(false);
            this.toastrService.success('Password Successfully Updated', 'Success');
            this.router.navigate(['/auth/login'])
          },
          error: () => {
            this.isLoading.set(false);
          },
        });
    }
  }
  formInit() {
    this.resetForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.email, Validators.required]),
      newPassword: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      ]),
    });
  }
  ngOnInit(): void {
    this.formInit();
  }
}
