/* eslint-disable prettier/prettier */
import { Controller, Post, UseGuards, Request, Response, Body, Get, Res, Param, Query, Render, Redirect,Delete } from "@nestjs/common";
import { AuthenticatedGuard } from "./authenticated.guard";
import { LoginAuthGuard } from './login.auth.guard';
import { AuthService } from './auth.service';
import { SignupRequestDto } from './signup.request.dto';
import { SignupOpRequestDto } from "./signup.op.request.dto";
import { resetRequestDto } from "./auth.op.resetpsw";


@Controller()
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @UseGuards(LoginAuthGuard)
    @Post('/api/auth/login')
    async login(@Request() req) {
        return
    }

    @Post('/auth/signup')
    async register(@Body() signupDto: SignupRequestDto) {
        return this.authService.register(signupDto)
    }

    @UseGuards(AuthenticatedGuard)
    @Post('/auth/signup/op')
    async registerOp(@Body() signupDto: SignupOpRequestDto, @Request() req) {
        return this.authService.registerOp(signupDto, req.user)
    }

    @UseGuards(AuthenticatedGuard)
    @Post('/restaurant')
    async registerActivity(@Body() signupDto: SignupOpRequestDto, @Request() req) {
        return this.authService.registerActivity(signupDto, req.user)
    }



    
   

    @UseGuards(AuthenticatedGuard)
    @Post('/api/auth/signup/op/resetpassword')
    async resetPsw(@Body() password: resetRequestDto, @Request() req){
        return this.authService.resetPsw(password, req.user)

    }

      
    @Get('/api/auth/validate/user/:token')
    @Render('enable')
    async enableUser(@Param("token") token : string){
        return this.authService.enableUser(token)

    }


    @UseGuards(AuthenticatedGuard)
    @Get('/api/restaurant/users/SUPERVISOR')
    async createListOp(@Request() req){
        return this.authService.createListOp(req.user)
    }





    
    

    




    


    
}