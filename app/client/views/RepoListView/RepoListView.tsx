import React, { Suspense, lazy } from 'react';

import { LoadingSpinner } from '../../components/LoadingSpinner';
import styles from './RepoListView.style';

const RepoList = lazy(() => import('../../components/RepoList'));

export function RepoListView () {
    return (
        <section className={styles.container}>
            <Suspense fallback={<LoadingSpinner fullSize />}>
                <RepoList />
            </Suspense>
        </section>
    );
}

export default RepoListView;
