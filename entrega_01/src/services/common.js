export const defaultFetchJson = async (url, params, callback) => {
    if (params.headers === undefined) {
        params.headers = {}
    }
    if (params.method === 'POST') {
        // @ts-ignore
        params.headers['Content-Type'] = "application/json";
        // @ts-ignore
        params.headers['Authorization'] = `Bearer ${window.localStorage.getItem('token')}`
    }
    // @ts-ignore
    params.headers['Accept'] = "application/json";

    let response = await fetch(url.toString(), params)
        .then(
            (result) => {
                // console.log('Result', result)
                return result;
            },
            (error) => onError(error)
        )
    if (typeof callback === "function") {
        callback(response);
    }
    return response;

}