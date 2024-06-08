import TelegramBot from 'node-telegram-bot-api';

export default class Bot {
	private static _instance: TelegramBot;

	static getInstance() {
		if (this._instance) {
			return this._instance;
		}

		this._instance = new TelegramBot(process.env.API_KEY_BOT, {
			polling: true,
		});

		return this._instance;
	}

	static initCommands() {
		const commands = [];

		this.getInstance().setMyCommands(commands);
	}

	static initListeners() {
		this.getInstance().onText(/^\/start$/, (message) => {
			const {
				id: chatId,
				username,
				first_name: firstName,
			} = message.chat;

			console.info(`${ username }: ${ chatId }`);

			const replyMessage = `*Приветствую в нашем магазине, ${ firstName }.*\n\n
			Чтобы посмотреть весь ассортимент и выбрать то, что Вам точно понравится, откройте каталог!\n\n
			*Приятных покупок!*
			\n\n👇🏼👇🏼👇🏼👇🏼`;

			this.sendMessage(chatId, replyMessage);
		});
	}

	static sendMessage(chatId: number, text: string) {
		return this.getInstance().sendMessage(chatId, text, {
			parse_mode: 'Markdown',
		}).then((message) => message);
	}

	static sendButton(chatId: number, text: string, onSubmitActionType: string) {
		return this.getInstance().sendMessage(chatId, text, {
			parse_mode: 'Markdown',
			reply_markup: {
				inline_keyboard: [ [ {
					text: 'Да',
					callback_data: onSubmitActionType,
				}, {
					text: 'Нет',
					callback_data: 'cancel',
				} ] ],
			},
		}).then((message) => message);
	}

	static sendForm(chatId: number, text: string, webAppUrl: string) {
		return this.getInstance().sendMessage(chatId, text, {
			reply_markup: {
				inline_keyboard: [ [ {
					text: 'Открыть',
					web_app: { url: webAppUrl },
				} ] ],
			},
		}).then((message) => message);
	}

	static deleteMessage(chatId: number, messageId: number) {
		return this.getInstance().deleteMessage(chatId, messageId);
	}

	static sendSelfDeletingMessage(chatId: number, text: string, delay: number = 0.1) {
		this.sendMessage(chatId, text).then((message) => {
			setTimeout(() => {
				this.deleteMessage(chatId, message.message_id);
			}, delay * 60 * 1000);
		});
	}

	static sendSelfDeletingMessageWithPrevious(chatId: number, text: string, delay: number = 0.1) {
		this.sendMessage(chatId, text).then((message) => {
			setTimeout(() => {
				this.deleteMessage(chatId, message.message_id);
				this.deleteMessage(chatId, message.message_id - 1);
			}, delay * 60 * 1000);
		});
	}
}
