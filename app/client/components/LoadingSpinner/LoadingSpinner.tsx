import React from 'react';
import cx from 'classnames';
import { CircularProgress } from '@mui/material';

import styles from './LoadingSpinner.styles';

export type LoadingSpinnerProps = {
    size?: number | string;
    fullSize?: boolean;
    className?: string;
}

export function LoadingSpinner ({ size = '5vw', fullSize = false, className }: LoadingSpinnerProps) {
    return (
        <div className={cx({ [styles.fullSize]: fullSize, [className]: !!className })}>
            <CircularProgress size={size} />
        </div>
    );
}

export default LoadingSpinner;
