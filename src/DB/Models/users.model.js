import { DataTypes } from "sequelize";
import { sequelize } from "../db.connection.js";


export const usersModel=sequelize.define("users",
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING(50),
            allowNull:false,
            validate:
            {
                checkNameLength(value)
                {
                     if (value.length <= 2) {
                  throw new Error("Name must be greater than 2 characters");
               }

                }
            }

        },
        email:{
            type:DataTypes.STRING(100),
            allowNull:false,
            unique:true,
            validate: {
              isEmail: {
               msg: "Please enter a valid email"
                   }
                }
            },
        password:{
            type:DataTypes.STRING(50),
            allowNull:false,
            validate:{
                checkPasswordLength(value) {
                 if (value.length <= 6) {
                  throw new Error("Password must be greater than 6 characters",{cause:{status:400}});
               }
                }
            }
        },
        role:{
            type:DataTypes.ENUM(['admin','user']),
            defaultValue:"user"
        }

    },
    {
        freezeTableName:true,
       // paranoid:true,
        hooks: {
        beforeCreate(users) {
            if (users.name.length <= 2) {
                throw new Error("Name must be greater than 2 characters",{cause:{status:400}});
            }
        }
    }
    });