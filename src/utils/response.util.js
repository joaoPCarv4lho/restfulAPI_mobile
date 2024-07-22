export const sendSuccesResponse = (res, status, message, data = {}) => {
    console.log(res)
    return res.status(status).send({ message, ...data });
};

export const sendErrorResponse = (res, status, message) => {
    console.log(res)
    return res.status(status).send({ message });
};