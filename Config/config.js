import { config } from "dotenv";
import {resolve} from "node:path"
const NODE_ENV=process.env.NODE_ENV;


const envPath={
    development:".env.development",
    production:".env.production"
}
config({path: resolve(`./Config/${envPath[NODE_ENV]}`)});
export const port=process.env.PORT||7000;


