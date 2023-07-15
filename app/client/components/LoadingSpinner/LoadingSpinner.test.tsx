import React from 'react';
import { screen, render } from '@testing-library/react';

import LoadingSpinner from '.';

describe('LoadingSpinner', () => {
    it('should render into document', () => {
        render(<LoadingSpinner />);

        const spinner = screen.getByRole('progressbar');

        expect(spinner).toBeInTheDocument();
    });
});
