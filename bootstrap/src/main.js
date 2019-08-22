import Vue from 'vue';
import App from './App.vue';
// You can change this import to `import router from './starterRouter'` to quickly start development from a blank layout.
import router from './router';
import NowUiKit from './plugins/now-ui-kit';

import VueI18n from 'vue-i18n';

const data = require('./message.json');

import smoothScroll from 'vue-smoothscroll'
Vue.use(smoothScroll)

Vue.config.productionTip = false;

Vue.use(NowUiKit);

// 言語の設定
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'ja', // デフォルト言語はjaにしておくが、ブラウザの言語を拾ってきてここに入れる => 言語変更されたら書き換える
  messages: data
});

new Vue({
  router,
  render: h => h(App),
  i18n: i18n
}).$mount('#app');


