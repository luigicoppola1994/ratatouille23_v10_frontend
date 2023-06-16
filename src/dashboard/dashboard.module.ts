/* eslint-disable prettier/prettier */
import { DashboardController } from './dashboard.controller';
import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module';
import { Passport } from 'passport';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [AuthModule, PassportModule],
    controllers: [DashboardController],
    providers: [],
})
export class DashboardModule { }
