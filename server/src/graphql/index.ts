import { readFileSync } from "fs";
import { resolve } from "path";
import { gql } from "graphql-tag";
import { itemResolvers } from "./resolvers/resolvers";

const typeDefs = gql(
  readFileSync(resolve(__dirname, "schema/schema.graphql"), {
    encoding: "utf-8"
  })
);

const resolvers = {
  Query: {
    ...itemResolvers.Query
  }
};

export { typeDefs, resolvers };
