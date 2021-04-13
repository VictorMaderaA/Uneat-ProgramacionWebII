import * as gql from 'gql-query-builder'


//Starts new game and set as playing
export const startNewGame = (uuid, data) => {
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
            fields: ['applicationId', 'key', 'createdAt']
        }))
    };

    return fetch("http://localhost:3002/", requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}

export function allPrefix(prefix) {
    let requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(gql.query({
            operation: 'pairByPrefix',
            variables: {
                prefix: { value: prefix, required: true },
            },
            fields: ['applicationId', 'key', 'createdAt',{value: [
                    'state',
                    'points',
                    'won',
                    'livesLeft',
                ]}]
        }))
    };

    return fetch("http://localhost:3002/", requestOptions)
        .then(response => response.json())
        .then(r => {
            console.log(r)
            return r.data.pairByPrefix
        })
        .catch(error => console.log('error', error));
}

export function find(key) {
    let requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(gql.query({
            operation: 'pair',
            variables: {
                id: { value: key, required: true },
            },
            fields: ['applicationId', 'key', 'createdAt', {value: [
                    'state',
                    'points',
                    'won',
                    'livesLeft',
                ]}]
        }))
    };

    return fetch("http://localhost:3002/", requestOptions)
        .then(response => response.json())
        .then(r => {
            console.log(5, r)
            return r.data.pair
        })
        .catch(error => console.log('error', error));
}
