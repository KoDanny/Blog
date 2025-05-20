export const sanitizeContent = (content) =>
	content
		.replaceAll('&nbsp;', ' ')
		.replaceAll('<br>', '\n')
		.replaceAll('<div>', '\n')
		.replaceAll('</div>', '');
