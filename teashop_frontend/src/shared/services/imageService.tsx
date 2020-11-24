const IMAGES_ROOT = process.env.REACT_APP_CDN_ROOT;

export const getImageFullUrl = (relativePath: string | null) => {
    if (isNullOrEmpty(relativePath))
        return `${IMAGES_ROOT}/images/image_unavailable.png`;
    return `${IMAGES_ROOT}/${relativePath}`;
};

const isNullOrEmpty = (input: string | null) =>
    input === null || input.trim().length === 0;
