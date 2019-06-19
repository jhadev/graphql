import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://192.168.99.100:4466/'
});

// prisma.query prisma.mutation prisma.subscription prisma.exists == prisma objects with methods from the schema attached to them

// all prisma methods take 2 args, operation args and selection set -- returns a promise

const createNewPostForUser = async (authorId, data) => {
  const newPost = await prisma.mutation.createPost(
    {
      data: {
        ...data,
        author: {
          connect: {
            id: authorId
          }
        }
      }
    },
    '{ id title body published }'
  );

  const user = await prisma.query.user(
    {
      where: {
        id: authorId
      }
    },
    '{ id name email posts { id title published } }'
  );

  return user;
};

// createNewPostForUser('cjx1d1q39000t07488xq7hgtu', {
//   title: 'Get started with Golang',
//   body: 'Go is a programming language...',
//   published: true
// }).then(user => {
//   console.log(JSON.stringify(user, undefined, 2));
// });

const updatePostForUser = async (postId, data) => {
  const updatedPost = await prisma.mutation.updatePost(
    {
      where: {
        id: postId
      },
      data
    },
    '{ author { id } }'
  );

  const user = await prisma.query.user(
    {
      where: {
        id: updatedPost.author.id
      }
    },
    '{ id name email posts { id title published } }'
  );

  return user;
};

// updatePostForUser('cjx2l7odp00210748prdmdi0c', {
//   title: 'Machine Learning with Python',
//   body: 'Machine Learning is exciting...',
//   published: false
// }).then(user => console.log(JSON.stringify(user, undefined, 2)));
