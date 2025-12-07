exports.getLimitOffset = (pageNumber) => {
    const pageSize = parseInt(process.env.pageSize);
    const offset = (2 * pageSize) - pageSize;

    return {pageSize, offset};
}