export class AppUser {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    private _accessToken: string,
    private _expiryOfAccessToken: Date,
    private _refreshToken: string
  ) {}

  get token() {
    if (!this._expiryOfAccessToken || new Date() > this._expiryOfAccessToken) {
      return null;
    }
    return this._accessToken;
  }
}
