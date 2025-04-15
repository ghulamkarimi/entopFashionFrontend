export interface IUsers {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    isGuest: boolean;
    isVerified: boolean;
    customerNumber?: string;
    isAdmin: boolean;
    accessToken?: string;
    refreshToken?: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    exp: string;
}

export type TUser = Partial<IUsers>