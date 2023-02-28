import { Controller, Post, UseGuards, Request, Response, Body, Get, Res, Param, Query, Render, Redirect } from "@nestjs/common";
import { DishService } from './dish.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { DishRequestDto } from "./dish.request.dto";


@Controller()
export class DishController {

    constructor(private readonly dishService: DishService){}

    @UseGuards(AuthenticatedGuard)
    @Post('api/dish/add')
    async addDish(@Body() dishDto: DishRequestDto, @Request() req) {
        return this.dishService.addDish(dishDto, req.user)
    }











}
