import { Router } from "express";
import { addBooks, breakeGenres, createBooksCollection, createOneDocument, createTitleIndex, deleteBooks, filterBooks, findAllBooks, findAllBooksPublished, findbook, findBookGenre, findBooksGenre, findSkipLimit, findYearInteger, LogsOfBooks, updatebook } from "./books.service.js";
const bookRouter=Router();

///////create book collection/////////////////////////
bookRouter.post("/collection/books",async (req, res) => {
  try {
     await createBooksCollection();

    return res.status(201).json( {"OK":1});

  } catch (error) {
   return res.status(500).json({  message: error.message })
}
})

/////// Create an index on the books collection for the title field ///////////
bookRouter.post("/collection/books/index",async (req, res) => {
  try {
     const result =await createTitleIndex();

    return res.status(201).json(result);

  } catch (error) {
   return res.status(500).json({  message: error.message })
}
});


///////Insert one document into the books collection/////////////////

bookRouter.post("/",async (req, res) => {
try {
     const result=await createOneDocument(req.body);

     return res.status(201).json({
      acknowledged: result.acknowledged,
      insertedId: result.insertedId
    });;

  } catch (error) {
   return res.status(500).json({  message: error.message })
}
});
/////////Insert multiple documents into the books  collection with at least three records//////

bookRouter.post("/books/batch",async (req, res) => {
try {
     const result=await addBooks(req.body);

     return res.status(201).json({
      acknowledged: result.acknowledged,
      insertedId: result.insertedIds
    });;

  } catch (error) {
   return res.status(500).json({  message: error.message })
}
});
/////////////Update the book with title “Future” change the year to be 2022////////
bookRouter.patch("/books/Future",async (req, res) => {
  try {
     const result =await updatebook();

    return res.status(201).json({
      acknowledged: result.acknowledged,
      matchedCount: result.matchedCount,
      modifiedCount:result.modifiedCount
    });;


  } catch (error) {
   return res.status(500).json({  message: error.message })
}
});

///////////////Find a Book with title “Brave New World”////////////
bookRouter.get("/title",async (req, res) => {
  try {
     const result =await findbook(req.query.title);

    return res.json({result
    });;


  } catch (error) {
   return res.status(500).json({  message: error.message })
}
});

////////////Find all books published between 1990 and 2010////////////////

bookRouter.get("/year",async (req, res) => {
  const {from,to}=req.query;
  try {
     const result =await findAllBooks(from,to);

    return res.json({result
    });;


  } catch (error) {
   return res.status(500).json({  message: error.message })
}
});

///// Find books where the genre includes "Science Fiction"////////////

bookRouter.get("/genre",async (req, res) => {
  const {genre}=req.query;
  try {
     const result =await findBookGenre(genre);

    return res.json({result
    });;


  } catch (error) {
   return res.status(500).json({  message: error.message })
}
});

//Skip the first two books,limit the results to the next three,
//  sorted by yearin descending order



bookRouter.get("/skip-limit",async (req, res) => {
 
  try {
     const result =await findSkipLimit();

    return res.json({result
    });;


  } catch (error) {
   return res.status(500).json({  message: error.message })
}
});

////Find books where the year field stored as an integer./////////


bookRouter.get("/year-integer",async (req, res) => {
 
  try {
     const result =await findYearInteger();

    return res.json({result
    });;


  } catch (error) {
   return res.status(500).json({  message: error.message })
}
});



// Find all books where the genres field doesnot include any of the genres 
// "Horror" or "Science Fiction"
bookRouter.get("/exclude-genres",async (req, res) => {
  try {
     const result =await findBooksGenre();

    return res.json({result
    });;


  } catch (error) {
   return res.status(500).json({  message: error.message })
}
});


////// Delete all books published before 2000//////

bookRouter.delete("/before-year",async (req, res) => {
  try {
     const result =await deleteBooks(req.query.year);

   return res.status(201).json({
      acknowledged: result.acknowledged,
      deletedCount: result.deletedCount,
    });


  } catch (error) {
   return res.status(500).json({  message: error.message })
}
});


/// Using aggregation Functions, Filter books published after 2000 
// and sort them by year descending.


bookRouter.get("/aggregate1",async (req, res) => {
 
  try {
     const result =await filterBooks();

    return res.json({result
    });;


  } catch (error) {
   return res.status(500).json({  message: error.message })
}
});


// Using aggregation functions, Find all books published after the year 2000.
// For each matching book, show only the title, author, and year fields.


bookRouter.get("/aggregate2",async (req, res) => {
 
  try {
     const result =await findAllBooksPublished();

    return res.json({result
    });;


  } catch (error) {
   return res.status(500).json({  message: error.message })
}
});


/////////Using aggregation functions,break an array of genres into separate documents////
bookRouter.get("/aggregate3",async (req, res) => {
 
  try {
     const result =await breakeGenres();

    return res.json({result
    });;


  } catch (error) {
   return res.status(500).json({  message: error.message })
}
});


///////////// Using aggregation functions,Join the books collection with the logs collection./
bookRouter.get("/aggregate4",async (req, res) => {
 
  try {
     const result =await LogsOfBooks();

    return res.json({result
    });;


  } catch (error) {
   return res.status(500).json({  message: error.message })
}
});
export default bookRouter;