const express = require("express");
const multer  = require('multer');
const path = require("path");
const blogRoute = express.Router();
const { getAddBlogPage, createBlog, getBlogById, createComment } = require('../controllers/blogControllers');
const { checkAuthenticationCookie } = require("../middlewares/checkAuthentication");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./images/uploads/`));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});
  
const upload = multer({ storage: storage });

blogRoute.get('/addblog', checkAuthenticationCookie, getAddBlogPage);
blogRoute.post('/addblog', checkAuthenticationCookie, upload.single('coverImage'), createBlog);
blogRoute.get('/:id', checkAuthenticationCookie, getBlogById);

blogRoute.post('/comment/:blogId', checkAuthenticationCookie, createComment);

module.exports = blogRoute;