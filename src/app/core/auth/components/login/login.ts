import { Component, DestroyRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlowbiteService } from '../../../services/flowbite';
import { ValidationMessages } from '../../../../shared/components/validation-messages/validation-messages';
import { Auth } from '../../services/auth';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,ValidationMessages, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit ,OnDestroy {
  constructor(private flowBite:FlowbiteService){}
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(Auth);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);
  private destroy = inject(DestroyRef);
  loginForm!: FormGroup;
  isLoading=signal<boolean>(false);
  formIninit() {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      ]),
    });
  }
  submitForm(){
    if(this.loginForm.valid){
    this.isLoading.set(true);
    this.authService.signInUser(this.loginForm.value).pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next:(res)=>{
        this.authService.saveToken(res.token);
        this.router.navigate(['/user/home']);
        this.toastrService.success("Successfully Logged in","Success");
      },
      error:(err)=>{
        this.isLoading.set(false);
        this.toastrService.error(err,"Failure");
      },
      complete:()=>{
        this.isLoading.set(false);
      }
    })
  }
  }
  ngOnInit(): void {
    this.flowBite.loadFlowbite((flowbite) => {
         initFlowbite();
    });

    this.formIninit();
  }
  ngOnDestroy(): void {

  }
}
