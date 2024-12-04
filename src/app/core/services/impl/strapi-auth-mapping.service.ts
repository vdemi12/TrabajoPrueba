import { Injectable } from "@angular/core";
import { Paginated } from "../../models/paginated.model";
import { Season } from "../../models/season.model";
import { Serie } from "../../models/serie.model";
import { IAuthMapping } from "../interfaces/auth-mapping.interface";
import { SignInPayload, SignUpPayload, User } from "../../models/auth.model";


export interface StrapiMeResponse {
    id: number
    username: string,
    name: string
    surname: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
}

export interface StrapiSignInResponse {
    jwt: string
    user: StrapiUser
  }

export interface StrapiSignUpResponse {
    jwt: string
    user: StrapiUser
  }
  
  export interface StrapiUser {
    id: number
    username: string
    name: string
    surname: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
  }
  

interface StrapiSignIn{
    identifier:string,
    password:string
}

interface StrapiSignUp{
    username: string,
    name: string,
    surname: string,
    email: string,
    password: string,
    
}
export interface SerieRaw {
    id: string
    nombre: string
}
@Injectable({
    providedIn: 'root'
  })
  export class StrapiAuthMappingService implements IAuthMapping {
    signInPayload(payload: SignInPayload):StrapiSignIn{
        return {
            identifier:payload.email,
            password:payload.password
        };
    }
    signUpPayload(payload: SignUpPayload): StrapiSignUp {
        return {
            username: payload.username,
            email: payload.email,
            password: payload.password,
            name: payload.name,
            surname: payload.surname
        };
    }
    signIn(response: StrapiSignInResponse): User {
        return {
            id:response.user.id.toString(),
            username: response.user.username,
            name:response.user.name,
            surname:response.user.surname,
            email:response.user.email
        };
    }
    signUp(response: StrapiSignUpResponse): User {
        return {
            id:response.user.id.toString(),
            username: response.user.username,
            name:response.user.name,
            surname:response.user.surname,
            email:response.user.email
        };
    }

    me(response: StrapiMeResponse): User {
        return {
            id:response.id.toString(),
            username: response.username,
            name:response.name,
            surname:response.surname,
            email:response.email
        };
    }
    
  }
  