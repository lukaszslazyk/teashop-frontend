const IMAGES_ROOT = process.env.REACT_APP_CDN_ROOT;

/* TODO Add default image if relative path is empty */
export function getImageFullUrl(relativePath: string) {
    return `${IMAGES_ROOT}/${relativePath}`;
}
