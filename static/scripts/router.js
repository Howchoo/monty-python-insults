define(["backbone", "insult-generator"], function(Backbone, insultGenerator) {
  return Backbone.Router.extend({
    routes : {
      "" : "index"
    },
    index : function() {
      insultGenerator.mainView.render();
    }
  });
});
