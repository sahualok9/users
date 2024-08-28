
const graphql = require('graphql');
//remove when json server is ready 
const _ = require('lodash');
const axios = require('axios');
const { response } = require('express');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

const users = [
    {id:'23',firstname:'Bill',age:20},
    {id:'47',firstname:'Samantha',age:21}
];

const UserType = new GraphQLObjectType({
name:'User',
fields: {
    id: {type: GraphQLString},
    firstname: {type: GraphQLString},
    age: {type: GraphQLInt}
}
});

const RootQuery = new GraphQLObjectType({
name: 'RootQueryType',
fields:{
    user:{
        type: UserType,
        args: { id: {type: GraphQLString}},
        resolve(parentValue, args){
           return _.find(users, {id: args.id});
        //   return axios.get(`http://localhost:3000/users/${args.id}`)
        //   .then(resp => resp.data);
          
        }
      } 
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});