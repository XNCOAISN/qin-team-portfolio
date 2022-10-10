import { client } from "./client";
import {
  getRepositoriesQuery,
  GetRepositoriesQueryResponse,
} from "./queries/getRepositories.graphql";

export const fetchRepositories = async (user: string) => {
  const result = await client.query<GetRepositoriesQueryResponse>({
    query: getRepositoriesQuery,
    variables: {
      user,
      repositoriesFirst: 10,
      languagesFirst: 5,
    },
  });
  return result.data;
};
