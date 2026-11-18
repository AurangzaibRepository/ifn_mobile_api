exports.getLimitOffset = (pageNumber) => {
    if (!Number.isInteger(pageNumber) || pageNumber < 1) {
        return null;
    }

    const pageSize = parseInt(process.env.PAGE_SIZE);
    const offset = (pageNumber * pageSize) - pageSize;

    return {pageSize, offset};
}