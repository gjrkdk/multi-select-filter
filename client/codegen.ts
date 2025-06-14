import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: ["src/**/*.ts"],
  generates: {
    "./src/graphql/generated/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql"
      }
    }
  }
};

export default config;
