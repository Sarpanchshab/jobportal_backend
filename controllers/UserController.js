const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {

    static getuser = async (req, res) => {
        try {
            const { id } = req.userdata //req.user data auth se aarha hai
            // console.log(id)
            const data = await UserModel.findById(id)
            res.status(201).json(data)
        } catch (error) {
            console.log(error)
            res.status(400).json({ status: "failed", message: error.message })
        }
    }

    static registerUser = async (req, res) => {
        try {
            const { name, email, phone, password, confirmpassword, role } = req.body
            const user = await UserModel.findOne({ email: email })
            if (user) {
                res.status(401).json({ status: "failed", message: "Email Already Exists" })
            } else {
                if (name && email && phone && password && confirmpassword && role) {
                    if (password == confirmpassword) {
                        const hashPassword = await bcrypt.hash(password, 10)
                        const result = new UserModel({
                            name: name,
                            email: email,
                            phone: phone,
                            password: hashPassword,
                            role: role
                        })
                        await result.save()
                       // console.log(req.body)
                        //Generate Token
                        const token = jwt.sign({
                            userId: result._id,
                        },
                            'jaishreeram')

                        res.status(201).cookie("token", token).json({
                            status: "success",
                            message: "Thanks For Registration",
                            token: token
                        });
                    } else {
                        res.status(401).json({ status: "failed", message: "Password & Confirm Password do not match" })
                    }
                } else {
                    res.status(401).json({ status: "failed", message: "All Fields are Required" })
                }
            }
        } catch (error) {
            console.log(error)
            res.status(401).json({ status: "error", error })
        }
    }


    static login = async (req, res) => {
        try {
            // console.log(req.body)
            const { email, password, role } = req.body
            const user = await UserModel.findOne({ email: email })
          // console.log(user)

            if (user != null) { //jab user me null nahi hai
                const ismatch = await bcrypt.compare(password, user.password)
                if (ismatch) {
                    if (user.role == role) {

                        //token generate
                        const token = jwt.sign({ Id: user._id }, 'jaishreeram')
                       // console.log(token)
                        res.cookie('token', token)
                        res.status(201).json({ status: "success", message: "Login Ok Report", token: token, user })

                    }
                    else {
                        res.status(401).json({ status: "failed", message: "User With this role not found" })
                    }
                }
                else {
                    res.status(401).json({ status: "failed", message: "Email & Password does not match" })
                }
            }
            else {
                res.status(401).json({ status: "failed", message: "You are not a register User" })
            }
        } catch (error) {
            console.log(error)
        }
    }


    static logout = async (req, res) => {
        try {
            // Assuming the token is stored in a cookie, you don't need to log the token here
            res.status(201)
                .cookie('token', "", {
                    httpOnly: true,
                    expires: new Date(Date.now()), // Expire immediately
                })
                .json({
                    success: true,
                    message: "Logout Successfully",
                });
        } catch (error) {
            console.log(error);
            res.status(401).json({
                status: "failed",
                message: error.message
            });
        }
    }

    
}


module.exports = UserController