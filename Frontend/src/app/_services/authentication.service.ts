import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// import { environment } from '@environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    baseUrl = 'https://localhost:4001/';
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    // isLoggedIn: boolean = true;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(this.baseUrl + 'users/authenticate', { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                // this.isLoggedIn = true;
                return user;
            }));
    }

    getUsername() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    register(username: string, password: string, email: string, phone: string, role: string) {
        return this.http.post<any>(this.baseUrl + 'users/register',
         { username, password,email, phone, role });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        // this.isLoggedIn = false;
        this.currentUserSubject.next(null);
    }
}