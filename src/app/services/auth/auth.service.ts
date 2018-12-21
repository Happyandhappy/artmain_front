import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthService {
    url:string = "";

    constructor(private http: HttpClient, public route: ActivatedRoute) {
      let host = window.location.hostname    ; //window.location.hostname     
      this.url = 'http://' + host + ':8000';
    }
   
    // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
    public login(userinfo) { 
      
      return this.http.post<any>( this.url + '/login/',userinfo)
        .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if(user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes              
              user.tokenTime = new Date().getTime()/1000;
              localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
      }));
    }
    
    public logout(){
      localStorage.removeItem('currentUser');
    }

    public register(userinfor){
      return this.http.post<any>(this.url + '/register/', userinfor)
              .pipe(map(user => {                    
                return user;
              }));
    }
}


