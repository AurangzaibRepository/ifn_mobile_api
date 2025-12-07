exports.getLimitOffset = (pageNumber) => {
    const pageSize = parseInt(process.env.PAGE_SIZE);
    const offset = (pageNumber * pageSize) - pageSize;

    return {pageSize, offset};
}