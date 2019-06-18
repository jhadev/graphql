//user data
const users = [
  {
    id: '1',
    name: 'Josh',
    email: 'josh@josh.com'
  },
  {
    id: '2',
    name: 'Jack',
    email: 'jack@jack.com',
    age: 47
  },
  {
    id: '3',
    name: 'Jill',
    email: 'jill@jill.com',
    age: 23
  }
];

const posts = [
  {
    id: '3',
    title: 'GraphQL Tutorial',
    body: 'GraphQL is cool',
    published: false,
    author: '1'
  },
  {
    id: '6',
    title: 'React Hooks',
    body: 'React Hooks are super cool',
    published: true,
    author: '2'
  },
  {
    id: '7',
    title: 'GraphQL Mutations',
    body: 'Learn more about mutations...',
    published: true,
    author: '2'
  },
  {
    id: '10',
    title: 'Which front-end library should you learn?',
    body: 'React, Angular, Vue...',
    published: true,
    author: '3'
  }
];

const comments = [
  {
    id: '1',
    text: 'First comment...',
    author: '2',
    post: '3'
  },
  {
    id: '2',
    text: 'Second comment...',
    author: '1',
    post: '6'
  },
  {
    id: '3',
    text: 'Third comment...',
    author: '3',
    post: '6'
  },
  {
    id: '4',
    text: 'Another comment...',
    author: '1',
    post: '10'
  }
];

const db = {
  users,
  posts,
  comments
};

export { db as default };
