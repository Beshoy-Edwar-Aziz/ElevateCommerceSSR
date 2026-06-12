import { Component, DestroyRef, inject, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { ValidationMessages } from '../../../../shared/components/validation-messages/validation-messages';
import { AddressesService } from '../../services/addresses-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user-address',
  imports: [ValidationMessages,ReactiveFormsModule,TranslatePipe],
  templateUrl: './user-address.html',
  styleUrl: './user-address.css',
})
export class UserAddress implements OnInit {
  private readonly addressService = inject(AddressesService);
  private readonly formBuilder = inject(FormBuilder);
  private destroy = inject(DestroyRef);
  addressForm!:FormGroup;
  isLoading:WritableSignal<boolean>= signal<boolean>(false);
  @Input() closeForm!:()=>void;
  @Input() address!:WritableSignal<UserAddress[]>;
  formInit(){
    this.addressForm = this.formBuilder.group({
      name: this.formBuilder.control( '',[Validators.minLength(3),Validators.maxLength(22),Validators.required]),
      details: this.formBuilder.control('',[Validators.minLength(3),Validators.maxLength(22),Validators.required]),
      phone: this.formBuilder.control('',[Validators.pattern("01[0-2,5]{1}[0-9]{8}"),Validators.required]),
      city:this.formBuilder.control('',[Validators.minLength(3),Validators.maxLength(22),Validators.required])
    })
  }
  submitForm(){
    if(this.addressForm.valid){
    this.isLoading.set(true);
    this.addressService.addAddress(this.addressForm.value).pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next:(res)=>{
        console.log(res);
        this.address.set(res.data);
        this.isLoading.set(false);
        this.closeForm();
        this.addressForm.reset();
      }
    })
  }
  }
  ngOnInit(): void {
    this.formInit();
  }
}
