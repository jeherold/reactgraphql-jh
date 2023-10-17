type GraphQLQuery = {
  query: string | null;
};

/** GraphQL query as a function that can take args to use in string setup */
const githubQueryAsFuncWithArgs = (
  pageCount: number | null,
  queryString: string | null,
  paginationKeyWord: string | null,
  paginationString: string | null
): GraphQLQuery => {
  return {
    query: `
    {
      viewer {
        name
      }
      search(query: "${queryString} user:jeherold sort:updated.asc", type: REPOSITORY, ${paginationKeyWord}: ${pageCount}, ${paginationString}) {
        repositoryCount
        edges {
          cursor
          node {
            ... on Repository {
              name
              description
              id
              url
              isPrivate
              viewerSubscription
              licenseInfo {
                spdxId
              }
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `,
  };
};

export default githubQueryAsFuncWithArgs;
