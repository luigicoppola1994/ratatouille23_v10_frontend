/* eslint-disable prettier/prettier */
import { Controller, Post, UseGuards, Request, Response, Body, Get, Res, Param, Query, Render, Redirect } from "@nestjs/common";
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
    @Post('auth/login')
    async login(@Request() req) {
        return
    }

    @Post('auth/signup/')
    async register(@Body() signupDto: SignupRequestDto) {
        return this.authService.register(signupDto)
    }

    @UseGuards(AuthenticatedGuard)
    @Post('auth/signup/op')
    async registerOp(@Body() signupDto: SignupOpRequestDto, @Request() req) {
        return this.authService.registerOp(signupDto, req.user)
    }

    @UseGuards(AuthenticatedGuard)
    @Post('api/restaurant')
    async registerActivity(@Body() signupDto: SignupOpRequestDto, @Request() req) {
        return this.authService.registerActivity(signupDto, req.user)
    }



    


    @UseGuards(AuthenticatedGuard)
    @Post('/api/auth/signup/op/resetpassword')
    async resetPsw(@Body() password: resetRequestDto, @Request() req){
        return this.authService.resetPsw(password, req.user)

    }

      
    @Get('/api/auth/validate/user/:token')
    async enableUser(@Param("token") token : string){
        return this.authService.enableUser(token)

    }



    
    

    




    @Get("pdf/download")
    async downloadPDF(@Res() res) : Promise<void>{
        const buffer = await this.authService.createPdf();

        res.set({
            'Content-type': 'application/pdf',
             'Content-Disposition' : 'attachment; filename-example.pdf',
             'Content-Lenght': buffer.length,

        })

        res.end(buffer)
    }



    
}