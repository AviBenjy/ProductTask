import { Field, Schema } from "v4f";


export default Schema(
  {
    name: Field()
      .string()
      .min(2, { message: "name must be at least 2 characters" })
      .max(50, { message: "name must be at max 50 character" })
      .required({ message: "name is required" }),
    price: Field()
      .number({message: 'pleas enter number only'})
      .less(0, {message: 'price must be greater then 0'})
      .required({ message: "price is required" }),
    category: Field()
      .string()
      .required({ message: "category is required" })
  },

  { verbose: true, async: false }
);
