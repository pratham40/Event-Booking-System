import User from "../models/user.model.js";

async function register(req,res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const role = req.body.role || 'user'; 
    try {
        const existingUser = await User.findOne({where:{email}})

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const newUser = await User.create({ email, password,role });
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "error registering user",
            error: error.message
        });
    }
}

async function login(req,res) {
    const { email , password } = req.body;
    

    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }
    
    const user = await User.findOne({ where: { email } });



    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const token = await user.generateToken();

    const options = {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 
    }

    res.cookie('token',token,options);

    return res.status(200).json({
        message: "Login successful",
        user: {
            id: user.id,
            email: user.email,
            role: user.role
        },
        token: token
    })

}

async function logout(req,res) {
    try {
        res.clearCookie('token')
        return res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error logging out",
            error: error.message
        });
    }
}



async function getProfile(req,res) {
    try {
        const user = req.user;

        return res.status(200).json({
            message: "Profile fetched successfully",
            user
        })

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching profile",
            error: error.message
        });
    }
}


export { register
    ,login,
    logout,
   getProfile 
 };