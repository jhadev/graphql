import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';
import Subscription from './resolvers/Subscription';
import './prisma';

/* 
types:
String, Boolean, Int, Float, ID (unique to graphQL)
5 Scalar types of GraphQL
*/

// resolvers aka functions for queries
// parent: relational data, args: info passed through in query, ctx: context, info: info about operations
// use ctx to refer to db object imported from db.js so we can break the methods out and share CRUD methods in resolvers.

// PubSub is the subscription constructor built into graphql yoga.
// Allows realtime communication with client and server with web sockets

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment
  },
  context: {
    db,
    pubsub
  }
});

server.start(() =>
  console.log('The server is running on http://localhost:4000/')
);
