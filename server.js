import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util.js';



  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

    /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );

  app.get( "/filteredimage", async (req, res) => {
    const url = req.query["image_url"];
    console.log('URL :', url)
    if (!url) {
      res.status(400).send('image_url is required!')
    }
    let result;
    try {
       result = await filterImageFromURL(url)
    } catch (err) {
      console.log('ERROR: ', err)
      res.status(500).send('error uploading image')
      return;
    }
    if (result) {
      res.sendFile(result)
      const deletedFiles = []
      deletedFiles.push(result)
      setTimeout(async () =>  {
        await deleteLocalFiles(deletedFiles)
        console.log("files deleted")
      },4000)
    }
  } );

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
