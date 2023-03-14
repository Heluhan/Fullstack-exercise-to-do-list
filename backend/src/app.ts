import "dotenv/config.js"
import express, { NextFunction , Request, Response} from "express";
import NoteModel from "./models/note"


const app = express();
app.get("/", async (req, res, next) => {
    try {
        const notes = await NoteModel.find().exec()
        res.status(200).json(notes)
    } catch (error) {
        next(error);
    }

})

app.use((req, res, next) => {
    next(Error("Endpoint not found"))
})


app.use((error: unknown, req:Request, res:Response, next:NextFunction) => {
    console.error(error)
    let errMessage = "An unknown error occurred"
    if (error instanceof Error) errMessage = error.message;
    res.status(500).json({error: errMessage})
})


export default app;