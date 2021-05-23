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
        game: String
    }
    type Stats {
        ganadas: Int
        porcentaje_ganadas: Float
        perdidas: Int
        porcentaje_perdidas: Float
        totales: Int
        promedio_puntos: Float
        puntos: Int
    }
    type Query {
        pair(id: String!): Pair
        pairs: [Pair]
        pairByPrefix(prefix: String!): [Pair]
        stats(prefix: String!): Stats
    }
    type Mutation{
        updatePair(
            key: String!
            state: String
            points: Int
            won: Boolean
            livesLeft: Int
            game:String
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
        stats: (_, {prefix}) => apiFetch(`${BASE_URL}/collections/${prefix}`, {
            method: 'GET',
            headers: DEFAULT_HEADERS
        }).then(r => {
            for (let rKey in r) {
                r[rKey].value = JSON.parse(r[rKey].value)
            }
            return r;
        }).then(r => {
            let totales = 0;
            let ganadas = 0;
            let perdidas = 0;
            let puntos = 0;

            r.forEach(x=> {
                totales++
                ganadas += x.value.won? 1 : 0;
                perdidas += x.value.won? 0 : 1;
                puntos += x.value.points;
            })

            let porcentaje_ganadas = ganadas / totales
            let porcentaje_perdidas = perdidas / totales
            let promedio_puntos = puntos / totales

            return {
                totales,
                ganadas,
                perdidas,
                puntos,
                porcentaje_ganadas,
                porcentaje_perdidas,
                promedio_puntos
            }

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
    port: 5001
});