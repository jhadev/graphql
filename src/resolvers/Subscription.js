const Subscription = {
  comment: {
    subscribe(parent, { postId }, { prisma }, info) {
      // subscription flow Prisma > Node > Client (GraphQL Playground)
      return prisma.subscription.comment(
        {
          where: {
            node: {
              post: {
                id: postId
              }
            }
          }
        },
        info
      );
    }
  },
  post: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.post(
        {
          where: {
            node: {
              published: true
            }
          }
        },
        info
      );
    }
  }
};

export { Subscription as default };
