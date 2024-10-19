import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private _HttpClient:HttpClient) { }

  createComment(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}comments` , data)
  }
  getPostComment(postID:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}posts/${postID}/comments`)
  }
  updateComment(data:object , commentID:string):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}comments/${commentID}` , data)
  }
  deleteComment(commentID:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}comments/${commentID}`)
  }
}
