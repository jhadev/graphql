import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://192.168.99.100:4466/'
});

// prisma.query prisma.mutation prisma.subscription prisma.exists == prisma objects with methods from the schema attached to them

// all prisma methods take 2 args, operation args and selection set -- returns a promise

// exists can get as complex as you want in terms of fields

const doesCommentExist = async commentId => {
  const comment = await prisma.exists.Comment({
    id: commentId
  });

  return comment;
};

// doesCommentExist('cjx1e410d002g0748qdvmrz22').then(exists =>
//   console.log(exists)
// );

const createNewPostForUser = async (authorId, data) => {
  const doesUserExist = await prisma.exists.User({
    id: authorId
  });

  if (!doesUserExist) {
    throw new Error('User not found');
  }

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
    '{ id title body published author { id name email posts { id title published } } }'
  );

  return newPost.author;
};

// createNewPostForUser('cjx1d1q39000t07488xq7hgtu', {
//   title: 'Angular 8 released',
//   body: 'New changes in Angular 8...',
//   published: true
// })
//   .then(user => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch(err => console.log(err));

const updatePostForUser = async (postId, data) => {
  const doesPostExist = await prisma.exists.Post({
    id: postId
  });

  if (!doesPostExist) {
    throw new Error('Post not found');
  }

  const updatedPost = await prisma.mutation.updatePost(
    {
      where: {
        id: postId
      },
      data
    },
    '{ author { id name email posts { id title published } } }'
  );

  return updatedPost.author;
};

// updatePostForUser('cjx2l7odp00210748prdmdi0c', {
//   title: 'Machine Learning with Python',
//   body: 'Machine Learning is exciting...',
//   published: true
// })
//   .then(user => console.log(JSON.stringify(user, undefined, 2)))
//   .catch(err => console.log(err));
