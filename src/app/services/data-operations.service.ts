import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule,HttpHandler, HttpHeaders} from '@angular/common/http'
import {Observable,throwError} from 'rxjs'
import { tap, catchError } from 'rxjs/operators';
import {UserDataService} from './user-data.service'
import {UserData} from '../user-data'

@Injectable({
  providedIn: 'root'
})
export class DataOperationsService {

  apiurl = 'api/users';      
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  };

  constructor(private http: HttpClient) { }


  private handleError(error: any) {
    console.error(error);      //Created a function to handle and log errors, in case
    alert('Error')
    return throwError(error);
  }
  // getUsers(): Observable<UserDataService[]>{
  //   return this.http.get<UserDataService[]>(this.apiurl).pipe(
  //     tap(data => console.log("service=",data)),
  //     catchError(this.handleError)
  //   );
  // }
  getUsers() {
    return this.http.get(this.apiurl).pipe(
      catchError(this.handleError)
    );
  }

  getUser(id){
    const url= `${this.apiurl}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(user){
    const url= `${this.apiurl}/${user.id}`;
    return this.http.delete(url).pipe(
    
      catchError(this.handleError)
    );
  }

  addUser(userObj){
    return this.http.post(this.apiurl,userObj,this.httpOptions).pipe(
      tap(data=>console.log("in post",data)),
      catchError(this.handleError)

    );
  }

  updateUser(userId,userObj){
    let url =   `${this.apiurl}/${ userId}`
    return this.http.put(url,userObj,this.httpOptions)
    .pipe(
      tap(data=>console.log("in post",data)),
      catchError(this.handleError)

    );
  }
}
