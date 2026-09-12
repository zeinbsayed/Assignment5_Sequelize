
export const bookSchema=
{
 validator: {
      bsonType: "object",
      required: ["title"],
      properties: {
        title: {
          bsonType: "string",
          minLength: 1
        }
      }
    }
  }
  