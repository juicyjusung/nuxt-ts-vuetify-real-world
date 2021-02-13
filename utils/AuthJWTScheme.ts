import { HTTPRequest, HTTPResponse } from '@nuxtjs/auth-next';
import { LocalScheme } from '@nuxtjs/auth-next/dist/runtime';
import { User } from '~/models/user/user';
import { userModule } from '~/store';

export default class AuthJWTScheme extends LocalScheme {
  async login(endpoint: HTTPRequest): Promise<any> {
    try {
      const res = await this.$auth.requestWith(this.name, endpoint, this.options.endpoints.login);
      await this.$auth.setUserToken(`Token ${res.data.user.token}`);
      return res;
    } catch (error) {
      this.$auth.callOnError(error, { method: 'login' });
    }
  }

  async fetchUser(endpoint: HTTPRequest) {
    if (!this.check().valid) {
      return;
    }

    if (!this.options.endpoints.user) {
      this.$auth.setUser({});
      userModule.setUser(null);
      return;
    }

    try {
      const res = await this.$auth.requestWith(this.name, endpoint, this.options.endpoints.user);
      const user = new User(res.data.user);
      this.$auth.setUser(user);
      userModule.setUser(user);
      return res;
    } catch (error) {
      this.$auth.callOnError(error, { method: 'fetchUser' });
    }
  }

  async logout(endpoint?: HTTPRequest): Promise<void> {
    return new Promise(resolve => {
      this.$auth.reset();
      userModule.setUser(null);
      resolve();
    });
  }
}
