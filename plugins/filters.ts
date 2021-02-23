import Vue from 'vue';

Vue.filter('capitalize', function (value: string) {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('timeFormat', function (date: string) {
  if (!date) return '';
  const newDate = new Date(date);
  return `${newDate.toISOString().slice(0, 10)} ${newDate.toLocaleTimeString('en')}`;
});
