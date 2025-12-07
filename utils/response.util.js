exports.getResponse = (status, message, data = null) => {
    return {
        status,
        ...(message != null && { message }),
        ...(data != null && { data })
    }
}