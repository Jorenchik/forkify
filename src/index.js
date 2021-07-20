import "./scss/style.scss";

import { App } from "./js/controller";

App.showRecipe();

if (module.hot) {
  module.hot.accept("./js/controller", function () {
    console.log("Accepting the updated constroller module!");
    App.showRecipe();
  });
}
