//https://www.geeksforgeeks.org/how-to-communicate-json-data-between-python-and-node-js/
const multer = require("multer")
const express = require("express")
const router = express.Router();

const parseUploadListing = multer();

router.post('', parseUploadListing.any(), (request, response, next) => {


    try {
        if (request.body.title == "" || request.body.title == null || request.body.title === undefined) {
            throw new Error('Something seems broken. Request Not Received')
        }
        const spawn = require('child_process').spawn;
        console.log('Body is ', request.body)
        // Initialise the data
        console.log('check string', request.body.title)
        const data = request.body.title
        // We need to stringify the data as
        // python cannot directly read JSON
        // as command line argument.

        console.log('Sending string :', data)
        // Call the python process and pass the
        // data as command line argument.
        const py = spawn('python', ['./make.py', data]);

        resultString = '';

        // As the stdout data stream is chunked,
        // we need to concat all the chunks.
        py.stdout.on('data', function (stdData) {
            resultString += stdData.toString();
        });

        py.stdout.on('end', function () {

            // Parse the string as JSON when stdout
            // data stream ends
            console.log('before Parse :', resultString)
            let resultData = JSON.parse(resultString);

            let makekeywords = resultData['Unique Keywords'];
            console.log('Unique Keywords Generated from string', makekeywords);

            response.status(201).json({
                MAKEkeywords: makekeywords
            })
        });
    }
    catch (err) {
        next(err)
    }
});




module.exports = router;
