require.config({
  paths: {
    "jquery": "lib/jquery.min",
    "underscore": "lib/underscore-min",
    "backbone": "lib/backbone"
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
    "noun_adjective_combos", "commands", "lib"], function(Backbone, Router) {
  new Router();
  Backbone.history.start();
});
