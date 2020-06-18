const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt
  } = require('graphql')
  const fetch = require('node-fetch');
  
  fetchDevelopers  = () => {
    return fetch("https://tech-services-1000201953.uc.r.appspot.com/developers")
    .then(response=>response.json())
    .then(devs=>devs)
  }
  //const developers = require('./developers.json')
  let developers = fetchDevelopers();
  
  const developer = new GraphQLObjectType({
    name: 'Developer',
    fields: {
      id: {
        type: GraphQLString
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
              type: GraphQLString
            }
          },
          resolve: (r, {id}) => developers.then(devs=>devs.find(dev=>dev.id == id))
        },
        devsByFirstName: {
          type: new GraphQLList(developer),
          args: {
            name: {
              type: GraphQLString
            }      
          },
          resolve: (r, {name}) =>  developers.then(devs=>devs.filter(dev=> dev.firstName && dev.firstName.includes(name)))
        },
        devsByLastName: {
          type: new GraphQLList(developer),
          args: {
            name: {
              type: GraphQLString
            }      
          },
          resolve: (r, {name}) => developers.then(devs=>devs.filter(dev=>dev.lastName && dev.lastName.includes(name)))
        },
        devsByFavLang: {
          type: new GraphQLList(developer),
          args: {
            language: {
              type: GraphQLString
            }      
          },
          resolve: (r, {language}) => developers.then(devs=>devs.filter(dev=>dev.favoriteLanguage && dev.favoriteLanguage == language))
        },
        devsByYearStarted: {
          type: new GraphQLList(developer),
          args: {
            year: {
              type: GraphQLInt
            }      
          },
          resolve: (r, {year}) => developers.then(devs=>devs.filter(dev=>dev.yearStarted && dev.yearStarted == year))
        },
      }
    })
  })