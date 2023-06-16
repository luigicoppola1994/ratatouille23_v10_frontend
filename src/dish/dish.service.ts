import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CategoryRequestDto } from './category.request.dto';
import { DishRequestDto } from './dish.request.dto';
import { CartRequestDto } from './cart.request.dto';
import { TableRestaurantDto } from './tables.dto';
import { AllergensRequestDto } from './allergens.request.dto';
import { menuDto } from './menu.dto';

@Injectable()
export class DishService {

    private readonly AUTH_ADD_DISH: string
    private readonly HOST_BACKEND: string
    private readonly logger = new Logger(DishService.name)

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ){
        
        this.AUTH_ADD_DISH = this.configService.getOrThrow('AUTH_ADD_DISH'),
        this.HOST_BACKEND = this.configService.getOrThrow('HOST_BACKEND')

        
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
            response = (await this.httpService.axiosRef.post(this.HOST_BACKEND+"/api/dish/add",dish,config)).data
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
            response = (await this.httpService.axiosRef.get(this.HOST_BACKEND+"/api/category/all",config)).data
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
            response = (await this.httpService.axiosRef.post(this.HOST_BACKEND+"/api/category/add",category,config)).data
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
            response = (await this.httpService.axiosRef.get(this.HOST_BACKEND+"/api/allergens/all",config)).data
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
            response = (await this.httpService.axiosRef.get(this.HOST_BACKEND+"/api/dish/all",config)).data
        } catch (error) {
            this.logger.error("generaListDishes() - error: " + JSON.stringify(error))
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
            response = (await this.httpService.axiosRef.get(this.HOST_BACKEND+"/api/category/"+categoryId,config)).data
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
            response = (await this.httpService.axiosRef.post(this.HOST_BACKEND+"/api/category/priority/add/"+id,categoriaDto,config)).data
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
            response = (await this.httpService.axiosRef.get(this.HOST_BACKEND+"/api/dishallergens/all",config)).data
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
            response = (await this.httpService.axiosRef.get(this.HOST_BACKEND+"/api/dish/category/"+categoryId,config)).data
        } catch (error) {
            this.logger.error("register() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response
    }


    async getListTables(token: string): Promise<boolean>{
        let response: boolean | undefined = undefined
        this.logger.log("creaListaTavoli() - incoming request with obj: " + JSON.stringify(token))
        const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }
        
        try {
            response = (await this.httpService.axiosRef.get(this.HOST_BACKEND+"/api/tablerestaurant/all",config)).data
        } catch (error) {
            this.logger.error("getListTables() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response

    }


    async addOrder(idTavolo: Number, cartDto: CartRequestDto, token: string): Promise<boolean> {
        let response: boolean | undefined = undefined
        this.logger.log("addOrder() - incoming request with obj: " + JSON.stringify(idTavolo))
        const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }
        try {
            response = (await this.httpService.axiosRef.post(this.HOST_BACKEND+"/api/cart/add/table/"+idTavolo,cartDto,config)).data
        } catch (error) {
            this.logger.error("addOrder() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response
    }


    async getCartAll(token: string): Promise<boolean>{
        let response: boolean | undefined = undefined
        this.logger.log("getCartAll() - incoming request with obj: " + JSON.stringify(token))
        const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }
        
        try {
            response = (await this.httpService.axiosRef.get(this.HOST_BACKEND+"/api/cart/all",config)).data
        } catch (error) {
            this.logger.error("cart() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response

    }



    async getBillAll(token: string): Promise<boolean>{
        let response: boolean | undefined = undefined
        this.logger.log("getBill() - incoming request with obj: " + JSON.stringify(token))
        const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }
        
        try {
            response = (await this.httpService.axiosRef.get(this.HOST_BACKEND+"/api/cart/bill/all",config)).data
        } catch (error) {
            this.logger.error("register() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response

    }


    async getCartDishAll(token: string): Promise<boolean>{
        let response: boolean | undefined = undefined
        this.logger.log("getBill() - incoming request with obj: " + JSON.stringify(token))
        const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }
        
        try {
            response = (await this.httpService.axiosRef.get(this.HOST_BACKEND+"/api/cartdish/all",config)).data
        } catch (error) {
            this.logger.error("bill() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response

    }

    async closeOrder(idCart: Number, token: string): Promise<boolean>{
        let response: boolean | undefined = undefined
        this.logger.log("closeOrder() - incoming request with obj: " + JSON.stringify(token))
        const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }
        
        try {
            response = (await this.httpService.axiosRef.put(this.HOST_BACKEND+"/api/cart/close/"+idCart,null,config)).data
        } catch (error) {
            this.logger.error("closeOrder() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response

    }

   

    async addTable(table: TableRestaurantDto, token: string): Promise<boolean> {
        let response: boolean | undefined = undefined
        this.logger.log("addTable() - incoming request with obj: " + JSON.stringify(table))
        const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }
        try {
            response = (await this.httpService.axiosRef.post(this.HOST_BACKEND+"/api/tablerestaurant/add",table,config)).data
        } catch (error) {
            this.logger.error("addTable() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response
    }

    async addMenu(menu: menuDto, token: string): Promise<boolean> {
        let response: boolean | undefined = undefined
        this.logger.log("addTable() - incoming request with obj: " + JSON.stringify(menu))
        const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }
        try {
            response = (await this.httpService.axiosRef.post(this.HOST_BACKEND+"/api/menu/add",menu,config)).data
        } catch (error) {
            this.logger.error("addMenu() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response
    }



    async addAllergensDb(allergen: AllergensRequestDto, token: string): Promise<boolean> {
        let response: boolean | undefined = undefined
        this.logger.log("addTable() - incoming request with obj: " + JSON.stringify(allergen))
        const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }
        try {
            response = (await this.httpService.axiosRef.post(this.HOST_BACKEND+"/api/allergens/add",allergen,config)).data
        } catch (error) {
            this.logger.error("addTable() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response
    }

    async deleteDish(idDish : Number, token: string): Promise<boolean>{
        let response: boolean | undefined = undefined
        
        this.logger.log("deleteDish() - incoming request with obj: " + JSON.stringify(token))
        const config = {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }
        
        try {
            response = (await this.httpService.axiosRef.delete(this.HOST_BACKEND+"/api/dish/"+idDish,config)).data
        } catch (error) {
            this.logger.error("deleteDish() - error: " + JSON.stringify(error))
            throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return response
    
    }
    
   

    

}
