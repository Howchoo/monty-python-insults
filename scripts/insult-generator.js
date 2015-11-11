define(["backbone", "underscore"], function(Backbone, _) {
  var insultGenerator = {};
  var settings = {
  };

  var mainView = Backbone.View.extend({
    el: ".container",
    events: {
      "click #insult-me": "generateResult"
    },
    initialize: function() {
      this.template = _.template($("#mainTemplate").html());
    },
    render: function() {
      this.$el.append(this.template);
      return this;
    },
    getRandomInt: function(max) {
      return Math.floor(Math.random() * (max + 1));
    },
    generateResult: function(){
      var insult = "";

      if (this.getRandomInt(1) == 0) {
        insult += beginnings[this.getRandomInt(beginnings.length - 1)]; 
        insult += " you ";
        insult += nouns[this.getRandomInt(nouns.length - 1)];
        insult += "! ";
      }
      insult += actions[this.getRandomInt(actions.length - 1)];
      insult += ", you ";
      insult += adjectives[this.getRandomInt(adjectives.length - 1)];
      insult += " ";
      insult += nouns[this.getRandomInt(nouns.length - 1)];
      insult += "!";

      this.renderInsult(insult);
    },
    renderInsult: function(insult){
      this.$("#insult").html(insult);
    }
  });

  insultGenerator.mainView = new mainView();
  return insultGenerator;
});
