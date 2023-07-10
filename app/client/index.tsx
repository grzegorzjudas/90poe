import React from 'react';
import { hydrateRoot } from 'react-dom/client';

import App from './components/App';

import './global.css';

hydrateRoot(document, <App />)
