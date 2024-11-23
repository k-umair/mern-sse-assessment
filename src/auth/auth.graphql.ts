import { GraphQLObjectType, GraphQLString } from "graphql";

const AuthResponseType = new GraphQLObjectType({
  name: "AuthResponseType",
  fields: {
    token: { type: GraphQLString },
  },
});

export default AuthResponseType;
