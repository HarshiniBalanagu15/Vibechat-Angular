import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private http: HttpClient){}

  form = new FormGroup({
    userName: new FormControl,
    firstName: new FormControl,
    lastName: new FormControl,
    cnfpassword: new FormControl,
    password: new FormControl
  })

  showSignUp = false
  toggleShowSignUp(){
    this.showSignUp = !this.showSignUp
  }

  handleSubmit(e: Event){
    e.preventDefault()
    if(!this.showSignUp){
      this.http.post('http://localhost:8080/users/login', this.form.value)
     .subscribe({
          next: (res) => console.log('Success:', res),
          error: (err) => console.error('Error:', err)
        });
    }else{
      this.http.post('http://localhost:8080/users/signup', this.form.value)
     .subscribe({
          next: (res) => console.log('Success:', res),
          error: (err) => console.error('Error:', err)
        });
    }
  }
}
