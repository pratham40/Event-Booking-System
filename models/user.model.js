import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const User = sequelize.define('User',{
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    role:{
        type:DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user',
    }
},{timestamps:true});

User.beforeCreate(async function(user) {
    user.password = await bcrypt.hash(user.password,10);
})

User.prototype.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

User.prototype.generateToken =async function () {
    return jwt.sign({
        id:this.id,
        email:this.email,
        role:this.role
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

export default User;