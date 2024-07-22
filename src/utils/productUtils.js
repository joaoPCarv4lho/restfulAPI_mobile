export const validateProductData = (body) => {
    const { name, description, img, price } = body;
    if (!name || !description || !img || !price) {
        throw new Error("Fill in the necessary fields");
    }
    return {name, description, img, price}
};

export const createPaginationLinks = (baseUrl, limit, offset, total) => {
    const next = offset + limit;
    const nextUrl = next < total ? `${baseUrl}?limit=${limit}&offset=${next}` : null;
    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl = previous != null ? `${baseUrl}?limit=${limit}&offset=${previous}` : null;

    return { nextUrl, previousUrl };
};
