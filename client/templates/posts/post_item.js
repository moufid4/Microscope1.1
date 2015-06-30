Template.postItem.helpers({
	ownPost: function() {
		return this.userId === Meteor.userId();
	},
	domain: function() {
		var a = document.createElement('a');
		a.href = this.url;
		return a.hostname;
	}, 
	upvotedClass: function() {
		var userId = Meteor.userId();
		if (userId && !_.include(this.upvoters, userId)) {
			return 'btn-primary upvotable';
		} else {
			return 'disabled';
		}
	}
});

Template.postItem.rendered = function(){
  var instance = this;
  var rank = instance.data._rank;
  var $this = $(this.firstNode);
  var postHeight = 80;
  var newPosition = rank * postHeight;
  if (typeof(instance.currentPosition) !== 'undefined') {
    var previousPosition = instance.currentPosition;
    var delta = previousPosition - newPosition;
    $this.css("top", delta + "px");
    
  }
  Meteor.defer(function() {
    instance.currentPosition = newPosition;
    $this.css("top",  "0px");
  }); 
};

Template.postItem.events({
	'click .upvotable': function(e) {
		e.preventDefault();
		Meteor.call('upvote', this._id);
	}
});