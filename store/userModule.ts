import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { ApiUser } from '~/api/user';
import { isUser, User } from '~/models/user';

export type ReqUserLogin = Pick<User, 'email'> & { password: string };
export type ReqSignup = Pick<User, 'email' | 'username'> & { password: string };

@Module({
  name: 'userModule',
  namespaced: true,
  stateFactory: true,
  preserveState: true,
})
export default class UserModule extends VuexModule {
  user: User | null = null;

  @Mutation
  setUser(user: User | null) {
    this.user = user;
  }

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  @Action({ rawError: true })
  async signup(payload: ReqSignup): Promise<User | boolean> {
    try {
      const { user } = await ApiUser.signup(payload);
      if (isUser(user)) {
        return user;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}
