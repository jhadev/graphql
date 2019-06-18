const Query = {
  me() {
    return {
      id: uuidv4(),
      name: 'Josh',
      email: 'josh@josh.com',
      age: 30
    };
  },
  getPost() {
    return {
      id: uuidv4(),
      title: 'This is the title',
      body: 'This is the body',
      published: false
    };
  },
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }
    //query names that have matching letters in the query
    return db.users.filter(user =>
      user.name.toLowerCase().includes(args.query.toLowerCase())
    );
  },
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }
    return db.posts.filter(post => {
      const isTitleMatch = post.title
        .toLowerCase()
        .includes(args.query.toLowerCase());
      const isBodyMatch = post.body
        .toLowerCase()
        .includes(args.query.toLowerCase());
      return isTitleMatch || isBodyMatch;
    });
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  }
};

export { Query as default };
