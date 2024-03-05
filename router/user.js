import express from "express";
import { addUser ,getAllUsers} from "../controlers/user.js";

const router = express.Router();

router.post("/",addUser )
router.get("/",getAllUsers )

export default router;