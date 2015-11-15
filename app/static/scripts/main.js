require.config({
  paths: {
    "jquery": "jquery.min",
    "underscore": "../bower_components/underscore/underscore-min",
    "backbone": "../bower_components/backbone/backbone",
  },
  "shim" : {
    "backbone" : {
      "deps" : [
        "jquery",
        "underscore"
      ],
      "exports" : "Backbone"
    },
    "jquery" : {
      "exports" : "$"
    },
    "underscore" : {
      "exports" : "_"
    }
  }
});
require(["backbone", "router", "endings", "actions", "nouns", "adjectives",
    "noun_adjective_combos", "commands", "lib", "ads"], function(Backbone, Router) {
  new Router();
  Backbone.history.start();

  Ads.init();
});
