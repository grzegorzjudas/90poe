import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';

import RepoFilterPanel from '.';

describe('RepoFilterPanel', () => {
    const user = userEvent.setup();

    it('should call onSortChange when select value is changed', async () => {
        const onSortChange = jest.fn();

        render(<RepoFilterPanel onSortChange={onSortChange} />);

        const select = screen.getByLabelText('Sort');
        await user.click(select);

        const listbox = within(screen.getByRole('listbox'));
        await user.click(listbox.getByText(/forks/i));

        expect(onSortChange).toHaveBeenCalledWith('forks');
    });

    it('should call onLanguageChange when input value is changed', async () => {
        const onLanguageChange = jest.fn();

        render(<RepoFilterPanel onLanguageChange={onLanguageChange} />);

        const input = screen.getByLabelText('Language');
        await user.type(input, 'javascript');

        expect(onLanguageChange).toHaveBeenCalledWith('javascript');
    });
});
