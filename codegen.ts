import type { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";
dotenv.config();

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "https://graphql.datocms.com": {
        headers: { Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}` },
      },
    },
  ],
  documents: "graphql/queries/*.graphql",
  generates: {
    "graphql/generated/sdk.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
  },
};

export default config;
