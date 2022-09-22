import { gql } from "@apollo/client";

export type GetRepositoriesQueryResponse = {
  user: {
    repositories: {
      nodes: {
        id: string;
        name: string;
        description: string;
        url: string;
        forkCount: number;
        stargazerCount: number;
        languages: {
          totalSize: number;
          totalCount: number;
          edges: {
            node: {
              id: string;
              name: string;
              color: string;
            };
            size: number;
          }[];
        };
      }[];
    };
  };
};

export const getRepositoriesQuery = gql`
  query getRepositories(
    $user: String!
    $repositoriesFirst: Int
    $languagesFirst: Int
  ) {
    user(login: $user) {
      repositories(
        first: $repositoriesFirst
        orderBy: { field: PUSHED_AT, direction: DESC }
        ownerAffiliations: [OWNER]
      ) {
        nodes {
          id
          name
          description
          url
          forkCount
          stargazerCount
          languages(first: $languagesFirst) {
            totalSize
            totalCount
            edges {
              cursor
              node {
                id
                name
                color
              }
              size
            }
          }
        }
      }
    }
  }
`;
