
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { DishModule } from './dish/dish.module';
import { DishController } from './dish/dish.controller';
import { PassportModule } from '@nestjs/passport';
import { LoginAuthGuard } from './auth/login.auth.guard';



@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }), 
    PassportModule,DashboardModule, UserModule, DishModule
  ],
  controllers: [UserController], 
  providers: [LoginAuthGuard],
})
export class AppModule { }