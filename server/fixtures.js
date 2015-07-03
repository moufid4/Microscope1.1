if (Posts.find().count() === 0) {
  var now = new Date().getTime();

  var mouId = Meteor.users.insert({
    profile: { name: 'Mou' }
  });
  var mou = Meteor.users.findOne(mouId);
  var moufidId = Meteor.users.insert({
    profile: { name: 'Moufid' }
  });
  var moufid = Meteor.users.findOne(moufidId);

  var googleId = Posts.insert({
    title: 'Google',
    userId: moufid._id,
    author: moufid.profile.name,
    url: 'http://www.google.com/',
    submitted: new Date(now - 7 * 3600 * 1000),
    commentsCount: 2,
    upvoters: [],
    votes: 0
  });

  Comments.insert({
    postId: googleId,
    userId: mou._id,
    author: mou.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: "Good!"
  });

  Comments.insert({
    postId: googleId,
    userId: moufid._id,
    author: moufid.profile.name,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: 'Excellent!'
  });

  Posts.insert({
    title: 'Meteor',
    userId: mou._id,
    author: mou.profile.name,
    url: 'http://meteor.com',
    submitted: new Date(now - 10 * 3600 * 1000),
    commentsCount: 0,
    upvoters: [],
    votes: 0
  });

  Posts.insert({
    title: 'The Meteor Book',
    userId: mou._id,
    author: mou.profile.name,
    url: 'http://themeteorbook.com',
    submitted: new Date(now - 12 * 3600 * 1000),
    commentsCount: 0,
    upvoters: [],
    votes: 0
  });

  for (var i = 0; i < 10; i++) {
    Posts.insert({
      title: 'Test post #' + i,
      author: moufid.profile.name,
      userId: moufid._id,
      url: 'http://google.com/?q=test-' + i,
      submitted: new Date(now - i * 3600 * 1000 + 1),
      commentsCount: 0,
      upvoters: [],
      votes: 0
    });
  }
}