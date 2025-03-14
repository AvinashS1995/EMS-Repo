import User from './../Models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Login = async (req, res) => {

    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            res.status(404).json({
                status: "fail",
                message: "User Not Found..!"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(404).json({
                status: "fail",
                message: "Wrong Password..!"
            })
        }

        const token = jwt.sign({_id: user._id, role: user.role},
            process.env.JWT_SECRET_KEY, {expiresIn: "10d"}
        )

        res.status(200).json({
            status: "success",
            message: "Login Successfully..!",
            token,
            user: {
                _id: user._id,
                name: user.name,
                role: user.role
            }
        });


    } catch (error) {
        console.log(error.message);
        
    }
}

const VerifyEmail = async (req, res) => {

    try {

        const {email} = req.body;
        const user = await User.findOne({email});
        // console.log("Email--", user)

        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "Email Not Found..!"
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Valid Email Fetched Successfully!",
            user: {
                _id: user._id,
                name: user.name,
                role: user.role
            }
        });

        
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error.message
        })
    }
}

export { Login , VerifyEmail}