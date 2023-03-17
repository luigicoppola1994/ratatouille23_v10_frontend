import { Controller, Post, UseGuards, Request, Response, Body, Get, Res, Param, Query, Render, Redirect } from "@nestjs/common";
import { DishService } from './dish.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { DishRequestDto } from "./dish.request.dto";
import { CategoryRequestDto } from "./category.request.dto";
import { AllergensRequestDto } from "./allergens.request.dto";
import { CartRequestDto } from "./cart.request.dto"


@Controller()
export class DishController {

    constructor(private readonly dishService: DishService){}

    @UseGuards(AuthenticatedGuard)
    @Post('api/dish/add')
    async addDish(@Body() dishDto: DishRequestDto, @Request() req) {
        return this.dishService.addDish(dishDto, req.user)
    }

    @UseGuards(AuthenticatedGuard)
    @Get('/api/allergens/all')
    async createListAllergens(@Request() req){
        return this.dishService.createListAllergens(req.user)
    }


    @UseGuards(AuthenticatedGuard)
    @Get('api/category/all')
    async getCategory(@Request() req) {
        return this.dishService.getCategory( req.user)
    }

    
    @UseGuards(AuthenticatedGuard)
    @Post('api/category/add')
    async addCategory(@Body() categoriaDto : CategoryRequestDto, @Request() req) {
        return this.dishService.addCategory( categoriaDto,req.user)
    }


    
    @UseGuards(AuthenticatedGuard)
    @Get('/api/dish/all')
    async generateListDishes(@Request() req) {
        return this.dishService.generateListDishes( req.user)
    }

    @UseGuards(AuthenticatedGuard)
    @Get('/api/category/:categoryId')
    async getCategoryById(@Param("categoryId") categoryId: Number, @Request() req){
        return this.dishService.getCategoryById(categoryId,req.user)
    }


    @UseGuards(AuthenticatedGuard)
    @Post('/api/category/priority/add/:id')
    async addPriority(@Param("id") id: Number,@Body() categoriaDto: CategoryRequestDto, @Request() req){
        return this.dishService.addPriority(id,categoriaDto,req.user)
    }



    @UseGuards(AuthenticatedGuard)
    @Get('/api/dishallergens/all')
    async generateListDishesAllergens(@Request() req) {
        return this.dishService.generateListDishesAllergens( req.user)
    }

    @UseGuards(AuthenticatedGuard)
    @Get('/api/dish/category/:id')
    async getDishesByCategoryId(@Param("id") id: Number, @Request() req){
        return this.dishService.getDishesByCategoryId(id,req.user)
    }

    @UseGuards(AuthenticatedGuard)
    @Get('/api/tablerestaurant/all')
    async getListTables(@Request() req) {
        return this.dishService.getListTables( req.user)
    }


    @UseGuards(AuthenticatedGuard)
    @Post('/api/cart/add/table/:idTavolo')
    async addOrder(@Param("idTavolo") idTavolo: Number, @Body() cartDto: CartRequestDto, @Request() req){
        return this.dishService.addOrder(idTavolo,cartDto,req.user)
    }


    @UseGuards(AuthenticatedGuard)
    @Get('/api/cart/all')
    async getCartAll(@Request() req) {
        return this.dishService.getCartAll( req.user)
    }


    @UseGuards(AuthenticatedGuard)
    @Get('/api/cart/bill/all')
    async getBillAll(@Request() req) {
        return this.dishService.getBillAll( req.user)
    }


    @UseGuards(AuthenticatedGuard)
    @Get('/api/cartdish/all')
    async getCartDishAll(@Request() req) {
        return this.dishService.getCartDishAll( req.user)
    }


    
    

    



}
