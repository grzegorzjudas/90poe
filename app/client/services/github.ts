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
        edges: ({
            node: Repository;
        })[]
    }
}

type SearchVars = {
    count: number;
}

export const GET_REPOSITORIES: TypedDocumentNode<SearchResponse, SearchVars> = gql`
    query GetRepositories($count: Int!) {
        search(query: "stars:>10000 sort:stars", type: REPOSITORY, first: $count) {
            repositoryCount
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
