import express from "express";
import {
    deleteFileController,
    createNoteController,
    updateNoteController,
    getNoteByUserController
     } from "./dependencies";
import { Request, Response } from "express";
import { validateToken } from "../../helpers/veryfyToken";



export const 
noteRoutes = express.Router();

noteRoutes.get('/rutine/', (req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutada con éxito');
})

noteRoutes.delete('/:uuid',validateToken,deleteFileController.delete.bind(deleteFileController))

noteRoutes.post('/create/',validateToken,createNoteController.post.bind(createNoteController))

noteRoutes.put('/update/',validateToken,updateNoteController.update.bind(updateNoteController))

noteRoutes.get('/:folder_uuid',validateToken,getNoteByUserController.get.bind(getNoteByUserController)) 























