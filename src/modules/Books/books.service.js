
import { ObjectId } from "mongodb";
import { db } from "../../DB/db.connection.js";
import { bookSchema } from "../../DB/Models/books.model.js";

//////////create book collection//////////////////////
export const createBooksCollection = async () => {
 
  const collections = await db
    .listCollections({ name: "books" })
    .toArray();

  if (collections.length === 0) {
    const bookModel = await db.createCollection("books", {
      validator: {
        $jsonSchema: bookSchema
      }
    });

    return bookModel;
  }

  return db.collection("books");

};



/////// Create an index on the books collection for the title field ///////////
export const  createTitleIndex=async()=>
{
 const indexResult= db.collection("books").createIndex({ title: 1 });
 return indexResult;

}

///////Insert one document into the books collection/////////////////
export const  createOneDocument=async(documentData)=>
{
 return db.collection("books").insertOne(documentData);


}
/////////Insert multiple documents into the books  collection with at least three records//////
export const addBooks = async (books) => {
  if (books.length < 3) {
    throw new Error("You must add at least 3 books");
  }

  return await db.collection("books").insertMany(books);
};

///////Update the book with title “Future” change the year to be 2022////////
export const updatebook=async()=>
{
  /*if(!ObjectId.isValid(id))
  {
    throw new Error("Invalid user Id",{cause:{status:400}})

  }
  const bookId=new ObjectId(id);*/
  const book=  await db.collection("books").findOne(
    {title:"Future"}
  );
  if(!book)
  {
    throw new Error("Book Not Found",{cause:{status:404}})

  }
  const updatebook=await db.collection("books").updateOne({title:"Future"},{$set:{year:2022}});
  return updatebook;

}
///////////////Find a Book with title “Brave New World”////////////
export const findbook=async(title)=>
{
 // console.log(title);
  
  const book=  await db.collection("books").findOne(
    {title:title}
  );
  if(!book)
  {
    throw new Error("Book Not Found",{cause:{status:404}})

  }
    return book;

}

////////////Find all books published between 1990 and 2010////////////////
export const findAllBooks=async(from,to)=>
{

  
  const books=  await db.collection("books").find(
    {year:{
      $gt:1990,
      $lt:2010
    }}
  ).toArray();
  if(books.length==0)
  {
    throw new Error(" No Books found in this Period",{cause:{status:404}})

  }
    return books;

}


///// Find books where the genre includes "Science Fiction"////////////
export const findBookGenre=async(genre)=>
{
  
  const books=  await db.collection("books").find(
    {genrs:
      {
        $regex:genre,
        $options:"i"
    }}
  ).toArray();
  if(books.length==0)
  {
    throw new Error(" No Books found includes Science Fiction",{cause:{status:404}})

  }
    return books;

}


////Skip the first two books,limit the results to the next three,
//  sorted by yearin descending order
export const findSkipLimit=async()=>
{
  
  const books=  await db.collection("books").find({})
  .sort({year:-1})
  .skip(2)
  .limit(3)
  .toArray();
  if(books.length==0)
  {
    throw new Error(" No Books found ",{cause:{status:404}})

  }
    return books;

}

////Find books where the year field stored as an integer./////////
export const findYearInteger=async()=>
{
  
  const books=  await db.collection("books").find({year:
    {
      $type:"int"
    }
  })
  
  .toArray();
  if(books.length==0)
  {
    throw new Error(" No Books found ",{cause:{status:404}})

  }
    return books;

}

// Find all books where the genres field doesnot include any of the genres 
// "Horror" or "Science Fiction"

export const findBooksGenre=async()=>
{
  
  const books=  await db.collection("books").find(
    {genrs:
      {
    $nin: ["Horror", "Science Fiction"]

    }}
  ).toArray();
  if(books.length==0)
  {
    throw new Error(" No Books found  Not includes  Horror or Science Fiction",{cause:{status:404}})

  }
    return books;

}

////// Delete all books published before 2000//////
export const deleteBooks = async (year) => {
  
  const deleteResult = await db.collection("books").deleteMany({
    year: {
      $lt:Number(year)
    }
  });
 console.log(deleteResult);
  
  if (deleteResult.deletedCount === 0) {
    throw new Error(`No Books Found before ${year}`, {
      cause: { status: 404 }
    });
  }


  return deleteResult;
};

/// Using aggregation Functions, Filter books published after 2000 
// and sort them by year descending.

export const filterBooks = async () => {
  
const books=  await db.collection("books").aggregate([
  {
     $match:
    {
    year:{$gt:2000}
    }
  },
     {
    $sort: {
      year: -1
    }
  }
  
]).toArray();

 
  if(books.length==0)
  {
    throw new Error(" No Books found ",{cause:{status:404}})

  }
    return books;


};

// Using aggregation functions, Find all books published after the year 2000.
// For each matching book, show only the title, author, and year fields.


export const findAllBooksPublished = async () => {
  
const books=  await db.collection("books").aggregate([
  {
    $match:
    {
    year:{$gt:2000}
    }
  },
  {
    $project: {
      title: 1,
      author: 1,
      year: 1,
      _id: 0
    }
  }
]).toArray();
 
  if(books.length==0)
  {
    throw new Error(" No Books found ",{cause:{status:404}})

  }
    return books;


};


/////////Using aggregation functions,break an array of genres into separate documents////

export const breakeGenres = async () => {
  
const genres=await  db.collection("books").aggregate([
  {
    $unwind:"$genrs"
  },
   {
    $project: {
      title: 1,
      genrs:1,
      _id: 0
    }
  }
]).toArray()
 
  
    return genres;


};

///// Using aggregation functions,Join the books collection with the logs collection./

export const LogsOfBooks = async () => {
  
  const logsBooks = await db.collection("logs").aggregate([
    {
      $set: {
        bookObjectId: {
          $toObjectId: "$book_id"
        }
      }
    },
    {
      $lookup: {
        from: "books",
        localField: "bookObjectId",
        foreignField: "_id",
        as: "book-details",
         pipeline: [
        {
          $project: {
            _id: 0,
            title: 1,
            author: 1,
            year: 1
          }
        }
      ],
      }
    },
     {
    $project: {
      _id: 0,
      book_id: 0,
      bookObjectId: 0
    }
  }
  ]).toArray();
  return logsBooks;
  
};