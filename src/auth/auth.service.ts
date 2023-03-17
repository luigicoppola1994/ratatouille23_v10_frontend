/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import { lastValueFrom, map } from 'rxjs';
import { resetRequestDto } from './auth.op.resetpsw';
import { AuthRequestDto } from './auth.request.dto';
import { SignupOpRequestDto } from './signup.op.request.dto';
import { SignupRequestDto } from './signup.request.dto';


@Injectable()
export class AuthService {
    private readonly AUTH_LOGIN_ENDPOINT: string
    private readonly AUTH_CHECK_TOKEN_ENDPOINT: string
    private readonly AUTH_ACTIVATE_ACCOUNT: string
    private readonly AUTH_ACTIVATE_ACCOUNT_OP: string
    private readonly AUTH_ACTIVATE_ACCOUNT_ACTIVITY: string
    private readonly logger = new Logger(AuthService.name)

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ){
        this.AUTH_LOGIN_ENDPOINT = this.configService.getOrThrow('AUTH_LOGIN_ENDPOINT')
        this.AUTH_CHECK_TOKEN_ENDPOINT = this.configService.getOrThrow('AUTH_CHECK_TOKEN')
        this.AUTH_ACTIVATE_ACCOUNT = this.configService.getOrThrow('AUTH_ACTIVATE_ACCOUNT')
        this.AUTH_ACTIVATE_ACCOUNT_OP = this.configService.getOrThrow('AUTH_ACTIVATE_ACCOUNT_OP')
        this.AUTH_ACTIVATE_ACCOUNT_ACTIVITY = this.configService.getOrThrow('AUTH_ACTIVATE_ACCOUNT_ACTIVITY')
    }

    async validate(user: AuthRequestDto): Promise<string> {
        let response: string | undefined = undefined
        this.logger.log("validate() - incoming request with email: " + user.email)
        try {
            response = (await this.httpService.axiosRef.post(this.AUTH_LOGIN_ENDPOINT, user)).data
        }
        catch(error) {
            this.logger.error("validate() - error: " + JSON.stringify(error))
            throw new UnauthorizedException()
        }
        return response
    }

    async check(token: string): Promise<boolean> {
        let response: any | undefined = undefined
        this.logger.log("check() - incoming request with token: " + token)
        try {
            response = (await this.httpService.axiosRef.get(this.AUTH_CHECK_TOKEN_ENDPOINT + "/" + token)).data
        }
        catch(error) {
            this.logger.error("check() - error: " + JSON.stringify(error))
            response = false
        }
        return response.data
    }

    async register(user: SignupRequestDto): Promise<boolean> {
        let response: boolean | undefined = undefined
        this.logger.log("register() - incoming request with obj: " + JSON.stringify(user))
        try {
            response = (await this.httpService.axiosRef.post(this.AUTH_ACTIVATE_ACCOUNT, user)).data
        } catch (error) {
            this.logger.error("register() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response
    }



    async registerOp(user: SignupOpRequestDto, token: string): Promise<boolean> {
        let response: boolean | undefined = undefined
        this.logger.log("register() - incoming request with obj: " + JSON.stringify(user))
        const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }
        try {
            response = (await this.httpService.axiosRef.post(this.AUTH_ACTIVATE_ACCOUNT_OP, user, config)).data
        } catch (error) {
            this.logger.error("register() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response
    }


    async resetPsw(password : resetRequestDto, token: string): Promise<boolean> {
        let response: boolean | undefined = undefined
        this.logger.log("register() - incoming request with obj: " + JSON.stringify(password))
        const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }
        
        try {
            response = (await this.httpService.axiosRef.post("http://localhost:8080/api/auth/signup/op/resetpassword/",password,config)).data
        } catch (error) {
            this.logger.error("register() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response
    }



    async enableUser(token: string): Promise<boolean> {
        let response: boolean | undefined = undefined
        this.logger.log("register() - incoming request with obj: " + JSON.stringify(token))
        
        
        try {
            response = (await this.httpService.axiosRef.get("http://localhost:8080/api/auth/validate/user/"+token)).data
        } catch (error) {
            this.logger.error("register() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response
    }





    



    async registerActivity(user: SignupOpRequestDto, token: string): Promise<boolean> {
        let response: boolean | undefined = undefined
        this.logger.log("register() - incoming request with obj: " + JSON.stringify(user))
        const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }
        try {
            response = (await this.httpService.axiosRef.post(this.AUTH_ACTIVATE_ACCOUNT_ACTIVITY, user, config)).data
        } catch (error) {
            this.logger.error("register() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response
    }


    

    async createListOp(token: string): Promise<boolean> {
        let response: boolean | undefined = undefined
        this.logger.log("creaLista() - incoming request with obj: " + JSON.stringify(token))
        const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }
        
        try {
            response = (await this.httpService.axiosRef.get("http://localhost:8080/api/restaurant/users/SUPERVISOR",config)).data
        } catch (error) {
            this.logger.error("register() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response
    }

    


  

}
