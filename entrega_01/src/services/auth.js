import {defaultFetchJson} from "./common";

let process = {
    env: {}
};
process.env["REACT_APP_API_BASE_URL"] = 'https://back.intable.es/';


export const login = async (user, password, callback = undefined) => {
    let url = new URL(process.env["REACT_APP_API_BASE_URL"] + '/api/auth/login');

    let params = {
        headers: {
            credentials: 'include'
        },
        method: "POST",
        body: JSON.stringify({
            'email': user,
            'password': password,
        })
    }

    return defaultFetchJson(url.toString(), params, callback);
}

export const register = async (user, password, passwordConfirmation, name, callback = undefined) => {
    let url = new URL(process.env["REACT_APP_API_BASE_URL"] + '/api/auth/register');

    let params = {
        // @ts-ignore
        headers: {
            "Access-Control-Allow-Credentials": true
        },
        method: "POST",
        body: JSON.stringify({
            'email': user,
            'password': password,
            'first_name': name
        })
    }

    return defaultFetchJson(url.toString(), params, callback);
}

export const exists = async (user, type, callback = undefined) => {
    let url = new URL(process.env["REACT_APP_API_BASE_URL"] + '/api/auth/exists');

    let body = {}
    if (type === 'email') {
        // @ts-ignore
        body.email = user;
    } else if (type === 'number') {
        // @ts-ignore
        body.mobile_phone = user;
    }

    let params = {
        method: "POST",
        body: JSON.stringify(body)
    }

    return defaultFetchJson(url.toString(), params, callback);
}

export const logout = async (callback = undefined) => {
    let url = new URL(process.env["REACT_APP_API_BASE_URL"] + '/api/auth/logout');
    let params = {
        method: "POST"
    }
    return defaultFetchJson(url.toString(), params, callback);
}

export const loggedIn = async (callback = undefined) => {
    let url = new URL(process.env["REACT_APP_API_BASE_URL"] + '/api/auth/loggedIn');
    let params = {
        method: "POST"
    }
    return defaultFetchJson(url.toString(), params, callback);
}

export const me = async (callback = undefined) => {
    let url = new URL(process.env["REACT_APP_API_BASE_URL"] + '/api/auth/me');
    let params = {
        method: "POST"
    }
    return defaultFetchJson(url.toString(), params, callback);
}

