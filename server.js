import  express from "express"
import colors from "colors"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors"
import categoryRoutes from "./routes/categoryRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js"
import Razorpay from "razorpay";

dotenv.config();
  
  connectDB();

 export const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes)
                                                                                      
// Razorypay Payment Gateway
app.use("/api", paymentRoutes)

app.get("/api/getkey", (req, res)=>
res.status(200).json({ key:process.env.RAZORPAY_API_KEY})       
);


 const PORT = process.env.PORT || 8080

 export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

app.listen(PORT, ()=>{
    console.log(`server is running on development mode ${PORT}`.bgCyan.white);
});