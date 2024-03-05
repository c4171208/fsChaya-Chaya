// import {config} from "dotenv"
import userRouter from "./router/user.js"
import cors from "cors";

// config();
const app=express()


app.use(express.json());
app.use(cors({origin:"*",methods:"*"}))

app.use("/api/user",userRouter)

const PORT=process.env.PORT||1000


    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`);
    })



