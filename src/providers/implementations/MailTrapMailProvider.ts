import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer'
import { isExpressionWithTypeArguments } from "typescript";

export class MailTrapMailProvider implements IMailProvider {

    private transporter;

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: 'smtp',
            port: 2525,
            auth: {
                user: 'baba',
                pass: '1222'
            }
        })
    }

    async sendMail(message: IMessage): Promise<void> {

       await this.transporter.sendMail({
           to: {
               name: message.to.name,
               adress: message.to.email
           },

           from: {
               name: message.from.name,
               adress: message.from.email
           },

           subject: message.subject,
           html: message.body
       })
    }
    
}