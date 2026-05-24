import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FlowbiteService } from '../../../services/flowbite';
import { initFlowbite } from 'flowbite';
import { Auth } from '../../services/auth';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationMessages } from '../../../../shared/components/validation-messages/validation-messages';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ValidationMessages],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  constructor(private flowBite: FlowbiteService) {}
  private readonly authService = inject(Auth);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);
  private destroy = inject(DestroyRef);
  registerationForm!: FormGroup;
  isLoading = signal<boolean>(false);
  formInIt() {
    this.registerationForm = this.formBuilder.group(
      {
        name: this.formBuilder.control('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(25),
        ]),
        email: this.formBuilder.control('', [Validators.email, Validators.required]),
        password: this.formBuilder.control('', [
          Validators.required,
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        ]),
        rePassword: this.formBuilder.control('', [Validators.required]),
      },
      { validators: this.rePasswordValidation },
    );
  }
  rePasswordValidation(controls: AbstractControl) {
    return controls.get('password')?.value === controls.get('rePassword')?.value
      ? null
      : { mismatch: true };
  }
  submitForm() {
    this.isLoading.set(true);
    console.log(this.registerationForm);
    if (this.registerationForm.valid) {
      this.authService
        .signUpUser(this.registerationForm.value)
        .pipe(takeUntilDestroyed(this.destroy))
        .subscribe({
          next: (res) => {
            console.log(res);
            this.authService.saveToken(res.token);

            this.router.navigate(['/auth/login']);
          },
          error: (err) => {
            console.log(err);
            this.isLoading.set(false);
              this.toastrService.error(err,"Failure");
          },
          complete: () => {
            this.isLoading.set(false);
          },
        });
    }
  }
  ngOnInit(): void {
    this.flowBite.loadFlowbite(() => {
      initFlowbite();
    });
    this.formInIt();
  }
}
