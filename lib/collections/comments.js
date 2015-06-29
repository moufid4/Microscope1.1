Comments = new Mongo.Collection('comments');

Meteor.methods({
	commentInsert: function(commentAttributes) {
		check(this.userId, String);
		check(commentAttributes, {
			postId: String,
			body: String
		});

		var user = Meteor.user();
		var post = Posts.findOne(commentAttributes.postId);
		if (!post) {
			throw new Meteor.Error('invalid-comment', 'You must comment on the post');
		};
		comment = _.extend(commentAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		//update comments count
		Posts.update(comment.postId, {$inc: {commentsCount: 1}});

		// create the comment 
		return Comments.insert(comment);

		// create a notification
		createCommentNotification(comment);
		return comment._id;
	}
});