import express from "express";
import { addActivityController, deleteActivityController, listActivitysController, updateActivityControllr } from "./dependencies";
import { Request, Response } from "express";
export const activitRoutes  = express.Router();

activitRoutes.get('/rutine/', (req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutada con éxito');
})

activitRoutes.post("/", addActivityController.run.bind(addActivityController))

activitRoutes.delete("/",deleteActivityController.run.bind(deleteActivityController))

activitRoutes.put("/",updateActivityControllr.run.bind(updateActivityControllr))

activitRoutes.get("/",listActivitysController.run.bind(listActivitysController))
