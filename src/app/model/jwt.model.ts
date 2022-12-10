export interface Jwt {
  token: string;
  username: string;
  authorities: string[];
  token_HEADER: string;
}
