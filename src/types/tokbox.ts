export interface CreateResponse {
    status: boolean;
    apiKey: string;
    sessionId: string;
    token: string;
    password: string;
}

export interface ErrorResponse {
    status?: number;
    message: string;
}