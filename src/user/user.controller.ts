import { Controller, Post, UseGuards, Request, Response, Body, Get, Res, Param, Query, Render, Redirect, Delete } from "@nestjs/common";
import { UserService } from './user.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';


@Controller()
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get('/api/user/:email')
    async getUserData(@Param("email") email : string){
        return this.userService.getUserData(email)
    }

    @UseGuards(AuthenticatedGuard)
    @Get('/api/get/all/user')
    async getUsers(@Request() req){
        return this.userService.getUsers(req.user)
    }

  
    @UseGuards(AuthenticatedGuard)
    @Delete('/api/user/:idOp')
    async deleteOp(@Param("idOp") idOp: Number, @Request() req){
        return this.userService.deleteOp(idOp, req.user)
    }


    

    






}
