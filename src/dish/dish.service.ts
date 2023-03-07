import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CategoryRequestDto } from './category.request.dto';
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

    async getCategory(token: string): Promise<boolean> {
        let response: boolean | undefined = undefined
        this.logger.log("register() - incoming request with obj: " + JSON.stringify(token))
        const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }
        try {
            response = (await this.httpService.axiosRef.get("http://localhost:8080/api/category/all",config)).data
        } catch (error) {
            this.logger.error("register() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response
    }

    async addCategory(category : CategoryRequestDto, token: string): Promise<boolean> {
        let response: boolean | undefined = undefined
        this.logger.log("register() - incoming request with obj: " + JSON.stringify(category))
        const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }
        try {
            response = (await this.httpService.axiosRef.post("http://localhost:8080/api/category/add",category,config)).data
        } catch (error) {
            this.logger.error("register() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response
    }


    async createListAllergens(token: string): Promise<boolean> {
        let response: boolean | undefined = undefined
        this.logger.log("creaLista() - incoming request with obj: " + JSON.stringify(token))
        const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }
        
        try {
            response = (await this.httpService.axiosRef.get("http://localhost:8080/api/allergens/all",config)).data
        } catch (error) {
            this.logger.error("register() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response
    }




    async generateListDishes(token: string): Promise<boolean> {
        let response: boolean | undefined = undefined
        this.logger.log("creaLista() - incoming request with obj: " + JSON.stringify(token))
        const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }
        
        try {
            response = (await this.httpService.axiosRef.get("http://localhost:8080/api/dish/all",config)).data
        } catch (error) {
            this.logger.error("register() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response
    }



    async getCategoryById(categoryId: Number, token: string): Promise<boolean> {
        let response: boolean | undefined = undefined
        this.logger.log("creaLista() - incoming request with obj: " + JSON.stringify(categoryId))
        const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }
        
        try {
            response = (await this.httpService.axiosRef.get("http://localhost:8080/api/category/"+categoryId,config)).data
        } catch (error) {
            this.logger.error("register() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response
    }


    async addPriority(id: Number, categoriaDto: CategoryRequestDto, token: string): Promise<boolean> {
        let response: boolean | undefined = undefined
        this.logger.log("creaLista() - incoming request with obj: " + JSON.stringify(id))
        const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }
        
        try {
            response = (await this.httpService.axiosRef.post("http://localhost:8080/api/category/priority/add/"+id,categoriaDto,config)).data
        } catch (error) {
            this.logger.error("register() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response
    }



    async generateListDishesAllergens(token: string): Promise<boolean> {
        let response: boolean | undefined = undefined
        this.logger.log("creaLista() - incoming request with obj: " + JSON.stringify(token))
        const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }
        
        try {
            response = (await this.httpService.axiosRef.get("http://localhost:8080/api/dishallergens/all",config)).data
        } catch (error) {
            this.logger.error("register() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response
    }

    async getDishesByCategoryId(categoryId: Number, token: string): Promise<boolean> {
        let response: boolean | undefined = undefined
        this.logger.log("creaLista() - incoming request with obj: " + JSON.stringify(categoryId))
        const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }
        
        try {
            response = (await this.httpService.axiosRef.get("http://localhost:8080/api/dish/category/"+categoryId,config)).data
        } catch (error) {
            this.logger.error("register() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response
    }



}
