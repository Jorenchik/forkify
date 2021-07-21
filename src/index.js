import './scss/style.scss';
import 'core-js';
import 'regenerator-runtime';

import { App } from './js/controller';

App.init();

if (module.hot) {
  module.hot.accept('./js/controller', function () {
    App.init();
  });
  module.hot.accept('./js/model', function () {
    App.init();
  });
  module.hot.accept('./js/views/recipeView', function () {
    App.init();
  });
  module.hot.accept('./js/views/searchView', function () {
    App.init();
  });
  module.hot.accept('./js/views/resultsView', function () {
    App.init();
  });
  module.hot.accept('./js/views/View', function () {
    App.init();
  });
}
