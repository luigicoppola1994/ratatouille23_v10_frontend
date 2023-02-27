/* eslint-disable prettier/prettier */
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { SessionSerializer } from './session.serializer';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        HttpModule,
        PassportModule
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        ConfigService,
        SessionSerializer,
        LocalStrategy
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule { }
