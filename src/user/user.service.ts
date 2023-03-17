
import { UserRoles } from 'src/utils';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserRequestDto } from './user.request.dto';



@Injectable()
export class UserService {

    private readonly logger = new Logger(UserService.name)

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ){

        //qui posso dichiarare variabili
    }

   async getUserData(email: string) : Promise<boolean> {
      



    let response: boolean | undefined = undefined
        this.logger.log("Sono byemail() - incoming request with obj: " + JSON.stringify(email))
                
        try {
            response = (await this.httpService.axiosRef.get("http://localhost:8080/api/user/"+email,null)).data
            console.log(response)
        } catch (error) {
            this.logger.error("Sono byemail() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response
   }


   async getUsers(token: string): Promise<boolean>{
    let response: boolean | undefined = undefined
    
    this.logger.log("getUsers() - incoming request with obj: " + JSON.stringify(token))
    const config = {
        headers: {
          Authorization: 'Bearer ' + token,
        }
    }
    
    try {
        response = (await this.httpService.axiosRef.get("http://localhost:8080/api/user",config)).data
    } catch (error) {
        this.logger.error("getUsers() - error: " + JSON.stringify(error))
        throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return response

}

   



    
   }






