
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { DishModule } from './dish/dish.module';
import { DishController } from './dish/dish.controller';


@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }), 
    DashboardModule, UserModule, DishModule
  ],
  controllers: [UserController], 
  providers: [],
})
export class AppModule { }