import { Component, OnInit } from '@angular/core';
import { MemberService } from '../services/member.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  profileForm!: FormGroup;

  constructor(private memberService : MemberService, private fb: FormBuilder, private snackbar : MatSnackBar){}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      email: [''],
      name: ['']
    });

    this.memberService.getUserById().subscribe((userProfile) => {
      this.profileForm.patchValue(userProfile);
    });
  }

  onUpdate() {
    this.memberService.updateUser(this.profileForm.value).subscribe(response => {
      this.snackbar.open("profile updated", "close", {duration : 4000})
    });
  }

}
