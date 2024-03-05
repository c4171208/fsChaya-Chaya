
 import mongoose from "mongoose";
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
        let newUser = new User({ name, email, phone })
        await newUser.save();
        let id = newUser._id;


        return res.json({ _id: id, email, name, phone });
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

export const deleteUser = async (req, res) => {
    const { _id } = req.body;

    if (!_id) {
        return res
            .status(400)
            .json({ error: true, message: "id is required!", data: null });
    }
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res
                .status(400)
                .json({ error: true, message: "no user found", data: null });
        }
        user.deleted = true
        const updateUser = await user.save();
        res.json({ error: false, message: "", data: { name: updateUser.name, _id: updateUser._id, deleted: updateUser.deleted } });

    } catch (err) {
        return res.status(400).send({ type: "An error occurred while in  deleteUser", message: err.message });

    }

};


export const updateUser = async (req, res) => {
    const { _id, name, email, phone } = req.body;
    try {
        if (name || !_id) {

            return res
                .status(400)
                .json({
                    error: true,
                    message: "all fields are required!",
                    // data: null,
                });
        }
        const user = await User.findById(_id);
        if (!user) {
            return res
                .status(400)
            json("no user found")
        }

        user.name = name;
        user.phon = phone
        user.email = email;

        const updateUser = await user.save();
        return res.json(user)
    }
    catch (err) {
        return res.status(400).send({ type: "An error occurred while in  updateUser", message: err.message });

    }
};



export const findUserById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(404).send({ type: "An error occurred while in get all users", message: err.message });
    try {
        let user = User.findOne(id)

        if (!user)
            return res.status(400).json({ message: 'user not found' })

        return res.json(user)
    }
    catch (err) {
        return res.status(400).send({ type: "An error occurred while in findUserById ", message: err.message });

    }

};
