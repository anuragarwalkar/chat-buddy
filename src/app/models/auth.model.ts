export interface AuthSignUpModel {
    username: string;
    fullName: string;
    password: string;
    email: string;
    token?: string;
}

export interface AuthSignInModel {
    email: string;
    password: string;
    token?: string;
}