import './scss/style.scss';
import 'core-js';
import 'regenerator-runtime';

import { Controller } from './js/controller';

Controller.init();

if (module.hot) {
  module.hot.accept('./js/controller', function () {
    Controller.init();
  });
  module.hot.accept('./js/model', function () {
    Controller.init();
  });
  module.hot.accept('./js/views/recipeView', function () {
    Controller.init();
  });
  module.hot.accept('./js/views/searchView', function () {
    Controller.init();
  });
  module.hot.accept('./js/views/resultsView', function () {
    Controller.init();
  });
  module.hot.accept('./js/views/View', function () {
    Controller.init();
  });
}
