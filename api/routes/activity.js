import express from "express";
import { addAtividades, deleteAtividades, getAtividades, updateAtividades } from "../controllers/atividades.js";

const router = express.Router()

router.get("/", getAtividades)

router.post("/", addAtividades) 

router.put("/:id", updateAtividades)

router.delete("/:id", deleteAtividades)

export default router