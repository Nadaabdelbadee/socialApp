import { DatePipe } from '@angular/common';
import { IPost } from '../../core/interfaces/ipost';
import { PostsService } from './../../core/services/posts/posts.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommentsComponent } from "../../shared/ui/comments/comments.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, CommentsComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly _PostsService = inject(PostsService)

  postList: IPost[] = []
  savedFile!: File
  content: string = ''

  getAllPosts(): void {
    this._PostsService.getAllPosts().subscribe({
      next: (res) => {
        this.postList = res.posts
        console.log(this.postList);

      }, error: (err) => {
        console.log(err);
      }
    })
  }
  ngOnInit(): void {
    this.getAllPosts()
  }
  changeImg(e: Event): void {

    const input = e.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      this.savedFile = input.files[0];
    }

  }
  createPost(): void {
    const formData = new FormData();
    formData.append('body', this.content);
    formData.append('image', this.savedFile);
    this._PostsService.createPost(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllPosts()
      }
    })
  }

}
