import express from "express"
import {addProduct} from "../controllers/addProduct"
import { updateProduct } from "../controllers/updateProduct"
import { getProduct } from "../controllers/getProduct"

const router = express.Router()

router.post("/addProduct", addProduct)
router.put("/updateProduct/:productId", updateProduct)
router.get("/getProduct/:productId", getProduct)


export default router