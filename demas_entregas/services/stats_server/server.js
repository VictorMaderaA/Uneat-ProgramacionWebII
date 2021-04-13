const {GraphQLServer} = require("graphql-yoga");
const fetch = require("node-fetch");

const BASE_URL = "https://0qh9zi3q9g.execute-api.eu-west-1.amazonaws.com/development";
const DEFAULT_HEADERS = {
    "x-application-id": "vrma2638a-a986-442f-b029-feb40bd4d4dd"
}

const apiFetch = (...args) => fetch(...args)
    .then(response => response.json())
    .catch(error => console.log('error', error))

const typeDefs = `
    type Pair {
        applicationId: String
        key: String
        value: Game
        createdAt: String
    }
    type Game {
        user: String
        state: String
        points: Int
        won: Boolean
        livesLeft: Int
    }
    type Query {
        pair(id: String!): Pair
        pairs: [Pair]
        pairByPrefix(prefix: String!): [Pair]
    }
    type Mutation{
        updatePair(
            key: String!
            state: String
            points: Int
            won: Boolean
            livesLeft: Int
        ): Pair
    }
`;

const resolvers = {
    Query: {
        pair: (_, {id}) => apiFetch(`${BASE_URL}/pairs/${id}`, {
            method: 'GET',
            headers: DEFAULT_HEADERS
        }).then(r => {
            r.value = JSON.parse(r.value)
            return r;
        }),
        pairs: (_) => apiFetch(`${BASE_URL}/pairs`, {
            method: 'GET',
            headers: DEFAULT_HEADERS
        }).then(r => {
            for (let rKey in r) {
                r[rKey].value = JSON.parse(r[rKey].value)
            }
            return r;
        }),
        pairByPrefix: (_, {prefix}) => apiFetch(`${BASE_URL}/collections/${prefix}`, {
            method: 'GET',
            headers: DEFAULT_HEADERS
        }).then(r => {
            for (let rKey in r) {
                r[rKey].value = JSON.parse(r[rKey].value)
            }
            return r;
        }),
    },
    Mutation: {
        updatePair: (_, args) => fetch(`${BASE_URL}/pairs/${args.key}`, {
            method: 'PUT',
            headers: DEFAULT_HEADERS,
            body: JSON.stringify(args),
        }).then(r => r.json())
            .then(async r => {
                console.log(r)
                r.value = await JSON.parse(r.value);
                return r
            })
    }
};

const server = new GraphQLServer({typeDefs, resolvers});

server.start({
    playground: "/",
    port: 3002
});