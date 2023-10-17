const githubQueryAsString = {
  query: `
  {
    viewer {
      name
    }
    search(query: "user:jeherold sort:updated.asc", type: REPOSITORY, first: 10) {
      nodes {
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
  }
`,
};

export default githubQueryAsString;
