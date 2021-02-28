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
      return response.data;
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

    const errorMessage = '';

    switch (httpStatus) {
      case ErrorType.Unauthorized:
        userModule.setUser(null);
        notifyWarn('You are not logged in');
        redirect('/login');
        break;
      case ErrorType.Unprocessable:
        notifyErrors(errorMessage);
        break;
      case ErrorType.Forbidden:
        app?.router?.back();
        notifyErrors('Access to this resource is forbidden');
        break;
      case ErrorType.NotFound:
        notifyErrors('Requested resource was not found.');
        break;
      default:
        notifyErrors('Unknown error occurred, please try again later.');
        return Promise.reject(errorMessage);
    }
    // return Promise.resolve();
  });
  initializeAxios($axios);
};

export default accessor;
