// each session contains the username of the user and the time at which it expires
export class Session {
  username: string;
  expiresAt: Date;

  constructor(username: string, expiresAt: Date) {
    this.username = username;
    this.expiresAt = expiresAt;
  }

  // we'll use this method later to determine if the session has expired
  isExpired() {
    return this.expiresAt < new Date();
  }
}

// this object stores the users sessions. For larger scale applications, you can use a database or cache for this purpose
export const sessions: { [key: string]: Session } = {};
