define(["backbone", "underscore"], function(Backbone, _) {
  var insultGenerator = {};
  var settings = {
    base_url: window.base_url,
    og_image_url: window.og_image_url
  };

  var mainView = Backbone.View.extend({
    currentInsult: "",
    currentShareGuid: "",
    numInsultsGenerated: 0,
    el: ".container",
    events: {
      "click #insult-me": "generateResult",
      "click .button-facebook": "shareFacebook",
      "click .button-twitter": "shareTwitter"
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
      var gotCommand;

      this.numInsultsGenerated++;

      // interesting little button updates 
      if (this.numInsultsGenerated == 1){
        $("#insult-me").html("More Insults Please");
      } else if (this.numInsultsGenerated == 15){
        $("#insult-me").html("Pull the other one");
      } else if (this.numInsultsGenerated == 25){
        $("#insult-me").html("Keep them coming");
      } else if (this.numInsultsGenerated == 50){
        $("#insult-me").html("Ok that's quite enough");
      } else if (this.numInsultsGenerated == 100){
        $("#insult-me").html("More Insults Please");
      }

      // 25% chance of getting a command
      if (this.getRandomInt(3) == 0) {
        insult += commands[this.getRandomInt(commands.length - 1)]; 
        gotCommand = true;
      // 75% chance of getting an "action" if a command wasn't chosen
      } else {
        insult += actions[this.getRandomInt(actions.length - 1)];
      }

      insult += ", you ";

      // 66% chance of getting a separate noun and adjective
      if (this.getRandomInt(2) != 0) {
        insult += adjectives[this.getRandomInt(adjectives.length - 1)];
        insult += " ";
        insult += nouns[this.getRandomInt(nouns.length - 1)];
        insult += "!";
      // 33% chance of getting a predefined noun adjective combo
      } else {
        insult += noun_adjective_combos[this.getRandomInt(noun_adjective_combos.length - 1)];
        insult += "!";
      }

      // 50% chance of getting an ending if the insult isn't already too long-winded
      if (insult.length < 80 && this.getRandomInt(1) == 0) {
        insult += " ";
        insult += endings[this.getRandomInt(endings.length - 1)]; 
      }

      // save share data and get back guid to use for share urls
      this.currentInsult = insult;
      var self = this;
      $.ajax({
        url: settings.base_url + "save-share-data", 
        type: "POST",
        data: {
          title: this.currentInsult
        }
      }).done(function(response){
        self.currentShareGuid = response.guid;
        self.renderInsult(insult);
      });


      /*
      var canvas = document.getElementById('canvas');
      canvas.width = 580;
      canvas.height = 200;
      context = canvas.getContext("2d");
      context.lineWidth = 2;
      context.strokeStyle = "#ff0000";

      var options = {
        font: "42px Arial, sans-serif",
      }

      CanvasTextWrapper(canvas, insult, options);
      */
    },

    renderInsult: function(insult){
      this.$("#insult").show().find("> span").html(insult);
    },

    shareFacebook: function(){
      FB.ui({
        method: 'share',
        name: 'Monty Python Insult Generator Share',
        href: settings.base_url,
        description: this.currentInsult,
        picture: settings.og_image_url,
        caption: "Click to get your own insult"
      }, function(response){});
    },

    shareTwitter: function(){
      var width = 575;
      var height = 400;
      var left = ($(window).width()  - width)  / 2;
      var top = ($(window).height() - height) / 2;
      var opts = 'status=1' +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left;

      var endOfTweet = encodeURIComponent(" #montypythoninsults http://montypythoninsults.com");
      var tweet = "https://twitter.com/intent/tweet?text=" + this.currentInsult.trunc(160 - endOfTweet.length - 3, true);
      window.open(tweet + endOfTweet, 'twitter', opts);
    }
  });

  insultGenerator.mainView = new mainView();
  return insultGenerator;
});
