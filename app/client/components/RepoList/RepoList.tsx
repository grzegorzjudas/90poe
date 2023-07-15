import React, { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from 'react';
import debounce from 'debounce';
import { useSnackbar } from 'notistack';
import { useQuery } from '@apollo/client';
import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';

import { GET_REPOSITORIES } from '../../services/github';
import { LoadingSpinner } from '../LoadingSpinner';
import { RepoFilterPanel } from '../RepoFilterPanel';

import styles from './RepoList.styles';

export type RepoListProps = {};

export function RepoList () {
    const [ pageSize, setPageSize ] = useState(25);
    const [ pageNumber, setPageNumber ] = useState(0);

    const [ sort, setSort ] = useState('stars');
    const [ language, setLanguage ] = useState('');
    const [ query, setQuery ] = useState(buildSearchQuery());

    const numberFormat = useMemo(() => new Intl.NumberFormat(navigator.language).format, []);
    const { enqueueSnackbar } = useSnackbar();
    const { loading, error, data } = useQuery(GET_REPOSITORIES, {
        variables: {
            query,
            pageSize,
            after: btoa(`cursor:${pageSize * pageNumber}`)
        }
    });

    useEffect(() => {
        if (error) {
            enqueueSnackbar(`GitHub error: ${error.message}`, { variant: 'error' });
        }
    }, [error]);

    useEffect(() => {
        setQuery(buildSearchQuery());
    }, [sort, language]);

    function onSortChange (sort: string) {
        setSort(sort);
    }

    function onLanguageChange (language: string) {
        setLanguage(language);
    }

    function onPageChange (e: MouseEvent<HTMLButtonElement>, page: number) {
        setPageNumber(page);
    }

    function onRowsPerPageChange (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        setPageSize(parseInt(`${e.target.value}`, 10));
    }

    function buildSearchQuery () {
        return `stars:>1000 sort:${sort}${language ? ` language:${language}` : ''}`;
    }

    return (
        <>
            <RepoFilterPanel
                defaultSort={sort}
                defaultLanguage={language}
                onSortChange={onSortChange}
                onLanguageChange={debounce(onLanguageChange, 500)}
            />
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
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <LoadingSpinner size="2vw" className={styles.loader} fullSize />
                                </TableCell>
                            </TableRow>
                        )}
                        {!loading && data?.search.edges.map(({ node: repo }) => (
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
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={data?.search.repositoryCount || -1}
                                page={pageNumber}
                                rowsPerPage={pageSize}
                                onPageChange={onPageChange}
                                onRowsPerPageChange={onRowsPerPageChange}
                                variant="footer"
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
}

export default RepoList;
