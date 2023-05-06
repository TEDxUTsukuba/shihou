import { GraphQLClient } from "graphql-request";
import { getSdk } from "@/graphql/generated/sdk";


let token = process.env.DATOCMS_API_TOKEN
if(process.env.NODE_ENV === 'development'){
  token = process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN
}
const headers = {
  authorization: `Bearer ${token}`,
};
/*
  if (includeDrafts) {
    headers['X-Include-Drafts'] = 'true';
  }
  if (excludeInvalid) {
    headers['X-Exclude-Invalid'] = 'true';
  }
  */

const client = new GraphQLClient('https://graphql.datocms.com', { headers });
export const sdk = getSdk(client);
