import express from "express";
import { addUsuario, getUsuario } from "../controllers/usuarios.js";

const router = express.Router()

router.get("/", getUsuario)

router.post("/", addUsuario) 


export default router