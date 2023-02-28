/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Redirect, Render } from '@nestjs/common';

@Controller()
export class DashboardController { 
    @Get('/login')
    @Render('login')
    async login() { return }

    @Get('/register')
    @Render('register')
    async register() { return }

    @Get('/dashboard')
    @Render('dashboard')
    async dashboard() { return }

    @Get('/dipendenti')
    @Render('dipendenti')
    async dipendenti() { return }

    @Get('/attivita')
    @Render('attivita')
    async attivita() { return }



    @Get('/ordinazioni')
    @Render('ordinazioni')
    async ordinazioni() { return }

    @Get('/profilo')
    @Render('profilo')
    async profilo() { return }



    /* @Get('/validate/:token')    
    @Render('validate')
    async validate(@Param() token : string) { 
        return token
     }*/

     @Get('/validate')    
     @Render('validate')
     async validate() { return }

     @Get('/menu')    
     @Render('menu')
     async menu() { return }

     @Get('/provaselect')    
     @Render('provaselect')
     async provaselect() { return }
 


     @Get('enable/:token')
     @Render('enable')
     async enable(@Param() token : string){
        return token
     }




}
