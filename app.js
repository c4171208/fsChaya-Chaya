// import {config} from "dotenv"
import express  from "express";

import userRouter from "./router/user.js"
import cors from "cors";

// config();
const app=express()


app.use(express.json());
app.use(cors({origin:"*",methods:"*"}))

app.use("/api/user",userRouter)
