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
    return prisma.mutation.deletePost(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  updatePost(parent, args, { prisma }, info) {
    return prisma.mutation.updatePost(
      {
        where: {
          id: args.id
        },
        data: args.data
      },
      info
    );
  },
  createComment(parent, args, { prisma }, info) {
    return prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: args.data.author
            }
          },
          post: {
            connect: {
              id: args.data.post
            }
          }
        }
      },
      info
    );
  },
  deleteComment(parent, args, { prisma }, info) {
    return prisma.mutation.deleteComment(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  updateComment(parent, args, { prisma }, info) {
    return prisma.mutation.updateComment(
      {
        where: {
          id: args.id
        },
        data: args.data
      },
      info
    );
  }
};

export { Mutation as default };
