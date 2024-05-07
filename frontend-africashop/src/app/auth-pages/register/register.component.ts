import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  signupForm!: FormGroup;
  submitted : boolean = false;
  
  constructor(private authService : AuthService, private fb : FormBuilder, private router : Router,private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["",Validators.required],
    })
  }

  get f(){return this.signupForm.controls}

  submit() : void {
    this.submitted = true;

    const password = this.signupForm.get('password')?.value
    const confirmPassword = this.signupForm.get('confirmPassword')?.value

    if(password !== confirmPassword){
      this.snackBar.open('Passwords do not match.', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      return;
    }

    if(this.signupForm.invalid){
      return;
    }
    else {

      this.authService.signup(this.signupForm.value).subscribe(data => {
        console.log(this.signupForm.value)
        this.router.navigateByUrl("/auth-pages/login");
      }, err => 
      {console.log(err)}

      )
    }
  }
}
