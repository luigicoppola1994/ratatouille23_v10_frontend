/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';


@Module({
    imports: [
        HttpModule,
        PassportModule
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService,
        ConfigService,
        
    ],
    exports: [
        UserService
        
    ]
})
export class UserModule { }






