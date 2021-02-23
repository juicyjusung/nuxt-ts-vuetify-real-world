import Vue from 'vue';

export const notifyErrors = (errors: string[] | string): void => {
  Vue.notify({
    type: 'error',
    title: 'Error occurred',
    text: Array.isArray(errors) ? errors.join('<br />') : errors,
  });
};

export const notifySuccess = (message: string): void => {
  Vue.notify({
    type: 'success',
    text: message,
  });
};

export const notifyWarn = (message: string): void => {
  Vue.notify({
    type: 'warn',
    text: message,
  });
};
