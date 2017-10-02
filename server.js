var express = require("express"),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    async = require('async'),
    mongoose = require('mongoose');

var app = express(),
    port = process.env.PORT || 3000;

var Users = require('./app/model/user.js'),
    Patient = require('./app/model/patient.js'),
    Checkup = require('./app/model/checkup.js'),
    Doctor = require('./app/model/doctor.js'),
    Stock = require('./app/model/stock.js'),
    Category = require('./app/model/category.js'),
    ActivityLog = require('./app/model/activity-log.js');

mongoose.connect('mongodb://127.0.0.1:27017/hms', {
    useMongoClient: true
});
app.set('superSecret', 'noSecret');
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization");
    next();
});

/*---------------------------------------------------------
add user
---------------------------------------------------------*/
app.post('/api/createUser', function(req, res) {
    var user = new Users(req.body.tamilanda);
    if (req.body.tamilanda) {
        user.save(function(err, createUser) {
            if (err) {
                throw err;
            } else {
                res.json(createUser);
            }
        });
    }
});

app.post('/api/authenticate', function(req, res) {
    Users.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) {
            throw err;
        } else if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            // check if password matches
            if (user.password !== req.body.password) {
                res.json({ success: false, message: 'Wrong email or password. Try again' });
            } else {
                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn: 86400 // expires in 24 hours
                });

                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    token: token
                });
            }
        }
    })
});

var apiRoutes = express.Router();

/*---------------------------------------------------------
route middleware to authenticate and check token
---------------------------------------------------------*/
apiRoutes.use(function(req, res, next) {

    if (req.method === 'OPTIONS') {
        next();
    }



    // decode token
    if (req.method !== 'OPTIONS') {

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.param('token') || req.headers['authorization'];
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    }

});

/** ---------------- User Api's ---------------------------- */
/** ---------------------------------------------------------- */
apiRoutes.get('/getUserDetails/:id', function(req, res) {
    var id = req.params.id;
    Users.findOne({ _id: id }, function(err, user) {
        delete user.password;
        if (err) throw err;
        res.json(user);
    });
});


/** ---------------- Patient Api's ---------------------------- */
/** ---------------------------------------------------------- */
apiRoutes.post('/getPatients', function(req, res) {
    var query = req.body.query,
        page = parseInt(req.body.page) + 1,
        limit = parseInt(req.body.limit);
    Patient.paginate(query, {
        page: page,
        limit: limit
    }, function(err, result) {
        res.json(result);
    });
});

apiRoutes.post('/createPatientDetails', function(req, res) {
    delete req.body._id;
    var patient = new Patient(req.body);
    patient.save(function(err, createPatient) {
        if (err) {
            throw err;
        } else {
            res.json(createPatient);
        }
    });
});

apiRoutes.get('/getPatientDetails/:id', function(req, res) {
    var id = req.params.id;
    Patient.findOne({ _id: id }, function(err, patient) {
        if (err) throw err;
        res.json(patient);
    });
});

apiRoutes.put('/updatePatientDetails/:id', function(req, res) {
    var id = req.params.id,
        patient = new Patient(req.body);
    Patient.findOneAndUpdate({ _id: id }, patient, function(err, updatePatient) {
        if (err) throw err;
        res.json(patient);
    });
});

apiRoutes.delete('/deletePatient/:id', function(req, res) {
    var id = req.params.id;
    Patient.findOneAndRemove({ _id: id }, function(err, patient) {
        if (err) throw err;
    })
});

/** --------------- Checkup Api's --------------------- */
/** --------------------------------------------------- */

apiRoutes.post('/getCheckups', function(req, res) {
    var query = req.body.query,
        page = parseInt(req.body.page) + 1,
        limit = parseInt(req.body.limit);
    Checkup.paginate(query, {
        page: page,
        limit: limit
    }, function(err, result) {
        res.json(result);
    });
});

apiRoutes.post('/createCheckupDetails', function(req, res) {
    delete req.body._id;
    var checkup = new Checkup(req.body);
    checkup.save(function(err, createCheckup) {
        if (err) {
            throw err;
        } else {
            res.json(createCheckup);
        }
    });
});

apiRoutes.put('/updateCheckupDetails/:id', function(req, res) {
    var id = req.params.id,
        checkup = new Checkup(req.body);
    Checkup.findOneAndUpdate({ _id: id }, checkup, function(err, updateCheckup) {
        if (err) throw err;
        res.json(checkup);
    });
});

apiRoutes.get('/getCheckupDetails/:id', function(req, res) {
    var id = req.params.id;
    Checkup.findOne({ _id: id }, function(err, checkup) {
        if (err) throw err;
        res.json(checkup);
    });
});

apiRoutes.delete('/deleteCheckup/:id', function(req, res) {
    var id = req.params.id;
    Checkup.findOneAndRemove({ _id: id }, function(err) {
        if (err) throw err;
        res.json({ message: 'Success' });
    })
});
/** --------------- Doctor Api's ----------------------- */
/** --------------------------------------------------- */
apiRoutes.post('/getDoctors', function(req, res) {
    var query = req.body.query,
        page = parseInt(req.body.page) + 1,
        limit = parseInt(req.body.limit);
    Doctor.paginate(query, {
        page: page,
        limit: limit
    }, function(err, result) {
        res.json(result);
    });
});

apiRoutes.post('/createDoctorDetails', function(req, res) {
    delete req.body._id;
    var doctor = new Doctor(req.body);
    doctor.save(function(err, createDoctor) {
        if (err) {
            res.send(500, err);
        } else {
            res.json(createDoctor);
        }
    });
});

apiRoutes.get('/getDoctorDetails/:id', function(req, res) {
    var id = req.params.id;
    Doctor.findOne({ _id: id }, function(err, doctor) {
        if (err) throw err;
        res.json(doctor);
    });
});

apiRoutes.put('/updateDoctorDetails/:id', function(req, res) {
    var id = req.params.id,
        doctor = new Doctor(req.body);
    Doctor.findOneAndUpdate({ _id: id }, doctor, function(err, updateDoctor) {
        if (err) {
            throw err
        } else {
            res.json(doctor);
        }
    });
});

apiRoutes.delete('/deleteDoctor/:id', function(req, res) {
    var id = req.params.id;
    Doctor.findOneAndRemove({ _id: id }, function(err, doctor) {
        if (err) throw err;
        res.json({ message: 'Success' });
    })
});

apiRoutes.get('/getDoctorsName', function(req, res) {
    var id = req.params.id;
    Doctor.find({}, 'name', function(err, doctorsName) {
        if (err) throw err;
        res.json(doctorsName);
    })
});

/** --------------- Stock Api's ----------------------- */
/** --------------------------------------------------- */
apiRoutes.post('/getStocks', function(req, res) {
    var query = req.body.query,
        page = parseInt(req.body.page) + 1,
        limit = parseInt(req.body.limit);
    Stock.paginate(query, {
        page: page,
        limit: limit
    }, function(err, result) {
        res.json(result);
    });
});

apiRoutes.post('/createStockDetails', function(req, res) {
    delete req.body._id;
    var stock = new Stock(req.body);
    stock.save(function(err, createStock) {
        if (err) {
            throw err;
        } else {
            res.json(createStock);
        }
    });
});

apiRoutes.get('/getStockDetails/:id', function(req, res) {
    var id = req.params.id;
    Stock.findOne({ _id: id }, function(err, stock) {
        if (err) throw err;
        res.json(stock);
    });
});

apiRoutes.put('/updateStockDetails/:id', function(req, res) {
    var id = req.params.id,
        stock = new Stock(req.body);
    Stock.findOneAndUpdate({ _id: id }, stock, function(err, updateStock) {
        if (err) throw err;
        res.json(stock);
    });
});

apiRoutes.delete('/deleteStock/:id', function(req, res) {
    var id = req.params.id;
    Stock.findOneAndRemove({ _id: id }, function(err, stock) {
        if (err) throw err;
        res.json({ message: 'Success' });
    })
});


/** --------------- Categories Api's ----------------------- */
/** --------------------------------------------------- */
apiRoutes.post('/getCategories', function(req, res) {
    var query = req.body.query,
        page = parseInt(req.body.page) + 1,
        limit = parseInt(req.body.limit);
    Category.paginate(query, {
        page: page,
        limit: limit
    }, function(err, result) {
        res.json(result);
    });
});

apiRoutes.post('/createCategoryDetails', function(req, res) {
    delete req.body._id;
    var category = new Category(req.body);
    category.save(function(err, createCategory) {
        if (err) {
            throw err;
        } else {
            res.json(createCategory);
        }
    });
});

apiRoutes.get('/getCategoryDetails/:id', function(req, res) {
    var id = req.params.id;
    Category.findOne({ _id: id }, function(err, category) {
        if (err) throw err;
        res.json(category);
    });
});

apiRoutes.put('/updateCategoryDetails/:id', function(req, res) {
    var id = req.params.id,
        category = new Category(req.body);
    Category.findOneAndUpdate({ _id: id }, category, function(err, updateCategory) {
        if (err) throw err;
        res.json(category);
    });
});

apiRoutes.delete('/deleteCategory/:id', function(req, res) {
    var id = req.params.id;
    Category.findOneAndRemove({ _id: id }, function(err) {
        if (err) throw err;
        res.json({ message: 'Success' });
    })
});

/** --------------- Dashboard Api's ----------------------- */
/** ------------------------------------------------------- */

apiRoutes.get('/getDoumentsCount', function(req, res) {
    getDoumentsCount(function(err, documents) {
        if (err) throw err;
        res.json(documents);
    });
});

apiRoutes.get('/getBloodGroupCount', function(req, res) {
    getBloodGroupCount(function(err, bloodGroup) {
        if (err) throw err;
        res.json(bloodGroup);
    });
});

apiRoutes.get('/getRecentActivities', function(req, res) {
    ActivityLog.find().sort('-createdAt').limit(10).exec(function(err, activities) {
        if (err) throw err;
        res.json(activities);
    });
});

apiRoutes.post('/getExpiredMedicines', function(req, res) {
    var expireDate = req.body.expireDate;
    Stock.find({ "expireDate": { "$lt": new Date(expireDate) } }).exec(function(err, medicinies) {
        if (err) throw err;
        res.json(medicinies);
    });
});



var getDoumentsCount = function(callback) {
    async.parallel({
        doctorFind: function(cb) { Doctor.count().exec(cb); },
        doctorActiveFind: function(cb) { Doctor.count({ status: true }).exec(cb); },
        patientFind: function(cb) { Patient.count().exec(cb); },
        patientActiveFind: function(cb) { Patient.count({ status: true }).exec(cb); },
        stockFind: function(cb) { Stock.count().exec(cb); },
        stockActiveFind: function(cb) { Stock.count({ status: true }).exec(cb); },
        categoryFind: function(cb) { Category.count().exec(cb); },
        categoryActiveFind: function(cb) { Category.count({ status: true }).exec(cb); }
    }, function(err, result) {
        var res = {};
        res.doctor = result.doctorFind;
        res.doctorActive = result.doctorActiveFind;
        res.patient = result.patientFind;
        res.patientActive = result.patientActiveFind;
        res.stock = result.stockFind;
        res.stockActive = result.stockActiveFind;
        res.category = result.categoryFind;
        res.categoryActive = result.categoryActiveFind;
        callback(err, res);
    });
};

var getBloodGroupCount = function(callback) {
    async.parallel({
        oPositiveFind: function(cb) { Patient.count({ bloodGroup: 'O+' }).exec(cb); },
        oNegativeFind: function(cb) { Patient.count({ bloodGroup: 'O-' }).exec(cb); },
        aPositiveFind: function(cb) { Patient.count({ bloodGroup: 'A+' }).exec(cb); },
        aNegativeFind: function(cb) { Patient.count({ bloodGroup: 'A-' }).exec(cb); },
        bPositiveFind: function(cb) { Patient.count({ bloodGroup: 'B+' }).exec(cb); },
        bNegativeFind: function(cb) { Patient.count({ bloodGroup: 'B-' }).exec(cb); },
        abPositiveFind: function(cb) { Patient.count({ bloodGroup: 'AB+' }).exec(cb); },
        abNegativeFind: function(cb) { Patient.count({ bloodGroup: 'AB-' }).exec(cb); }
    }, function(err, result) {
        var res = {};
        res['oPositive'] = result.oPositiveFind;
        res['oNegative'] = result.oNegativeFind;
        res['aPositive'] = result.aPositiveFind;
        res['aNegative'] = result.aNegativeFind;
        res['bPositive'] = result.bPositiveFind;
        res['bNegative'] = result.bNegativeFind;
        res['abPositive'] = result.abPositiveFind;
        res['abNegative'] = result.abNegativeFind;
        callback(err, res);
    });
};

app.use('/api/hms', apiRoutes);

app.listen(port);
console.log("Application running on port" + port);