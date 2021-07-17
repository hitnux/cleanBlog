const Blog = require('../models/Blog');

module.exports = app => {
    app.get('/', async  (req, res) => {
        const page = req.query.page || 1;   
        const postsPerPage = 2;   
        const totalPosts = await Blog.find({status : true}).countDocuments();
        const blogs = await Blog.find({status : true})
        .sort('-dateCreated')
        .skip((page-1) * postsPerPage) 
        .limit(postsPerPage);
        res.render('index', {
          blogs,
          current: page,
          next: parseInt(page)+1,
          pages: totalPosts/postsPerPage
        });
    });
    app.get('/post/:path', async  (req, res) => {
        const post = await Blog.findOne({path : req.params.path});
        res.render('post', {post});
    });
    app.post('/newpost', async (req, res) => { 
        req.body.path = req.body.title.replace(' ', '').toLowerCase();
        await Blog.create(req.body);
        res.redirect('/');
    });
    app.delete('/post/delete/:id', async (req, res) => { 
        await Blog.findByIdAndRemove(req.params.id);
        res.redirect('/');
    });
    app.get('/post/delete/:id', async (req, res) => { 
        await Blog.findByIdAndUpdate(req.params.id, {
            status : false
        });
        res.redirect('/');
    });
    app.get('/post/edit/:id', async (req, res) => { 
        const post = await Blog.findById(req.params.id);
        res.render('edit',{post});
    });
    app.post('/editpost/:id', async (req, res) => { 
        await Blog.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/');
    });
}