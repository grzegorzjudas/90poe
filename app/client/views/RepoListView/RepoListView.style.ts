import { css } from '@emotion/css';

import theme from '../../lib/theme';

export default {
    container: css`
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        padding: ${theme.spacing(4)};
    `,
    panel: css`
        width: 100%;
        padding: ${theme.spacing(2)};
        display: flex;
        flex-direction: column;
    `
};
