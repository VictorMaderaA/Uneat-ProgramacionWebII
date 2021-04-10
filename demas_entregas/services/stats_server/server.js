const {GraphQLServer} = require("graphql-yoga");
// `fetch` es una API de navegador. Por lo tanto, no está disponible en NodeJS. El paquete `node-fetch` implementa un clon de `fetch` utilizable en NodeJS.
const fetch = require("node-fetch");

// Los puntos suspensivos en la siguiente función son los operadores rest y spread, respectivamente. Más info.: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
const fetchJson = (...args) => fetch(...args)
    .then(response => response.json());

const typeDefs = `
  type Pair {
    applicationId: String!
    key: String!
    value: String!
  }
  type Game {
    user: String!
    state: String!
    points: Int!
    won: Boolean!
    livesLeft: Int!
  }
  type Query {
    pair(id: ID!): Pair
    pokemon(id: ID!): Pokemon
    pokemons(offset: Int!, first: Int!): [Pokemon!]!
    location(id: ID!): Location
  }
  type Mutation {
    createPokemon(name: String!): Pokemon!
  }
  type Pokemon {
    id: ID!
    name: String!
    types: [Type!]!
    locations: [Location!]!
  }
  type Type {
    id: ID!
    name: String!
    pokemons(offset: Int!, first: Int!): [Pokemon!]!
  }
  type Location {
    id: ID!
    name: String!
    pokemons(offset: Int!, first: Int!): [Pokemon!]!
  }
`;

const BASE_URL = "https://0qh9zi3q9g.execute-api.eu-west-1.amazonaws.com/development";
const appId = '8e396b2f-2a39-447c-8317-3bae6a4avrma1';

const resolvers = {
    Pair: {
        applicationId: pair => pair.applicationId,
        key: pair => pair.key,
        value: pair => pair.value,
    },
    Game: {
        user: game => game.user,
        state: game => game.state,
        points: game => game.points,
        won: game => game.won,
        livesLeft: game => game.livesLeft,
    },
    Query: {
        pair: (_, {id}) => fetchJson(`${BASE_URL}/pairs/${id}`, {
            method: 'get',
            headers: {'x-application-id': appId},
        }),
        pokemon: (_, {id}) => fetchJson(`${BASE_URL}/pokemon/${id}/`),
        pokemons: (_, {offset, first}) => {
            // Las siguientes tres líneas construyen una URL como la siguiente: "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20".
            const url = new URL(`${BASE_URL}/pokemon/`);
            url.searchParams.append("offset", offset);
            url.searchParams.append("limit", first);

            return fetchJson(url).then(({results}) =>
                results.map(({url}) => url).map(url => fetchJson(url))
            );
        },
        /* La siguiente implementación es equivalente, utilizando async/await:
        pokemons: async (_, { offset, first }) => {
          // Las siguientes tres líneas construyen una URL como la siguiente: "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20".
          const url = new URL(`${BASE_URL}/pokemon/`);
          url.searchParams.append("offset", offset);
          url.searchParams.append("limit", first);

          const { results } = await fetchJson(url);
          const urls = results.map(({ url }) => url);
          return urls.map(url => fetchJson(url));
        }
        */
        location: (_, {id}) => fetchJson(`${BASE_URL}/location-area/${id}`)
    },
    Mutation: {
        createPokemon: (_, args) => {
            // Esta mutación no hace nada realmente. En un servidor real podría, por ejemplo, hacer una petición a la DB para persistir los datos del nuevo pokemon. Más info.: https://graphql.org/learn/queries/#mutations
            console.log("pokemon created with args:", args);
            return {id: 0, name: args.name, types: [], locations: []};
        }
    },
    Pokemon: {
        // Los siguientes dos resolvers no son necesarios. Más info.: https://graphql.org/learn/execution/#trivial-resolvers
        id: pokemon => pokemon.id,
        name: pokemon => pokemon.name,
        types: pokemon =>
            pokemon.types.map(({type}) => type.url).map(url => fetchJson(url)),
        locations: pokemon =>
            fetchJson(pokemon.location_area_encounters).then(locations =>
                locations
                    .map(location => location.location_area.url)
                    .map(url => fetchJson(url))
            )
        /* La siguiente implementación es equivalente, utilizando async/await:
        locations: async pokemon => {
          const locations = await fetchJson(pokemon.location_area_encounters);
          const urls = locations.map(location => location.location_area.url);
          return urls.map(fetchJson(url));
        }
        */
    },
    Type: {
        id: type => type.id,
        name: type => type.name,
        pokemons: (type, args) =>
            type.pokemon
                // `offset` y `first` son parámetros utilizados para la paginación. Existen múltiples arternativas para paginar queries en GQL. Más info.: https://graphql.org/learn/pagination/
                .slice(args.offset, args.first + args.offset)
                .map(({pokemon}) => fetchJson(pokemon.url))
    },
    Location: {
        pokemons: (location, args) =>
            location.pokemon_encounters
                .slice(args.offset, args.first + args.offset)
                .map(encounter => encounter.pokemon.url)
                .map(url => fetchJson(url))
    }
};

const server = new GraphQLServer({typeDefs, resolvers});

server.start({

    playground: "/",
    port: 3002
});