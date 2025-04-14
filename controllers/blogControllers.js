const Blog = require('../models/blog');
const Comment = require('../models/comment');

const getAddBlogPage = (req, res)=>{
    return res.render('addBlogPage', {error: null});
}

const createBlog = async(req, res)=>{
    try{
        const {title, content} = req.body;
    if (!title || !content ){
        return res.render('addBlogPage', {error: "Enter all details"});
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : '/uploads/defaultImgBlog.jpg';

    const newBlog = await Blog.create({
        title,
        content, 
        author: req.user.userId,
        coverImage: imagePath
    });

    return res.redirect(`/blog/${newBlog._id}`);

    }catch(error){
        res.render('addBlogPage', {error: 'Error in creating a new blog post'});
    }
    
}

const getBlogById = async(req, res)=>{
    try{
        const blog = await Blog.findById(req.params.id).populate('author');
        if (!blog){
            return res.render('/', {error: "Error in rendering the blog"});
        }
        
        const comments = await Comment.find({blogId: req.params.id}).populate('author');
        if (!comments){
            return res.render('/', {error: "Error in rendering the comments"});
        }

        return res.render('blog', {user: req.user, blog: blog, comments: comments, error: null});
    }catch(error){
        return res.render('/', {error: "Error in rendering the blog"});
    }
}

const createComment = async (req, res)=>{
        const {content} = req.body; 
        console.log(req.body.content);
        const comment = await Comment.create({
            content,
            blogId: req.params.blogId,
            author: req.user.userId
        });

        return res.redirect(`/blog/${req.params.blogId}`);
}

module.exports = {
    getAddBlogPage,
    createBlog,
    getBlogById,
    createComment
}