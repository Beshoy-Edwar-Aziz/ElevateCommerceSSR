import { Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../../services/auth';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ValidationMessages } from '../../../../shared/components/validation-messages/validation-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verfication-code',
  imports: [ReactiveFormsModule, ValidationMessages],
  templateUrl: './verfication-code.html',
  styleUrl: './verfication-code.css',
})
export class VerficationCode {
  private readonly authService = inject(Auth);
  private readonly formBuilder = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  private destroy = inject(DestroyRef);
  verifyForm!: FormGroup;
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  submitForm() {
    if (this.verifyForm.valid) {
      this.isLoading.set(true);
      this.authService
        .verifyCode(this.verifyForm.value)
        .pipe(takeUntilDestroyed(this.destroy))
        .subscribe({
          next: (res) => {
            this.isLoading.set(false);
            this.toastrService.success(res.message, 'Success');
            this.router.navigate(['/auth/resetPassword']);
          },
          error: () => {
            this.isLoading.set(false);
          },
        });
    }
  }
  formInit() {
    this.verifyForm = this.formBuilder.group({
      resetCode: this.formBuilder.control('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.formInit();
  }
}
