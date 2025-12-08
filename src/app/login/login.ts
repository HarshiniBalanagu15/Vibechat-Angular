import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form = new FormGroup({
    username: new FormControl,
    firstname: new FormControl,
    lastname: new FormControl,
    cnfpassword: new FormControl,
    password: new FormControl
  })

  showSignUp = false
  toggleShowSignUp(){
    this.showSignUp = !this.showSignUp
  }

  handleSubmit(e: Event){
    e.preventDefault()
    console.log(this.form.value)
  }
}
