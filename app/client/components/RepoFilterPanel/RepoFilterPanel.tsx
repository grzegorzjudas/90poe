import React, { ChangeEvent, useMemo } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Toolbar } from '@mui/material';

import styles from './RepoFilterPanel.styles';

export type RepoFilterPanelProps = {
    defaultSort?: string;
    defaultLanguage?: string;
    onSortChange?: (sort: string) => void;
    onLanguageChange?: (language: string) => void;
}

export function RepoFilterPanel ({
    defaultSort = 'stars',
    defaultLanguage = '',
    onSortChange,
    onLanguageChange
}: RepoFilterPanelProps) {
    const defaultSortValue = useMemo(() => defaultSort, []);
    const defaultLanguageValue = useMemo(() => defaultLanguage, []);

    function handleSortChange (e: SelectChangeEvent) {
        onSortChange?.(e.target.value);
    }

    function handleLanguageChange (e: ChangeEvent<HTMLInputElement>) {
        onLanguageChange(e.target.value);
    }

    return (
        <Toolbar className={styles.toolbar} disableGutters>
            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                <InputLabel id="repo-filter-panel-sort">Sort</InputLabel>
                <Select label="Sort" labelId="repo-filter-panel-sort" onChange={handleSortChange} defaultValue={defaultSortValue}>
                    <MenuItem value="stars">Stars</MenuItem>
                    <MenuItem value="forks">Forks</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="outlined">
                <TextField label="Language" onChange={handleLanguageChange} defaultValue={defaultLanguageValue} />
            </FormControl>
        </Toolbar>
    );
}

export default RepoFilterPanel;
