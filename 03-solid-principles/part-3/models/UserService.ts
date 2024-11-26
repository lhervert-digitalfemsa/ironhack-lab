type User = {
  username: string;
  password: string;
}

export class UserService {
  async login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin' && password === 'admin') {
          resolve(true);
        } else {
          reject(false);
        }
      }, 1000);
    });
  }
}

