import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";
const Event = sequelize.define('Event',{
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    location:{
        type:DataTypes.STRING,
        allowNull:false
    },
    totalSeats:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    availableSeats:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
},{timestamps:true});


export default Event;