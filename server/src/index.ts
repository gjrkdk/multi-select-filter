import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs, resolvers } from "./graphql";

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, {
    listen: { port }
  });
  console.log(`Server ready at: ${url}graphql`);
}

startApolloServer();
