import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { forkJoin, of } from 'rxjs';
import { map, mergeMap,catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = 'https://api.github.com';
  // private token = environment.githubToken;

  constructor(private http: HttpClient) { }

  // private getHeaders(): HttpHeaders {
  //   return new HttpHeaders({
  //     'Authorization': `Bearer ${this.token}`
  //   });
  // }

  checkUsernameExists(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${username}`).pipe(
      // map(response => {
      //   if(responem)
      //   // If response contains user data, username exists
      //   return !!response; // Convert response to boolean (true if response is not empty)
        
      // })
      catchError(error => {
        if (error.status === 404) {
          // Username does not exist (404 Not Found)
          return of(false);
        }
        // For other errors, re-throw the error
        throw error;
      }),
      // If request succeeds without error, username exists
      catchError(() => of(true))
    );
  }

  getUserProfile(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${username}`);
  }

  getUserRepositories(username: string, page: number, perPage: number): Observable<any[]> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('per_page', perPage.toString());

    return this.http.get<any[]>(`${this.apiUrl}/users/${username}/repos`).pipe(
      mergeMap(repos => {
        const observables = repos.map(repo => {
          return this.http.get<any>(`${this.apiUrl}/repos/${username}/${repo.name}/languages`).pipe(
            map(languages => {
              return {
                ...repo,
                languages: Object.keys(languages)
              };
            })
          );
        });
        return forkJoin(observables);
      })
    );
  }
  

  getRepositoryDetails(username: string, repo: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/repos/${username}/${repo}/languages`);
  }
  // Other methods for fetching repository details, handling errors, etc.
}
