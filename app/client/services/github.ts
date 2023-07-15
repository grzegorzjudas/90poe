import { TypedDocumentNode, gql } from '@apollo/client';

type Repository = {
    description: string;
    name: string;
    owner: {
        login: string;
    };
    stargazers: {
        totalCount: number;
    };
    forks: {
        totalCount: number;
    };
}

type SearchResponse = {
    search: {
        repositoryCount: number;
        pageInfo: {
            startCursor: string;
            endCursor: string;
        };
        edges: ({
            node: Repository;
        })[];
    }
}

type SearchVars = {
    query: string;
    pageSize: number;
    after?: string;
}

export const GET_REPOSITORIES: TypedDocumentNode<SearchResponse, SearchVars> = gql`
    query GetRepositories($query: String!, $pageSize: Int!, $after: String) {
        search(query: $query, type: REPOSITORY, first: $pageSize, after: $after) {
            repositoryCount
            pageInfo {
                endCursor
                startCursor
            }
            edges {
                node {
                    ... on Repository {
                        name
                        description
                        owner {
                            login
                        }
                        stargazers {
                            totalCount
                        }
                        forks {
                            totalCount
                        }
                    }
                }
            }
        }
    }
`;
