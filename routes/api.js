const express = require('express');
const Blog = require('../models/blogModel');
const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const blogs = await Blog.find();
        if (!blogs) {
            return res.status(404).json({message: "Blogs not found"});
        }
        res.status(200).json(blogs);
        res.send(blogs);
    } catch (error) {
        console.error('Error retrieving blogs', error);
    }
})

router.get('/:id', async(req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({message: "Blog not found"});
        }
        res.status(200).json(blog);
    } catch (error) {
        console.log('Error retrieving the blog', error);
    }
})

router.post('/create', async(req, res) => {
    const {title, text} = req.body;
    try {
        if (!title && !text) {
            return res.status(404).json({message: "Not found"});
        }
        const newBlog = new Blog({
            title,
            text,
        })
        await newBlog.save();
        res.status(200).json({message: "Blog created succesfully"})
    } catch (error) {
        console.error('Error creating the blog', error);
    }
})

router.post('/:id/update', async(req, res) => {
    const {title, text} = req.body;
    const blogId = req.params.id;
    try {
        if (!title && !text) {
            return res.status(404).json({message: "Not found"});
        }
        await Blog.findByIdAndUpdate(blogId, {title, text});
        res.status(200).json({message: "Blog updated succesfully"})
    } catch (error) {
        console.error('Error updating the blog', error);
    }
})

router.post('/:id/delete', async(req, res) => {
    const blogId = req.params.id;
    try {
        await Blog.findByIdAndDelete(blogId);
        res.status(200).json({message: "Blog deleted succesfully"})
    } catch (error) {
        console.error('Error deleting the blog', error);
    }
})

module.exports = router;