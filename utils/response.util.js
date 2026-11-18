exports.getResponse = (status, message, data = null) => {
    if (typeof status !== 'boolean') {
        return null;
    }

    return {
        status,
        ...(message != null && { message }),
        ...(data != null && { data })
    }
}