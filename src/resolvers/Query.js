const Query = {
  users(parent, args, { prisma }, info) {
    const operationArgs = {};

    // found in prisma generated schema - name_contains || email_contains for filtering
    if (args.query) {
      operationArgs.where = {
        OR: [
          {
            name_contains: args.query
          },
          {
            email_contains: args.query
          }
        ]
      };
    }

    // 2nd arg takes nothing, string, or object. if a falsy value is provided prisma falls back and returns only scalar types for that set but no relational data.

    // info object used instead of string because returned selection might change based on user input
    return prisma.query.users(operationArgs, info);
  },
  posts(parent, args, { prisma }, info) {
    const operationArgs = {};

    if (args.query) {
      operationArgs.where = {
        OR: [
          {
            title_contains: args.query
          },
          {
            body_contains: args.query
          }
        ]
      };
    }

    return prisma.query.posts(operationArgs, info);
  },
  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info);
  }
};

export { Query as default };
