import { FormControl } from "@angular/forms";

export interface SignUpUser {
    name?: string|null,
    email?:string|null,
    password?:string|null,
    rePassword?:string|null,
    phone?:string|null
}
