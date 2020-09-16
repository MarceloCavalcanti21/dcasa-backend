declare namespace Express {
    export interface Request {
        user: {
            id: string;
        };
        io: any;
        // connectedUsers: {
        //     id: string;
        // };
    }
}
