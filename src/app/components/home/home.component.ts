import { DatePipe } from '@angular/common';
import { IPost } from '../../core/interfaces/ipost';
import { PostsService } from './../../core/services/posts/posts.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommentsComponent } from "../../shared/ui/comments/comments.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, CommentsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly _PostsService= inject(PostsService)

  postList:IPost[] = []

  ngOnInit(): void {
    this._PostsService.getAllPosts().subscribe({
      next: (res) => {
        this.postList = res.posts
        console.log(this.postList);

      }, error: (err) => {
        console.log(err);
      }
    })
  }

}
