import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DishRequestDto } from './dish.request.dto';

@Injectable()
export class DishService {

    private readonly AUTH_ADD_DISH: string
    private readonly logger = new Logger(DishService.name)

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ){
        
        this.AUTH_ADD_DISH = this.configService.getOrThrow('AUTH_ADD_DISH')
    }


    async addDish(dish: DishRequestDto, token: string): Promise<boolean> {
        let response: boolean | undefined = undefined
        this.logger.log("register() - incoming request with obj: " + JSON.stringify(dish))
        const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }
        try {
            response = (await this.httpService.axiosRef.post("http://localhost:8080/api/dish/add",dish,config)).data
        } catch (error) {
            this.logger.error("register() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response
    }




}
