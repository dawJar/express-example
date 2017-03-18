const Person = require('../model/Person');
const User = require('../model/User');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('index');
    });

    // cookies
    app.get('/cookie', function (req, res) {
        res.cookie('name', 'express').send('cookie set');
    });

    app.get('/cookie-expire', function (req, res) {
        let cookie = req.cookies;
        res.cookie('name', 'cookie-expires3', {
            expire: 3 + Date.now()
        }).send('cookie expires in 3s!');
    });

    app.get('/cookie-expire2', function (req, res) {
        res.cookie('name', 'cookie-expires2', {
            maxAge: 60,
            httpOnly: true
        }).send('cookie expires in 60s');
    });

    // session
    app.get('/session', function (req, res) {
        if (req.session.pageViews) {
            req.session.pageViews++;
            res.send(`you visited this page ${req.session.pageViews} times!`);
        } else {
            req.session.pageViews = 1;
            res.send('welcome on our page for the first time!');
        }
    });

    // create new user + login session
    app.get('/signup', function (req, res) {
        res.render('signup');
    });

    app.post('/signup', function (req, res) {
        let { login, password } = req.body;
        if (!login || !password) {
            // status 400 => req data didnt follow the rules!
            res.status('400');
            res.render('signup', { message: 'invalid details!' });
        } else {
            // find user with same login
            User.findOne({ login }).then(function (result) {
                if (result !== null) {
                    res.render('signup', { message: 'User already exists!' });
                } else {
                    let user = new User({ login, password });
                    let data = new User(user);
                    data.save();
                    req.session.user = user;
                    res.redirect('/protected');
                }
            });
        }
    });

    function checkSignIn(req, res, next) {
        if (req.session.user) {
            next();     //If session exists, proceed to page
        } else {
            var err = new Error("Not logged in!");
            console.log(req.session.user);
            next(err);  //Error, trying to access unauthorized page!
        }
    }

    app.get('/protected', checkSignIn, function (req, res) {
        res.render('protected', { login: req.session.user.login });
    });

    app.get('/login', function (req, res) {
        res.render('login');
    });

    app.post('/login', function (req, res) {
        let { login, password } = req.body;
        if (!login || !password) {
            res.render('login', { message: "Please enter both login and password" });
        } else {
            User.findOne({ login }).then(function (foundUser) {
                if (foundUser.password !== password) {
                    res.render('login', { message: "Invalid login or password" });
                } else {
                    req.session.user = foundUser;
                    res.redirect('/protected');
                }
            });
        }
    });

    app.get('/logout', function (req, res) {
        req.session.destroy(function () {
            console.log("user logged out.");
        });
        res.redirect('/login');
    });

    // form
    app.get('/form', function (req, res) {
        res.render('form');
    });

    app.post('/form', function (req, res) {
        console.log(req.body);
    });

    // save data to db
    app.get('/person', function (req, res) {
        res.render('person');
    });

    app.post('/person', function (req, res) {
        let { body: { name, age } } = req;

        if (!name || !age) {
            res.render('show_message', {
                message: "Sorry, you provided worng info",
                type: "error"
            });
        } else {
            let person = new Person({
                name,
                age
            });
            let data = new Person(person);
            data.save();
            res.redirect('/');
        }
    });


    // RANDOM TEST ROUTES
    app.get('/test', function (req, res) {
        res.send('acces random rout tests');
    });

    app.get('/test/:id', function (req, res) {
        console.log(`param test id: ${req.params.id}`)
        res.render('index');
    });

    app.get('/test/:name/:id', function (req, res) {
        console.log(`param test id: ${req.params.id} name: ${req.params.name}`)
        res.render('index');
    });

    // matched routes
    // 0-9 with 5 digits
    app.get('/matched/:id([0-9]{5})', function (req, res) {
        console.log(`param test id: ${req.params.id}`)
        res.render('index');
    });

    // default error
    app.get('*', function (req, res) {
        res.send('invalid url')
    });

};
