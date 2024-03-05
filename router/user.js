import express from "express";

import { addUser ,getAllUsers,deleteUser,updateUser,findUserById} from "../controlers/user.js";


const router = express.Router();
router.delete("/",deleteUser)
router.post("/",addUser )
router.get("/:id",findUserById)
router.get("/",getAllUsers )
router.put("/",updateUser)


export default router;