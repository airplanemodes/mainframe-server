const mainRoute = require('./main');
const usersRoute = require('./users');
const postsRoute = require('./posts');

exports.routes = (app) => {
    app.use('/', mainRoute);
    app.use('/users', usersRoute);
    app.use('/posts', postsRoute);

    app.use((req, res) => {
        res.json({ msg: "node not found" });
    });
};

exports.allowAccessControl = (app) => { 
    app.all('*', function (req, res, next) {
        if (!req.get('Origin')) return next();
        res.set('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, x-auth-token');
        next();
    });
};