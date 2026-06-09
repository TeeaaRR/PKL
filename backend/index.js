import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";

dotenv.config();
import router from "./routes/index.js";
import db from "./config/Database.js";

const app = express();

//cek koneksi ke Database
try{
    await db.authenticate();
    console.log("Database terhubung");
    // await db.sync();
} catch(error){
    console.error(error);
}

//middleware
app.use(cors({
    credentials:true,
    origin: 'http://localhost:3000'}
    ));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.use(bodyParser.urlencoded({extended: true}));

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

//koneksi ke server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});