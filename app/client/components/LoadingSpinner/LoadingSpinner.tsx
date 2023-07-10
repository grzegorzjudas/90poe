import React from 'react';
import cx from 'classnames';
import { CircularProgress } from '@mui/material';

import styles from './LoadingSpinner.styles';

export type LoadingSpinnerProps = {
    size?: number | string;
    fullSize?: boolean;
}

export function LoadingSpinner ({ size = '5vw', fullSize = false }: LoadingSpinnerProps) {
    return (
        <div className={cx({ [styles.fullSize]: fullSize })}>
            <CircularProgress size={size} />
        </div>
    )
}

export default LoadingSpinner;
