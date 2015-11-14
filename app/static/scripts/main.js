require.config({
  paths: {
    "jquery": "lib/jquery.min",
    "underscore": "lib/underscore-min",
    "backbone": "lib/backbone",
    "canvas-text-wrapper": "lib/canvas-text-wrapper.min"
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
    "noun_adjective_combos", "commands", "lib", "canvas-text-wrapper"], function(Backbone, Router) {
  new Router();
  Backbone.history.start();
});
