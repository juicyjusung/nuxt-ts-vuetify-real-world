import { Action, Module, VuexModule } from 'vuex-module-decorators';
import { ApiProfile, UserName } from '~/api/profile';
import { isProfile, Profile } from '~/models/profile';

@Module({
  name: 'profileModule',
  namespaced: true,
  stateFactory: true,
})
export default class ProfileModule extends VuexModule {
  @Action({ rawError: true })
  async getProfile(username: UserName): Promise<Profile> {
    const { profile } = await ApiProfile.getProfile(username);
    if (isProfile(profile)) {
      return profile;
    }
    throw new Error('no profile');
  }

  @Action({ rawError: true })
  async followUser(username: UserName): Promise<Profile> {
    const { profile } = await ApiProfile.followUser(username);
    if (isProfile(profile)) {
      return profile;
    }
    throw new Error('no profile');
  }

  @Action({ rawError: true })
  async unfollowUser(username: UserName): Promise<Profile> {
    const { profile } = await ApiProfile.unFollowUser(username);
    if (isProfile(profile)) {
      return profile;
    }
    throw new Error('no profile');
  }
}
