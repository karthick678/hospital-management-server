var express = require("express"),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var app = express(),
    port = process.env.PORT || 3000;

var Patient = require('./app/model/patient.js'),
    Checkup = require('./app/model/checkup.js'),
    Doctor = require('./app/model/doctor.js'),
    Stock = require('./app/model/stock.js');
    Category = require('./app/model/category.js');
mongoose.connect('mongodb://127.0.0.1:27017/hms', {
    useMongoClient: true
});
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var apiRoutes = express.Router();

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
    Patient.findOneAndRemove({ _id: id }, function(err) {
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
            throw err;
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
        if (err) throw err;
        res.json(doctor);
    });
});

apiRoutes.delete('/deleteDoctor/:id', function(req, res) {
    var id = req.params.id;
    Doctor.findOneAndRemove({ _id: id }, function(err) {
        if (err) throw err;
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
    Stock.findOneAndRemove({ _id: id }, function(err) {
        if (err) throw err;
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
    })
});

app.use('/api', apiRoutes);

app.listen(port);
console.log("Application running on port" + port);