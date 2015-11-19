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
    "noun_adjective_combos", "commands", "lib", "ads"], function(Backbone, Router) {
  new Router();
  Backbone.history.start();

  console.log(userIsFromReddit);
  if (!userIsFromReddit) {
    Ads.init();
  } else {
    var leaderboard = document.getElementsByClassName('leaderboard')[0];
    leaderboard.style.display = 'none';
  }
});
