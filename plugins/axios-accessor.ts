import { Context, Plugin } from '@nuxt/types';

import { ErrorType } from '~/constants';
import { initializeAxios } from '~/utils/axios';
import { notifyErrors, notifyWarn } from '~/utils/notify';
import { userModule } from '~/utils/store-accessor';

const accessor: Plugin = ({ $axios, redirect, app }: Context) => {
  $axios.defaults.headers.get.Accepts = 'application/json';
  $axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  $axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      return Promise.reject(error);
    }
  );

  $axios.onError(error => {
    if (!error.response) {
      return;
    }
    const httpStatus = error.response.status;
    const errorMessage = Object.entries(error.response.data.errors).reduce((acc, cur) => {
      const parsed = (cur[1] as string[]).map(v => `${cur[0]} ${v}`).join('\n');
      acc.push(parsed);
      return acc;
    }, [] as string[]);
    const isUnknownError = errorMessage?.[0].startsWith('Unknown');

    switch (httpStatus) {
      case ErrorType.Unauthorized:
        userModule.setUser(null);
        redirect('/login');
        notifyWarn('You are not logged in');
        break;
      case ErrorType.Unprocessable:
        notifyErrors(errorMessage);
        break;
      case ErrorType.Forbidden:
        app?.router?.back();
        notifyErrors(
          errorMessage?.length > 0 && !isUnknownError
            ? errorMessage
            : ['Access to this resource is forbidden']
        );
        break;
      case ErrorType.NotFound:
        console.log('%c [JL] not found - ', 'font-size: 13px; color:  orange;');
        notifyErrors(
          errorMessage?.length > 0 && !isUnknownError
            ? errorMessage
            : ['Requested resource was not found.']
        );
        break;
      default:
        notifyErrors(
          errorMessage?.length > 0
            ? errorMessage
            : ['Unknown error occurred, please try again later.']
        );
        return Promise.reject(errorMessage);
    }
    return Promise.resolve();
  });
  initializeAxios($axios);
};

export default accessor;
