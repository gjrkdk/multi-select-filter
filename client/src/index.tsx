import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { SelectionProvider } from "./features/selection/SelectionProvider.tsx";
import "./index.css";
import { App } from "./App.tsx";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <SelectionProvider>
        <App />
      </SelectionProvider>
    </ApolloProvider>
  </StrictMode>
);
