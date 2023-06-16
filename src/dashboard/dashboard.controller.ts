/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Redirect, Render, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { LoginAuthGuard } from 'src/auth/login.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
@Controller()
export class DashboardController { 


   

    @Get()
    @Redirect('/register')

    @Get('/register')
    @Render('register')
    async register() { return }

    
    @Get('/login')
    @Render('login')
    async login() { return }

    @UseGuards(AuthenticatedGuard)
    @Get('/dashboard')
    @Render('dashboard')
    async dashboard(@Request() request) { 
      console.log(request.user); // Controlla il valore di request.user
      return }

    @UseGuards(AuthenticatedGuard)
    @Get('/dipendenti')
    @Render('dipendenti')
    async dipendenti() { return }

    @UseGuards(AuthenticatedGuard)
    @Get('/attivita')
    @Render('attivita')
    async attivita() { return }


    @UseGuards(AuthenticatedGuard)
    @Get('/ordinazioni')
    @Render('ordinazioni')
    async ordinazioni() { return }

   
    /* @Get('/validate/:token')    
    @Render('validate')
    async validate(@Param() token : string) { 
        return token
     }*/

     @Get('/validate')    
     @Render('validate')
     async validate() { return }


     @UseGuards(AuthenticatedGuard)
     @Get('/menu')    
     @Render('menu')
     async menu() { return }

     @Get('enable')
     @Render('enable')
     async enable(@Param() token : string){
        return token
     }

     @UseGuards(AuthenticatedGuard)
     @Get('/portate')    
     @Render('portate')
     async portate() { return }

     @UseGuards(AuthenticatedGuard)
     @Get('/cart')    
     @Render('cart')
     async cart() { return }

     @Get('/pdf')    
     @Render('pdf')
     async pdfGenerate() { return }


}
