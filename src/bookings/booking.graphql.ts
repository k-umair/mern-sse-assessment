import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";

const BookingType = new GraphQLObjectType({
  name: "BookingType",
  fields: {
    id: { type: GraphQLID },
    listingId: { type: GraphQLID },
    buyerId: { type: GraphQLID },
    status: { type: GraphQLString },
    rating: { type: GraphQLInt },
    review: { type: GraphQLString },
  },
});

export default BookingType;
