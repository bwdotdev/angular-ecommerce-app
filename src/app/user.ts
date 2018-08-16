export class User {

    userID: number;
    givenName?: string;
    familyName?: string;
    email: string|{
        verified: boolean,
        address: string
    };

}
