export interface Http {
    post<T>(options: HttpPostOptions): Promise<T>;
}

export interface HttpPostOptions {
    url: string;
    username?: string;
    pat?: string;
    data?: unknown
}
