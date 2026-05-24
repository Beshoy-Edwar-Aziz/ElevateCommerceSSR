import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SignUpUser } from '../../../core/auth/models/signupuser';

@Component({
  selector: 'validation-messages',
  imports: [],
  templateUrl: './validation-messages.html',
  styleUrl: './validation-messages.css',
})
export class ValidationMessages {
  @Input({required:false}) controls!:AbstractControl|null

}
