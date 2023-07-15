import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, render, within } from '@testing-library/react';
import { useQuery } from '@apollo/client';

import RepoList from '.';
import { GET_REPOSITORIES, type SearchResponse } from '../../services/github';

const MOCK_DATA: SearchResponse = {
    search: {
        repositoryCount: 30,
        edges: [
            {
                node: {
                    name: 'bar',
                    owner: { login: 'foo' },
                    description: 'Blah blah blah',
                    stargazers: { totalCount: 200 },
                    forks: { totalCount: 100 }
                }
            },
            {
                node: {
                    name: 'abc',
                    owner: { login: 'def' },
                    description: 'Something something',
                    stargazers: { totalCount: 50 },
                    forks: { totalCount: 47 }
                }
            }
        ]
    }
};

jest.mock('@apollo/client', () => ({
    ...jest.requireActual('@apollo/client'),
    useQuery: jest.fn().mockReturnValue({ loading: true })
}));

jest.mock('debounce', () => jest.fn().mockImplementation((fn) => fn));

describe('RepoList', () => {
    const user = userEvent.setup();

    it('should render loading spinner until data is loaded', () => {
        render(<RepoList />);

        const spinner = screen.getByRole('progressbar');

        expect(spinner).toBeInTheDocument();
    });

    it('should render the results based on default filters', () => {
        const spy = (useQuery as jest.Mock).mockReturnValue({ loading: false, data: MOCK_DATA });

        render(<RepoList />);

        const items = screen.getAllByRole('row');

        expect(spy).toHaveBeenCalledWith(GET_REPOSITORIES, {
            variables: {
                query: 'stars:>1000 sort:stars',
                pageSize: 25,
                after: btoa('cursor:0')
            }
        });
        expect(items.length).toEqual(4);
    });

    it('should make a correct query when page is changed', async () => {
        const spy = (useQuery as jest.Mock).mockReturnValue({ loading: false, data: MOCK_DATA });

        render(<RepoList />);

        const nextPageButton = screen.getByRole('button', { name: 'Go to next page' });

        await user.click(nextPageButton);

        expect(spy).toHaveBeenCalledWith(GET_REPOSITORIES, {
            variables: {
                query: 'stars:>1000 sort:stars',
                pageSize: 25,
                after: btoa('cursor:25')
            }
        });
    });

    it('should make a correct query when a sort filter is changed', async () => {
        const spy = (useQuery as jest.Mock).mockReturnValue({ loading: false, data: MOCK_DATA });

        render(<RepoList />);

        const select = screen.getByLabelText('Sort');
        await user.click(select);

        const listbox = within(screen.getByRole('listbox'));
        await user.click(listbox.getByText(/forks/i));

        expect(spy).toHaveBeenCalledWith(GET_REPOSITORIES, {
            variables: {
                query: 'stars:>1000 sort:forks',
                pageSize: 25,
                after: btoa('cursor:0')
            }
        });
    });

    it('should make a correct query when a language filter is changed', async () => {
        const spy = (useQuery as jest.Mock).mockReturnValue({ loading: false, data: MOCK_DATA });

        render(<RepoList />);

        const input = screen.getByLabelText('Language');
        await user.type(input, 'javascript');

        expect(spy).toHaveBeenCalledWith(GET_REPOSITORIES, {
            variables: {
                query: 'stars:>1000 sort:stars language:javascript',
                pageSize: 25,
                after: btoa('cursor:0')
            }
        });
    });
});
