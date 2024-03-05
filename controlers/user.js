import { User, userValidatorAddUser,userValidatorUpDateUser } from "../models/user.js";

export const addUser = async (req, res) => {

    let { name, email,phone } = req.body;
    let validate = userValidatorAddUser(req.body);

    if (validate.error)
        return res.status(404).json({ type: "not valid data ", message: validate.error.details[0].message });

    try {
        //לסדר
        let sameUser = await User.findOne({ $or: [{ name }, { email }] })
        if (sameUser) {
            return res.status(409).send({ type: "conflict", message: "There is already a user with such a name and tz or email" })
        }
        let newUser = new User({ name, email ,phone})
        await newUser.save();
        let id = newUser._id;
     

        return res.json({ _id: id, email,name,phone });
    }
    catch (err) {
        return res.status(400).send({ type: "An error occurred while in addition a user", message: err.message })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        let users = await User.find({});
        res.json(users)
    }
    catch (err) {
        return res.status(400).send({ type: "An error occurred while in get all users", message: err.message })

    }
}






