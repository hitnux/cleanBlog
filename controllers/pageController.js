module.exports = app => {
    app.get('/about', async  (req, res) => {
        res.render('about');
    });
    app.get('/addpost', async  (req, res) => {
        res.render('add_post');
    });
}