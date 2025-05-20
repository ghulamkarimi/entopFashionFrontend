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
    defaultAddress?: {
        fullName: string;
        street: string;
        houseNumber: string;
        city: string;
        zip: string;
        country: string;
        phone: string;
    }
}

export type TUser = Partial<IUsers>

export interface ICategory {
    _id?: string;
    name: string;
    gender: string;
    createdAt: string;
    updatedAt: string;
}
export type TCategory = Partial<ICategory>