export const searchPosts = (posts, searchPhrase) =>
	posts.filter(({ title }) => title.includes(searchPhrase));
