import "dotenv/config.js"
import express, { NextFunction , Request, Response} from "express";
import notesRoute from "./routes/notes"

const app = express();

app.use(express.json())

app.use("/api/notes", notesRoute)

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