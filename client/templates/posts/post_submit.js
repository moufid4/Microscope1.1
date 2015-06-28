Template.postSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var post = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		};

		Meteor.call('postInsert', post, function(error, result) {
			// if error show the error and exit
			if (error) {
				return throwError(error.reason);
			};

			// if the url already exists
			if (result.postExists) {
				throwError('This link already exists');
			};

			Router.go('postPage', {_id: result._id});
		})
	}
});