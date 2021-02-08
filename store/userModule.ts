import { Action, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators';
import { User, UserModel } from '~/models/user/user';
import { ResponseType, Todo } from '~/types';
import { $axios } from '~/utils/axios';

export type ReqUserLogin = Pick<User, 'email'> & { password: string };
export type ReqSignup = Pick<User, 'email' | 'username'> & { password: string };
type UserResponse = ResponseType<'user', User>;

@Module({
  name: 'userModule',
  namespaced: true,
  stateFactory: true,
  preserveState: true,
})
export default class UserModule extends VuexModule {
  user: UserModel | null = null;

  @Mutation
  setUser(user: UserModel | null) {
    this.user = user;
  }

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  @Action({ rawError: true })
  async signup(payload: ReqSignup): Promise<User | boolean> {
    try {
      const res = await $axios.post('/users', { user: payload });
      const user = res?.data?.user as User;
      if (user) {
        return user;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}
