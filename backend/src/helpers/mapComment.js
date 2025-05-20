module.exports = function (comment) {
	console.log(comment);
	return {
		content: comment.content,
		author: comment.author.login,
		id: comment._id,
		publishedAt: '2025-05-17T11:47:51.190Z',
	};
};
