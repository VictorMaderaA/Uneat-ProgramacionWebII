import * as gql from 'gql-query-builder'


//Starts new game and set as playing
export const updateGame = (uuid, data) => {
    console.log('UPDATE', uuid, data)
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
            return r.data.pair
        })
        .catch(error => console.log('error', error));
}


export function stats(key) {
    let requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(gql.query({
            operation: 'stats',
            variables: {
                prefix: { value: key, required: true },
            },
            fields: [
                'totales',
                'ganadas',
                'perdidas',
                'puntos',
                'porcentaje_ganadas',
                'porcentaje_perdidas',
                'promedio_puntos'
            ]
        }))
    };

    return fetch("http://localhost:3002/", requestOptions)
        .then(response => response.json())
        .then(r => {
            return r.data.stats
        })
        .catch(error => console.log('error', error));
}
