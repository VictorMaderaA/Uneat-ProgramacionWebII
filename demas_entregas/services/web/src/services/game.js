const appId = '8e396b2f-2a39-447c-8317-3bae6a4avrma1';
const basePath = 'https://0qh9zi3q9g.execute-api.eu-west-1.amazonaws.com/development'

//Starts new game and set as playing
export const startNewGame = (uuid, data) => {
    console.log('Starting game with ' + uuid)
    store(uuid, data)
}

//Change state of game to 'en uso'
export const viewGame = (uuid) => {
    console.log('Set Watching status for game ' + uuid)
    find(uuid)
}

//Clear game status
export const clearGame = (uuid) => {
    console.log('Clear status for game ' + uuid)
    find(uuid)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            json['status'] = 'clear'
            return store(uuid, json)
        })
}

function store(uuid, data) {

    fetch(basePath + `/pairs/${uuid}`, {
        method: 'put',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'text/plain',
            'x-application-id': appId
        },
    })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            return json
        });

}

export function find(uuid) {
    return fetch(basePath + `/pairs/${uuid}`, {
        method: 'get',
        headers: {'x-application-id': appId},
    })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            return json
        });
}


export function all() {
    fetch(basePath + `/pairs`, {
        method: 'get',
        headers: {'x-application-id': appId},
    })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            return json
        });
}


export function allPrefix(prefix) {
    return fetch(basePath + `/collections/${prefix}`, {
        method: 'get',
        headers: {'x-application-id': appId},
    })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            return json
        });
}