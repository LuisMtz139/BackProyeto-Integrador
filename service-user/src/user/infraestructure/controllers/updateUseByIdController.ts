import { Request, Response } from "express";
import { UpdateUserByIdUseCase } from "../../application/updateUserByIdUseCase";
import { UploadedFile } from "express-fileupload";
import uploadToFirebase from "../../../helpers/saveImages";




export class UpdateUserByIdController {
    constructor(readonly updateUserByIdUseCase: UpdateUserByIdUseCase) { }
    async run(req: Request, res: Response) {
        try {

            let {
                uuid,
                name,
                email,
                phone_number,
            } = req.body


            let UpdateUserById = await this.updateUserByIdUseCase.run(uuid, name, email, phone_number,)
            console.log(UpdateUserById)
            if (UpdateUserById) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        update_user: UpdateUserById
                    }
                })
            } 

        } catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            }
            console.log('aqui el error que quiero',error)
            return res.status(500).send({
                status: "error",
                message: ("An error occurred while update the user." + error)
            });
        }
    }
}