/**
 * Получение слова в правильном склонении
 * @param number число
 * @param words массив с 3 значениями (Склонение для 1, склонение для 2-4, склонение для 5)
 *
 * @return слово в правильном склонении
 * */
export const getDeclination = (number: number, words: string[]): string => {
	let absoluteNumber = Math.abs(number);

	absoluteNumber %= 100;
	if (absoluteNumber >= 5 && absoluteNumber <= 20) return words[2];

	absoluteNumber %= 10;
	if (absoluteNumber === 1) return words[0];

	if (absoluteNumber >= 2 && absoluteNumber <= 4) return words[1];

	return words[2];
};
