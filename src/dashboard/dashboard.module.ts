/* eslint-disable prettier/prettier */
import { DashboardController } from './dashboard.controller';
import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [DashboardController],
    providers: [],
})
export class DashboardModule { }
