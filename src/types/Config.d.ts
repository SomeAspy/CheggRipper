export interface Config {
    BookID: string;
    UserAgent: string;
    Headless: boolean;
    HeaderOverrides: Record<string,string>;
}