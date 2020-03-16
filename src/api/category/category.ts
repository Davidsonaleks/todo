import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import { model, Schema } from "mongoose"

export const CategorySchema = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    color: { type: GraphQLString },
  }),
})
const t = new Schema({
  name: { type: String },
  color: { type: String },
})
export const CategoryModel = model("category", t)
