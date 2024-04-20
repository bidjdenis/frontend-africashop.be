import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm! : FormGroup
  submitted : boolean = false;
  
  constructor(private authService : AuthService, private fb : FormBuilder, private router : Router, private snackbar : MatSnackBar){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email : ["", Validators.required],
      password : ["", Validators.required]
    })
  }

  get f(){return this.loginForm.controls}

  Onsubmit(): void{

    this.submitted = true;

    const username = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if(this.loginForm.invalid){
      return;
    }
    else{
      this.authService.login(username,password).subscribe((res:any) => {
        if(StorageService.isAdminLoggedIn()){
          this.router.navigateByUrl('admin/dashboard');
        }else if(StorageService.isCustomerLoggedIn()){
          this.router.navigateByUrl('/member/dashboard')
        }
      }, (error :any) => {
        this.snackbar.open('Bad informations', 'close', {duration: 5000});
      })
    }
  }

}
