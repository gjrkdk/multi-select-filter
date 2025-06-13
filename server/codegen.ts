import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/graphql/schema/schema.graphql",
  generates: {
    "./src/generated/types.ts": {
      plugins: ["typescript", "typescript-resolvers"]
    }
  },
  overwrite: true
};

export default config;
