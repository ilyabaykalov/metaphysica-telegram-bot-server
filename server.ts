import express, { Application } from 'express';

import { resolve } from 'path';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';

import * as http from 'http';
import cors from 'cors';

import { config } from 'dotenv';

import { router } from '@router';

import { clear, info, logColors, logger } from '@logger';

import TelegramBot from '@bot';

export const app: Application = express();

config({ path: './.env' });

app.use(cors({ origin: '*' }));

app.use(express.static(resolve('public')));
app.use(favicon(resolve('public', 'favicon.ico')));
app.set('views', resolve('public'));
app.set('view engine', 'pug');

app.use(logger);

app.use(cookieParser());

app.use('/', router);

const server = http.createServer(app);

// if (process.env.HOST === '172.19.199.244') {
TelegramBot.initCommands();
TelegramBot.initListeners();
// }

server.listen(Number(process.env.PORT), process.env.HOST, () => {
	clear();

	info('✅ Metaphysica server is running\n', logColors.cyan);

	info(`Адрес сервера: ${ process.env.PROTOCOL }://${ process.env.HOST }:${ process.env.PORT }`, logColors.blue);
});
