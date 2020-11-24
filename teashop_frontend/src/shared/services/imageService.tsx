const IMAGES_ROOT = process.env.REACT_APP_CDN_ROOT;

export function getImageFullUrl(relativePath: string | null) {
    if (relativePath === null || relativePath.trim().length === 0)
        return `${IMAGES_ROOT}/images/image_unavailable.png`;
    return `${IMAGES_ROOT}/${relativePath}`;
}
