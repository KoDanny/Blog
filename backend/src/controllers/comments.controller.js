const { Comment, Post } = require('../models');

// Add
async function addComment(postId, comment) {
	const newComment = await Comment.create(comment);
	await Post.findByIdAndUpdate(postId, { $push: { comments: newComment } });

	await newComment.populate('author');

	return newComment;
}
// Delete

async function deleteComment(postId, commentId) {
	await Comment.deleteOne({ _id: commentId });
	await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
}

module.exports = {
	addComment,
	deleteComment,
};
