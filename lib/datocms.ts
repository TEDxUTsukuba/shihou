import { GraphQLClient } from "graphql-request";
import { getSdk } from "@/graphql/generated/sdk";

const headers = {
  authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
};
/*
  if (includeDrafts) {
    headers['X-Include-Drafts'] = 'true';
  }
  if (excludeInvalid) {
    headers['X-Exclude-Invalid'] = 'true';
  }
  */

const client = new GraphQLClient("https://graphql.datocms.com", { headers });
export const sdk = getSdk(client);
