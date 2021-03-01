import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { ApiUser, ReqSignup, ReqUpdateUser, ReqUserLogin } from '~/api/user';
import { isUser, User } from '~/models/user';

@Module({
  name: 'userModule',
  namespaced: true,
  stateFactory: true,
  preserveState: true,
})
export default class UserModule extends VuexModule {
  user: User | null = null;

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  @Mutation
  setUser(user: User | null) {
    this.user = user;
  }

  @Action({ rawError: true })
  async whoami(): Promise<User> {
    if (!this?.user?.token) {
      throw new Error('not logged in');
    }
    const { user } = await ApiUser.whoami(this.user.token);
    if (isUser(user)) {
      this.setUser(user);
      return user;
    }
    throw new Error('error');
  }

  @Action({ rawError: true })
  async login(payload: ReqUserLogin): Promise<User> {
    const { user } = await ApiUser.login(payload);
    if (isUser(user)) {
      this.setUser(user);
      return user;
    }
    throw new Error('error');
  }

  @Action({ rawError: true })
  async signup(payload: ReqSignup): Promise<User> {
    const { user } = await ApiUser.signup(payload);
    if (isUser(user)) {
      return user;
    }
    throw new Error('error');
  }

  @Action({ rawError: true })
  async updateUser(payload: ReqUpdateUser): Promise<User> {
    const { user } = await ApiUser.updateUser(payload);
    if (isUser(user)) {
      return user;
    }
    throw new Error('error');
  }
}
