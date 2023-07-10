import express from 'express';
import { resolve } from 'path';

export default () => [ '/static', express.static(resolve(__dirname, '..', '../static')) ];
