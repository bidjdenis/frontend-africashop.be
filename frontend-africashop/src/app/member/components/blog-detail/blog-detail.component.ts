import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent implements OnInit{
  blog: any;
  id! : number
  selectedFile!: File;
  imagePreview!: string | ArrayBuffer | null

  constructor(private memberService : MemberService, private activatedRoute : ActivatedRoute){}


  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getBlog();
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  getBlog(){
    this.memberService.getBlogById(this.id).subscribe(res =>{
      this.blog = res;
      this.blog.processedImg = 'data:image/jpeg;base64,' + this.blog.byteImg;
    })
  }


}
