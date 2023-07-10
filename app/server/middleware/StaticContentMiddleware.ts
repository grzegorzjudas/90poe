import express from 'express';
import { resolve } from 'path';

export default function StaticContentMiddleware () {
    return [ '/static', express.static(resolve(__dirname, '..', '../static')) ];
}
