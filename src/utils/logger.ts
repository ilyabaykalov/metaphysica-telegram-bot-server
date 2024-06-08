import morgan from 'morgan';

/** Перечень цветов для окрашивания логов */
export const logColors = {
	red: '\x1b[31m%s\x1b[0m',
	green: '\x1b[32m%s\x1b[0m',
	yellow: '\x1b[33m%s\x1b[0m',
	blue: '\x1b[34m%s\x1b[0m',
	purple: '\x1b[35m%s\x1b[0m',
	cyan: '\x1b[36m%s\x1b[0m',
};

/**
 * Логирование сообщения об успешном выполнении
 * @param {string} message текст лога
 * @param {string} textColor цвет текста лога
 */
export const success = (message: string, textColor: string = logColors.green) => {
	console.log(textColor, message);
};

/**
 * Логирование информационного сообщения
 * @param {string} message текст лога
 * @param {string} textColor цвет текста лога
 */
export const info = (message: string, textColor: string = logColors.blue) => {
	console.log(textColor, message);
};

/**
 * Логирование сообщения об ошибке
 * @param {string} message текст лога
 * @param {string} textColor цвет текста лога
 */
export const error = (message: string, textColor: string = logColors.red) => {
	console.log(textColor, message);
};

/** Очистка консоли */
export const clear = () => {
	console.clear();
};

/** Кастомизация логирования */
morgan.token('statusColor', (_, res) => {
	const status = res.statusCode;

	const color = status >= 500 ? 31
		: status >= 400 ? 33
			: status >= 300 ? 36
				: status >= 200 ? 32 : 0;

	return `\x1b[${ color }m${ status }\x1b[0m`;
});

morgan.token('address', (req) => {
	const address = `http://${ req.headers.host }`;

	return `\x1b[36m${ address }`;
});

export const logger = morgan('\x1b[33m:method\x1b[0m :address:url :statusColor – \x1b[35m:response-time ms\x1b[0m');
