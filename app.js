// import {config} from "dotenv"
import userRouter from "./router/user.js"
import cors from "cors";

// config();
const app=express()

////
app

app.use(express.json());
app.use(cors({origin:"*",methods:"*"}))

app.use("/api/user",userRouter)