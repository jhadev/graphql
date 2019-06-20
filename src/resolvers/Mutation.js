import uuidv4 from 'uuid/v4';

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const isEmailTaken = await prisma.exists.User({ email: args.data.email });

    if (isEmailTaken) {
      throw new Error('Email already in use');
    }

    const newUser = await prisma.mutation.createUser(
      {
        data: args.data
      },
      info
    );

    return newUser;
  },
  async deleteUser(parent, args, { prisma }, info) {
    const doesUserExist = await prisma.exists.User({ id: args.id });

    if (!doesUserExist) {
      throw new Error('User not found');
    }

    const deletedUser = await prisma.mutation.deleteUser(
      {
        where: {
          id: args.id
        }
      },
      info
    );

    return deletedUser;
  },
  async updateUser(parent, args, { prisma }, info) {
    // letting prisma validate instead of checking if post exists first

    const updatedUser = await prisma.mutation.updateUser(
      {
        where: {
          id: args.id
        },
        data: args.data
      },
      info
    );

    return updatedUser;
  },
  async createPost(parent, args, { prisma }, info) {
    const createdPost = await prisma.mutation.createPost(
      {
        data: {
          title: args.data.title,
          body: args.data.body,
          published: args.data.published,
          author: {
            connect: {
              id: args.data.author
            }
          }
        }
      },
      info
    );

    return createdPost;
  },
  deletePost(parent, args, { prisma }, info) {
    // const postIndex = db.posts.findIndex(post => post.id === args.id);
    // if (postIndex === -1) {
    //   throw new Error('Post does not exist');
    // }
    // const [postToDelete] = db.posts.splice(postIndex, 1);
    // db.comments = db.comments.filter(comment => comment.post !== args.id);
    // if (postToDelete.published) {
    //   pubsub.publish('post', {
    //     post: {
    //       mutation: 'DELETED',
    //       data: postToDelete
    //     }
    //   });
    // }
    // return postToDelete;
  },
  updatePost(parent, args, { prisma }, info) {
    // const { id, data } = args;
    // const postToUpdate = db.posts.find(post => post.id === id);
    // const originalPost = { ...postToUpdate };
    // if (!postToUpdate) {
    //   throw new Error('Post does not exist');
    // }
    // if (typeof data.title === 'string') {
    //   postToUpdate.title = data.title;
    // }
    // if (typeof data.body === 'string') {
    //   postToUpdate.body = data.body;
    // }
    // if (typeof data.published === 'boolean') {
    //   postToUpdate.published = data.published;
    //   // if original post before update was published and the new update changes it to unpublished it should not be seen in the subscription
    //   if (originalPost.published && !postToUpdate.published) {
    //     // delete event send back original data
    //     pubsub.publish('post', {
    //       post: {
    //         mutation: 'DELETED',
    //         data: originalPost
    //       }
    //     });
    //   } else if (!originalPost.published && postToUpdate.published) {
    //     // if original post was unpublished and the update sets it to published it needs to be seen in the subscription
    //     // create event
    //     pubsub.publish('post', {
    //       post: {
    //         mutation: 'CREATED',
    //         data: postToUpdate
    //       }
    //     });
    //   } else if (postToUpdate.published) {
    //     // updated event
    //     pubsub.publish('post', {
    //       post: {
    //         mutation: 'UPDATED',
    //         data: postToUpdate
    //       }
    //     });
    //   }
    // }
    // return postToUpdate;
  },
  createComment(parent, args, { prisma }, info) {
    // const userExists = db.users.some(user => user.id === args.data.author);
    // if (!userExists) {
    //   throw new Error('User not found');
    // }
    // const postExists = db.posts.some(
    //   post => post.id === args.data.post && post.published
    // );
    // if (!postExists) {
    //   throw new Error('Post not found or post not published');
    // }
    // //use object rest spread to copy properties from args
    // const comment = {
    //   id: uuidv4(),
    //   ...args.data
    // };
    // db.comments.push(comment);
    // // channel name and new data
    // pubsub.publish(`comment ${args.data.post}`, {
    //   comment: {
    //     mutation: 'CREATED',
    //     data: comment
    //   }
    // });
    // return comment;
  },
  deleteComment(parent, args, { prisma }, info) {
    // const commentIndex = db.comments.findIndex(
    //   comment => comment.id === args.id
    // );
    // if (commentIndex === -1) {
    //   throw new Error('Comment does not exist');
    // }
    // const [deletedComment] = db.comments.splice(commentIndex, 1);
    // pubsub.publish(`comment ${deletedComment.post}`, {
    //   comment: {
    //     mutation: 'DELETED',
    //     data: deletedComment
    //   }
    // });
    // return deletedComment;
  },
  updateComment(parent, args, { prisma }, info) {
    // const { id, data } = args;
    // const commentToUpdate = db.comments.find(comment => comment.id === id);
    // if (!commentToUpdate) {
    //   throw new Error('Comment not found');
    // }
    // if (typeof data.text === 'string') {
    //   commentToUpdate.text = data.text;
    // }
    // pubsub.publish(`comment ${commentToUpdate.post}`, {
    //   comment: {
    //     mutation: 'UPDATED',
    //     data: commentToUpdate
    //   }
    // });
    // return commentToUpdate;
  }
};

export { Mutation as default };
