import { ValidMenuKeys, MenuSection, containsValidPath } from './menu-models';

function removeFinalSlash(path: string): string {
    let endPath = path;
    while (endPath.endsWith('/')) {
        endPath = endPath.slice(0, -1);
    }
    return endPath;
}

export function buildBuilderInteractor() {
    function loadMenuFromPath(path: string): ValidMenuKeys {
        const endPath = removeFinalSlash(path);
        const segments = endPath.split('/');
        const lastPath = segments.pop() || '';
        const section = segments.pop();

        if (segments.length > 1) return undefined;

        if (lastPath === MenuSection) {
            return 'scene';
        }

        if (section !== MenuSection) {
            return undefined;
        }

        return containsValidPath(lastPath);
    }

    return {
        buildMenuFromPath: loadMenuFromPath
    };
}
