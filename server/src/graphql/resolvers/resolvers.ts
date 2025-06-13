import { data as itemList } from "../../data/items.json";
import { Resolvers } from "../../generated/types";

export const itemResolvers: Resolvers = {
  Query: {
    items: () => itemList
  }
};
