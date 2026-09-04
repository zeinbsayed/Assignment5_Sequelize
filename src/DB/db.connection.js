import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("socialApp", "root", "Zeinbzms@123", {
  host: "localhost",
  dialect: "mysql",
});

