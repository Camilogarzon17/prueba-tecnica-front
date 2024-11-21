import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable, RendererFactory2 } from "@angular/core";
import { BehaviorSubject, catchError, Observable, throwError } from "rxjs";
import { environment } from "../../Enviroments/Environment";
import { User } from "../models/UserModel";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userDataSubject = new BehaviorSubject<User | null>(null);
  userData$ = this.userDataSubject.asObservable();

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private rendererFactory: RendererFactory2) { }

  getUser(type: string, numberDoc: number): Observable<User> {
    const params = new HttpParams()
      .set('type', type)
      .set('numberDoc', numberDoc.toString());

    return this.http
      .get<User>(`${this.baseUrl}`, { params })
      .pipe(catchError(this.handleError));
  }

  setUserData(data: User) {
    this.userDataSubject.next(data);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError(() => new Error('Something went wrong, please try again later'));
  }
}
