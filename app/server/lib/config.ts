function getConfigString (prop: string): string {
    const val = process.env[prop] || null;

    return val ? `${val}` : val;
}

function getConfigNumber (prop: string): number {
    const val = process.env[prop] || null;

    return val ? ~~`${val}` : null;
}

function getConfigBoolean (prop: string): boolean {
    const val = process.env[prop] || null;

    return val ? val === 'true' : null;
}

export function getConfig (prop: string, type: 'string'): string;

export function getConfig (prop: string, type: 'number'): number;

export function getConfig (prop: string, type: 'boolean'): boolean;

export function getConfig (prop: string, type: 'string' | 'number' | 'boolean'): string | number | boolean {
    switch (type) {
        case 'string': return getConfigString(prop);
        case 'number': return getConfigNumber(prop);
        case 'boolean': return getConfigBoolean(prop);
        default: return getConfigString(prop);
    }
}

export class FrontendConfig {
    public static NODE_ENV = getConfig('NODE_ENV', 'string');
    public static APP_NAME = getConfig('APP_NAME', 'string');
    public static GITHUB_TOKEN = getConfig('GITHUB_TOKEN', 'string');
}

export default class Config extends FrontendConfig {
    public static PORT = getConfig('PORT', 'number');
    public static LOG_LEVEL = getConfig('LOG_LEVEL', 'string');
    public static LOG_SILENT = getConfig('LOG_SILENT', 'boolean');

    public static SERVER_SIDE_RENDER_TIMEOUT = getConfig('SERVER_SIDE_RENDER_TIMEOUT', 'number');
}
