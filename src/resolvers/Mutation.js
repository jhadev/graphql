import uuidv4 from 'uuid/v4';

const Mutation = {
  createUser(parent, args, { db }, info) {
    //using input types the args are now stored in an object called data
    const emailTaken = db.users.some(user => user.email === args.data.email);

    if (emailTaken) {
      throw new Error('Email already registered');
    }
    //use object rest spread to copy properties from args
    const user = {
      id: uuidv4(),
      ...args.data
    };

    db.users.push(user);

    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex(user => user.id === args.id);

    if (userIndex === -1) {
      throw new Error('User does not exist');
    }

    const [deletedUser] = db.users.splice(userIndex, 1);

    db.posts = db.posts.filter(post => {
      const match = post.author === args.id;

      if (match) {
        db.comments = db.comments.filter(comment => comment.post !== post.id);
      }
      return !match;
    });

    db.comments = db.comments.filter(comment => comment.author !== args.id);

    return deletedUser;
  },
  updateUser(parent, args, { db }, info) {
    const { id, data } = args;
    const userToUpdate = db.users.find(user => user.id === id);

    if (!userToUpdate) {
      throw new Error('User not found');
    }

    if (typeof data.email === 'string') {
      const emailTaken = db.users.some(user => user.email === data.email);

      if (emailTaken) {
        throw new Error('Email already in use');
      }

      userToUpdate.email = data.email;
    }

    if (typeof data.name === 'string') {
      userToUpdate.name = data.name;
    }

    if (typeof data.age !== undefined) {
      userToUpdate.age = data.age;
    }

    return userToUpdate;
  },
  createPost(parent, args, { db, pubsub }, info) {
    const { data } = args;
    const userExists = db.users.some(user => user.id === data.author);

    if (!userExists) {
      throw new Error('User not found');
    }
    //use object rest spread to copy properties from args
    const post = {
      id: uuidv4(),
      ...data
    };

    db.posts.push(post);
    if (data.published) {
      //
      pubsub.publish('post', {
        post: {
          mutation: 'CREATED',
          data: post
        }
      });
    }
    return post;
  },
  deletePost(parent, args, { db, pubsub }, info) {
    const postIndex = db.posts.findIndex(post => post.id === args.id);

    if (postIndex === -1) {
      throw new Error('Post does not exist');
    }

    const [postToDelete] = db.posts.splice(postIndex, 1);

    db.comments = db.comments.filter(comment => comment.post !== args.id);

    if (postToDelete.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'DELETED',
          data: postToDelete
        }
      });
    }

    return postToDelete;
  },
  updatePost(parent, args, { db, pubsub }, info) {
    const { id, data } = args;
    const postToUpdate = db.posts.find(post => post.id === id);

    const originalPost = { ...postToUpdate };

    if (!postToUpdate) {
      throw new Error('Post does not exist');
    }

    if (typeof data.title === 'string') {
      postToUpdate.title = data.title;
    }

    if (typeof data.body === 'string') {
      postToUpdate.body = data.body;
    }

    if (typeof data.published === 'boolean') {
      postToUpdate.published = data.published;

      // if original post before update was published and the new update changes it to unpublished it should not be seen in the subscription
      if (originalPost.published && !postToUpdate.published) {
        // delete event send back original data
        pubsub.publish('post', {
          post: {
            mutation: 'DELETED',
            data: originalPost
          }
        });
      } else if (!originalPost.published && postToUpdate.published) {
        // if original post was unpublished and the update sets it to published it needs to be seen in the subscription
        // create event
        pubsub.publish('post', {
          post: {
            mutation: 'CREATED',
            data: postToUpdate
          }
        });
      } else if (postToUpdate.published) {
        // updated event
        pubsub.publish('post', {
          post: {
            mutation: 'UPDATED',
            data: postToUpdate
          }
        });
      }
    }

    return postToUpdate;
  },
  createComment(parent, args, { db, pubsub }, info) {
    const userExists = db.users.some(user => user.id === args.data.author);

    if (!userExists) {
      throw new Error('User not found');
    }

    const postExists = db.posts.some(
      post => post.id === args.data.post && post.published
    );

    if (!postExists) {
      throw new Error('Post not found or post not published');
    }
    //use object rest spread to copy properties from args
    const comment = {
      id: uuidv4(),
      ...args.data
    };

    db.comments.push(comment);
    // channel name and new data
    pubsub.publish(`comment ${args.data.post}`, {
      comment: {
        mutation: 'CREATED',
        data: comment
      }
    });

    return comment;
  },
  deleteComment(parent, args, { db, pubsub }, info) {
    const commentIndex = db.comments.findIndex(
      comment => comment.id === args.id
    );

    if (commentIndex === -1) {
      throw new Error('Comment does not exist');
    }

    const [deletedComment] = db.comments.splice(commentIndex, 1);

    pubsub.publish(`comment ${deletedComment.post}`, {
      comment: {
        mutation: 'DELETED',
        data: deletedComment
      }
    });

    return deletedComment;
  },
  updateComment(parent, args, { db, pubsub }, info) {
    const { id, data } = args;
    const commentToUpdate = db.comments.find(comment => comment.id === id);

    if (!commentToUpdate) {
      throw new Error('Comment not found');
    }

    if (typeof data.text === 'string') {
      commentToUpdate.text = data.text;
    }

    pubsub.publish(`comment ${commentToUpdate.post}`, {
      comment: {
        mutation: 'UPDATED',
        data: commentToUpdate
      }
    });

    return commentToUpdate;
  }
};

export { Mutation as default };
