import { User } from "../../entities/Users";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { ICrateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {

    constructor(
      private  userRepository: IUsersRepository, private mailProvider: IMailProvider
    ){}

    async excecute(data: ICrateUserRequestDTO){
        const userAlreadyExists = await this.userRepository.findByEmail(data.name);

        if(userAlreadyExists){
            throw new Error('User already exists.');
        }

        const user = new User(data);

        await this.userRepository.save(user);

        this.mailProvider.sendMail({
            to: {name: data.email, email: data.email},
            from: {name: "Equipe meu app", email: "naicson88@hotmail.com"},
            subject: 'Seja bem-vindo a plataforma.',
            body: '<b>Você ja pode fazer login na plataforma</b>'
        })

    }
}