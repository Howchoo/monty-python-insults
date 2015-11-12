define(["backbone", "underscore"], function(Backbone, _) {
  String.prototype.trunc = function(n){
     var isTooLong = this.length > n;
     var string = isTooLong ? this.substr(0,n) : this;
     string = isTooLong ? string.substr(0, string.lastIndexOf(' ')) : string;
     return  isTooLong ? string + '...' : string;
  };

  var insultGenerator = {};
  var settings = {
  };

  var mainView = Backbone.View.extend({
    currentInsult: "",
    currentShareGuid: "",
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
      var gotBeginning;
      var gotCommand;

      // 50% chance of getting a "beginning"
      if (this.getRandomInt(1) == 0) {
        insult += beginnings[this.getRandomInt(beginnings.length - 1)]; 
        insult += " you ";
        insult += nouns[this.getRandomInt(nouns.length - 1)];
        insult += "! ";
        gotBeginning = true;
      // 50% chance of getting a "command"
      } else {
        insult += commands[this.getRandomInt(commands.length - 1)]; 
        insult += ", you ";
        insult += nouns[this.getRandomInt(nouns.length - 1)];
        insult += "! ";
        gotCommand = true;
      }

      insult += actions[this.getRandomInt(actions.length - 1)];
      insult += ", ";

      // 50% chance of getting a separate noun and adjective
      if (this.getRandomInt(1) == 0) {
        insult += adjectives[this.getRandomInt(adjectives.length - 1)];
        insult += " ";
        insult += nouns[this.getRandomInt(nouns.length - 1)];
        insult += "!";
      // 50% chance of getting a predefined noun adjective combo
      } else {
        insult += noun_adjective_combos[this.getRandomInt(noun_adjective_combos.length - 1)];
        insult += "!";
      }

      // 50% chance of getting an "ending" if the insult isn't already too long-winded
      if (insult.length < 80 && this.getRandomInt(1) == 0) {
        insult += " ";
        insult += endings[this.getRandomInt(endings.length - 1)]; 
      }

      this.currentInsult = insult;
      var self = this;
      $.ajax({
        url: "/save-share-data", 
        type: "POST",
        data: {
          title: this.currentInsult
        }
      }).done(function(response){
        self.currentShareGuid = response.guid;
        self.renderInsult(insult);
      });
    },
    renderInsult: function(insult){
      this.$("#insult").show().find("> span").html(insult);
    },
    shareFacebook: function(){
       FB.ui({
         method: 'share',
         href: '/?share_guid=' + this.currentShareGuid,
         caption: this.currentInsult
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
