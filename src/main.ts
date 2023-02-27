/* eslint-disable prettier/prettier */
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as passport from "passport";
import * as session from 'express-session';
import flash = require('connect-flash');
import { join } from 'path';
import { AppModule } from './app.module';
import "reflect-metadata";
import * as cookieParser from 'cookie-parser';



async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useStaticAssets(join(__dirname, '..', '/client/public'));
    app.setBaseViewsDir(join(__dirname, '..', '/client/views'));
    app.setViewEngine('ejs');

    const configService: ConfigService = app.get(ConfigService);

    app.use(
      session({
        secret: configService.getOrThrow('SESSION_SECRET'),
        resave: false,
        saveUninitialized: false,
      }),
    );

    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    await app.listen(3000);
}
bootstrap();
