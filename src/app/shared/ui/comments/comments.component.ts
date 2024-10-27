import { Comment } from './../../../core/interfaces/ipost';
import { Component, Input, input, OnInit } from '@angular/core';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { Icomment } from '../../../core/interfaces/icomment';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {
  commentList: Icomment[] = []
  constructor(private _CommentsService: CommentsService) { };
  @Input({ required: true }) postId!: string
  commentForm!: FormGroup

  ngOnInit(): void {

    this.commentForm = new FormGroup({
      content: new FormControl(null),
      post: new FormControl(this.postId)
    });

    this._CommentsService.getPostComment(this.postId).subscribe({
      next: (res) => {
        this.commentList = res.comments
        console.log(this.commentList);
      }, error: (err) => {
        console.log(err);

      }
    })
  }

  submitComment():void{
    this._CommentsService.createComment(this.commentForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.commentList = res.comments
        this.commentForm.get('content')?.reset()
      },error:(err)=>{
        console.log(err);
      }
    })
  }

}
