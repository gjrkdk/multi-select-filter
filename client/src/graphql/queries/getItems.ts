import { gql } from "../../generated";

export const GET_ITEMS = gql(`
  query GetItems {
    items
  }
`);
