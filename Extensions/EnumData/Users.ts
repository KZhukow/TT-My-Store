import * as path from 'path';

interface IUserOptions {
  login: string;
  password: string;
  isRequiredForRun?: boolean;
  isNeedCreateCookie?: boolean;
}

export class User {
  login: string;
  password: string;
  cookiePath: string;
  isRequiredForRun: boolean;
  isNeedCreateCookie: boolean;

  constructor({ login, password, isRequiredForRun = false, isNeedCreateCookie = true }: IUserOptions) {
    this.login = login;
    this.password = password;
    this.isRequiredForRun = isRequiredForRun;
    this.isNeedCreateCookie = isNeedCreateCookie;
    this.cookiePath = `${path.join(process.cwd(), 'Cookie', `${login}.json`)}`;
  }
}

export const Users = {
  testTestCom: new User({ login: 'test@test.com', password: '1234567890', isRequiredForRun: true }),
};

export function getUserCookie(user: User): string {
  return user?.cookiePath;
}
