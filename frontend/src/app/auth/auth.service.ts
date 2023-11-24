import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { urlLogIn} from "../../environments/environment";
import { AuthData, UserRoles } from '../components/models/auth';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    jwtHelper = new JwtHelperService();

    authSubject = new BehaviorSubject<null | AuthData>(null); // BSubject that contains the AuthData of a logged user, or null
    user$ = this.authSubject.asObservable();
    isLoggedIn$ = this.user$.pipe(map(authData => !!authData)); // tell whether the user is logged 
    isAdmin$= this.user$.pipe(map(authData => authData?.userRole == 'ADMIN'));

    autoLogoutTimer: any;

    constructor(private http: HttpClient, private router: Router) {
        console.log(URL);
        this.restoreUser();

    }

   


    login(data: { username: string, password: string }) {

        const loginLogic = (authData: AuthData): void =>  {
            localStorage.setItem('userAuthData', JSON.stringify(authData));
            //const expirationDate = this.jwtHelper.getTokenExpirationDate(authData.accessToken) as Date;
            const expirationDate = new Date();
            this.autoLogout(expirationDate);
            this.authSubject.next(authData);
        }

    //    this.http.post<AuthData>(`${urlLogIn}`, data).pipe(
    //         tap(data => loginLogic(data)),
    //         catchError(this.errors)
    //     );

    // the following part of the method is temporary and for testing purposes
        let authDataTemp =  { 
                accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                userRole: UserRoles.admin,
                user: {
                    email: 'pippo@gmail.it',
                    id: 666,
                    name: 'pippo',
                    surname: 'pluto'
                }
            }

        loginLogic(authDataTemp);
        return of<AuthData>(authDataTemp);
    }

    restoreUser() {
        const userJson = localStorage.getItem('userAuthData');
        if (!userJson) {
            return;
        }
        const user: AuthData = JSON.parse(userJson);
        if (this.jwtHelper.isTokenExpired(user.accessToken)) {
            return;
        }
        this.authSubject.next(user);
        const expirationDate = this.jwtHelper.getTokenExpirationDate(
            user.accessToken
        ) as Date;
        this.autoLogout(expirationDate);
    }

    logout() {
        this.authSubject.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userAuthData');
        if (this.autoLogoutTimer) {
            clearTimeout(this.autoLogoutTimer);
        }
    }

    autoLogout(expirationDate: Date) {
        //getTime da il valore della data in ms
        const expMs = expirationDate.getTime() - new Date().getTime(); //ms rimasti primache scada
        this.autoLogoutTimer = setTimeout(() => {
            this.logout();
        }, expMs);
    }

    private errors(err: any) {
        switch (err.error) {
            case 'Email and password are required':
                throw new Error('Email e password sono obbligatorie');
                break;
            case 'Email already exists':
                return throwError('Utente già registrato');
                break;
            case 'Email format is invalid':
                return throwError('Email scritta male');
                break;
            case 'Cannot find user':
                return throwError("L'utente non esiste");
                break;
            default:
                return throwError('Errore nella chiamata');
                break;
        }
    }
}