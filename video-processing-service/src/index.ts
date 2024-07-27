import express from 'express';
import ffmpeg from 'fluent-ffmpeg'
import ffmpegPath from 'ffmpeg-static';

const app = express();
app.use(express.json());



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/process-video', (req, res) => {
    res.send("Welcome")
});





app.post('/process-video', (req, res) => {
    // Get path of the input file from request body
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    if (!inputFilePath || !outputFilePath){
        res.status(400).send("Bad Request: Missing File Path");
    }

    ffmpeg(inputFilePath)
        .outputOptions("-vf", "scale=-1:360") //360p
        .on("end", () =>{
            res.status(200).send("Processing finished successfully."); // 360p
        })

        .on('error', (err) => {
            console.error(`An error occurred: ${err.message}`);
            res.status(500).send(`Internal Server Error: ${err.message}`);
        })
        .save(outputFilePath);


       

    

});

