const Subscription = {
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      // check if post exists
      const post = db.posts.find(post => post.id === postId && post.published);

      if (!post) {
        throw new Error('Post not found');
      }
      // pick a pattern and stick with it for channel names
      return pubsub.asyncIterator(`comment ${postId}`);
    }
  },
  post: {
    subscribe(parent, args, { db, pubsub }, info) {
      return pubsub.asyncIterator('post');
    }
  }
};

export { Subscription as default };
