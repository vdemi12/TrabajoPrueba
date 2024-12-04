import { Inject, Injectable } from "@angular/core";
import { IAuthentication } from "../interfaces/authentication.interface";
import { BehaviorSubject, Observable } from "rxjs";
import { IAuthMapping } from "../interfaces/auth-mapping.interface";
import { User } from "../../models/auth.model";


@Injectable({
    providedIn: 'root'
  })
export abstract class BaseAuthenticationService implements IAuthentication{
    protected _authenticated:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public authenticated$:Observable<boolean> = this._authenticated.asObservable();

    protected _user:BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
    public user$:Observable<User | undefined> = this._user.asObservable();
    protected _ready:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public ready$:Observable<boolean> = this._ready.asObservable();
    abstract updateUser(userId: string, userData: Partial<User>): Observable<User>;
    constructor(
        protected authMapping:IAuthMapping
    ){

    }
    abstract getCurrentUser(): Promise<User>;    
    abstract signIn(authPayload: any): Observable<any>;
    abstract signUp(registerPayload: any): Observable<any>;
    abstract signOut(): Observable<any>;
    abstract me():Observable<any>;
    
}