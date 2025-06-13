import { data as itemList } from "../../data/items.json";

export const itemResolvers = {
  Query: {
    items: () => itemList
  }
};
