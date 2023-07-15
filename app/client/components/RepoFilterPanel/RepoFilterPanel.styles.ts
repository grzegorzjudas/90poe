import { css } from '@emotion/css';

import theme from '../../lib/theme';

export default {
    toolbar: css`
        * > div {
            margin-right: ${theme.spacing(1)}
        }
    `
};
