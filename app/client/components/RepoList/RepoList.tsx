import React, { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useQuery } from '@apollo/client';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { GET_REPOSITORIES } from '../../services/github';
import { LoadingSpinner } from '../LoadingSpinner';

export type RepoListProps = {};

export function RepoList () {
    const numberFormat = useMemo(() => new Intl.NumberFormat(navigator.language).format, []);
    const { enqueueSnackbar } = useSnackbar();
    const { loading, error, data } = useQuery(GET_REPOSITORIES, {
        variables: {
            count: 10
        }
    });

    useEffect(() => {
        if (error) {
            enqueueSnackbar(`GitHub error: ${error.message}`, { variant: 'error' });
        }
    }, [error]);

    if (loading) {
        return <LoadingSpinner fullSize />;
    }

    if (error) {
        return null;
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Stars</TableCell>
                        <TableCell>Forks</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.search.edges.map(({ node: repo }) => (
                        <TableRow key={repo.name}>
                            <TableCell>
                                <a href={`https://github.com/${repo.owner.login}/${repo.name}`}>
                                    {repo.name}
                                </a>
                            </TableCell>
                            <TableCell>🌟 {numberFormat(repo.stargazers.totalCount)}</TableCell>
                            <TableCell>🍴 {numberFormat(repo.forks.totalCount)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default RepoList;
