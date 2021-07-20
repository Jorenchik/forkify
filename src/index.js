import './scss/style.scss';
import 'core-js';
import 'regenerator-runtime';

import { App } from './js/controller';

App.init();

if (module.hot) {
  module.hot.accept('./js/controller', function () {
    console.log('Accepting the updated constroller module!');
    // App.showRecipe();
  });
}
