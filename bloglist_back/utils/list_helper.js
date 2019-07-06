const _ = require('lodash');

const dummy = (blogs) => {
    console.log(456)
    return 1
}

const totalLikes = (blogs) => {
    let total = 0;
    blogs.map(blog => {
        total = total + blog.likes
    })
    return total
}

const favouriteBlog = (blogs) => {
    let favourite = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
    return favourite
}

const mostBlogs = (blogs) => {
    let authorArray = _.map(blogs, 'author')
    let mostDiligentAuthor = _.head(_(authorArray)
        .countBy()
        .entries()
        .maxBy(_.last));
    let maxBlogCount = authorArray.filter(author => author === mostDiligentAuthor).length
    console.log(mostDiligentAuthor, maxBlogCount);
    let favourite =
    {
        author: mostDiligentAuthor,
        blogs: maxBlogCount,
    }

    return favourite
}

const mostLikes = (blogs) => {
    let countsByAuthor = blogs.reduce((prev, curr) => {
        let count = prev.get(curr.author) || 0;
        prev.set(curr.author, curr.likes + count);
        return prev;
    }, new Map());
    console.log(countsByAuthor)
    let combinedByAuthor = [...countsByAuthor].map(([key, value]) => {
        return { key, value }
    })
    console.log(combinedByAuthor);

    const mostLikesBloggerMap = _.maxBy(combinedByAuthor, 'value');
    console.log(mostLikesBloggerMap);
    let mostLikesBlogger =
    {
        author: mostLikesBloggerMap.key,
        likes: mostLikesBloggerMap.value,
    }
    return mostLikesBlogger
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}