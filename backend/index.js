import express from "express"
import connectDb from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import LoginRouter from "./routes/LoginRoute.js";
import ngoRouter from "./routes/ngoRoute.js";
dotenv.config();

const app = express();
const PORT = 5000;

// Necessary Middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}));

app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Working");
})

app.use("/user", LoginRouter);
app.use("/ngo",ngoRouter);


connectDb();


app.listen((PORT), ()=>{
    console.log(`Server is running on this ${PORT}`);
});
