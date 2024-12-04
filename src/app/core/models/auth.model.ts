export interface SignInPayload{
    email:string,
    password:string
}

export interface SignUpPayload{
    username: string,
    email:string,
    password:string,
    name:string,
    surname:string,
    user:string
}

export interface User{
    id: string;
    username: string,
    name: string;
    surname: string;
    email: string;
    picture?: string;
}