import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest, HttpEventType } from '@angular/common/http';

import { UserResponse } from './users';

const body = {
    title: 'foo',
    body: 'bar',
    userId: '1'
};

interface UserResponse1 {
    login:string,
    bio:string,
    company:string  
} 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';
  name:string;  
  
   // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
      // Make the HTTP request.
      this.http.get<UserResponse>('https://jsonplaceholder.typicode.com/users')
               .subscribe(
                  data => {
                   console.log(data[0]); 
                  },
                  (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) {
                      // A client-side or network error occurred. Handle it accordingly.
                      console.log('An error occurred:', err.error.message);
                    } else {
                      // The backend returned an unsuccessful response code.
                      // The response body may contain clues as to what went wrong,
                      console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                    }
                 }  
               );

     this.http.get<UserResponse1>('https://api.github.com/users/MiHawkStackOverFlow').subscribe(
         data => {
            console.log("User login", data.login);
            console.log("User info", data.bio);
            console.log("User company", data.company);
            this.name = data["name"];
         }  
     )          
  }
  
  ngAfterViewInit():void {
      this.http.post('https://jsonplaceholder.typicode.com/posts', body, {
        params: new HttpParams().set('id', '101'),
      }).subscribe(data => console.log(data));

      const req = new HttpRequest('POST', 'http://httpbin.org/post', 'https://media.giphy.com/media/aOFiX9kILoeDC/giphy.gif', {
        reportProgress: true,
      });

      this.http.request(req).subscribe(event => {
      // Via this API, you get access to the raw event stream.
      // Look for upload progress events.
      if (event.type === HttpEventType.UploadProgress) {
        // This is an upload progress event. Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        console.log(`File is ${percentDone}% uploaded.`);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });
  }
}
