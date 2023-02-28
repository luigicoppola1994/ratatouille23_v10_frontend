import { Module } from '@nestjs/common';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { LocalStrategy } from 'src/auth/local.strategy';
import { SessionSerializer } from 'src/auth/session.serializer';

@Module({
  imports: [
    HttpModule,
    PassportModule,
    AuthModule
],
  controllers: [DishController],
  providers: [DishService, ConfigService,AuthService,LocalStrategy,SessionSerializer],
  exports: [DishModule]
})
export class DishModule {}

