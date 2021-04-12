const appId = '8e396b2f-2a39-447c-8317-3bae6a4avrma1';
const basePath = 'https://0qh9zi3q9g.execute-api.eu-west-1.amazonaws.com/development'
import * as gql from 'gql-query-builder'


//Starts new game and set as playing
export const startNewGame = (uuid, data) => {
    console.log('Starting game with ' + uuid)
    store(uuid, data)
}

function store(uuid, data) {
    let requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(gql.mutation({
            operation: 'updatePair',
            variables: {
                ...data,
                key: { value: uuid, required: true },
            },
            fields: ['applicationId', 'key']
        }))
    };

    return fetch("http://localhost:3002/", requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}

export function allPrefix(prefix) {
    console.log(1)
    let requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(gql.query({
            operation: 'pairs',
            variables: {},
            fields: ['applicationId', 'key']
        }))
    };

    return fetch("http://localhost:3002/", requestOptions)
        .then(response => response.json())
        .then(r => {
            return r.data.pairs
        })
        .catch(error => console.log('error', error));
}