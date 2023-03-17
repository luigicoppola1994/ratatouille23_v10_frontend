import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { LocalStrategy } from 'src/auth/local.strategy';
import { SessionSerializer } from 'src/auth/session.serializer';
import { UserController } from './user.controller';

@Module({
  imports: [
    HttpModule,
    PassportModule,
    AuthModule
],
  controllers: [UserController],
  providers: [UserService, ConfigService,AuthService,LocalStrategy,SessionSerializer],
  
    exports: [
        UserService
        
    ]
})
export class UserModule { }

