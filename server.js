var express = require("express"),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var app = express(),
    port = process.env.PORT || 3000;

var Patient = require('./app/model/patient.js'),
    Stock = require('./app/model/stock.js');
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

/** --------------- Stock Api's ----------------------- */
/** --------------------------------------------------- */

apiRoutes.get('/getStocks', function(req, res) {
    Stock.paginate({ name: 'vicks' }, {
        page: 1,
        limit: 10
    }, function(err, result) {
        res.json(result);
    });
});

apiRoutes.post('/createStock', function(req, res) {
    var stock = new Stock({
        name: 'vicks',
        category: 'powders',
        purchasePrice: 20,
        sellingPrice: 25,
        storeBox: 'red color box',
        Quantity: 30,
        company: 'cipla',
        effects: 'normal',
        expireDate: new Date()
    });

    stock.save(function(err, createdStock) {
        if (err) {
            throw err;
        } else {
            res.json(createdStock);
        }
    });
});

app.use('/api', apiRoutes);

app.listen(port);
console.log("Application running on port" + port);