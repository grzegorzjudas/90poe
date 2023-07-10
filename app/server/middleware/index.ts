import CompressionMiddleware from './CompressionMiddleware';
import StaticContentMiddleware from './StaticContentMiddleware';

export default [
    CompressionMiddleware(),
    StaticContentMiddleware()
]
