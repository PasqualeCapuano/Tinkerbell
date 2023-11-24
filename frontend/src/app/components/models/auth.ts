export enum UserRoles {
    user = 'USER',
    admin = 'ADMIN'
}
export interface AuthData {
    accessToken: string;
    userRole: UserRoles;
    user: {
        email: string;
        id: number;
        name: string;
        surname: string;
    };
}