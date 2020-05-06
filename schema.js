const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt
  } = require('graphql')
  const fetch = require('node-fetch');
  
  fetchDevelopers  = () => {
    return fetch("https://developer-service-overspeedy-celebratedness.cfapps.io/developers")
    .then(response=>response.json())
    .then(devs=>devs)
  }

  let developers = fetchDevelopers();
  
  const developer = new GraphQLObjectType({
    name: 'Developer',
    fields: {
      id: {
        type: GraphQLInt
      },
      firstName: {
        type: GraphQLString
      },
      lastName: {
        type: GraphQLString
      },
      favoriteLanguage: {
        type: GraphQLString
      },
      yearStarted: {
        type: GraphQLInt
      }
    }
  })
  
  module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        developers: {
          type: new GraphQLList(developer),
          resolve: () => developers   
        },
        developer: {
          type: developer,
          args: {
            id: {
              type: GraphQLInt
            }
          },
          resolve: (r, {id}) => developers.find(dev=>dev.id == id)
        },
        devsByFirstName: {
          type: new GraphQLList(developer),
          args: {
            name: {
              type: GraphQLString
            }      
          },
          resolve: (r, {name}) => developers.filter(dev=>dev.firstName.includes(name))
        },
        devsByLastName: {
          type: new GraphQLList(developer),
          args: {
            name: {
              type: GraphQLString
            }      
          },
          resolve: (r, {name}) => developers.filter(dev=>dev.lastName.includes(name))
        },
        devsByFavLang: {
          type: new GraphQLList(developer),
          args: {
            language: {
              type: GraphQLString
            }      
          },
          resolve: (r, {language}) => developers.filter(dev=>dev.favoriteLanguage == language)
        },
        devsByYearStarted: {
          type: new GraphQLList(developer),
          args: {
            year: {
              type: GraphQLInt
            }      
          },
          resolve: (r, {year}) => developers.filter(dev=>dev.yearStarted == year)
        },
      }
    })
  })