import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get('api/user/:email')
    async getUserData(@Param("email") email : string){
        return this.userService.getUserData(email)
    }






}
