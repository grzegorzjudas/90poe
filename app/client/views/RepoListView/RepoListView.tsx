import React, { Suspense, lazy } from 'react';
import { Paper } from '@mui/material';

import { LoadingSpinner } from '../../components/LoadingSpinner';

import styles from './RepoListView.style';

const RepoList = lazy(() => import('../../components/RepoList'));

export function RepoListView () {
    return (
        <section className={styles.container}>
            <Paper className={styles.panel}>
                <Suspense fallback={<LoadingSpinner fullSize />}>
                    <RepoList />
                </Suspense>
            </Paper>
        </section>
    );
}

export default RepoListView;
