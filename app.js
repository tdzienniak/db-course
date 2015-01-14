var express = require('express');
var app = express();
var connection = require('./lib/connection');
var sql = require('mssql');
var bodyParser = require('body-parser')
var squel = require('squel');
var is = require('check-types');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

app.post('/get-records', function (req, res) {
    connection.get(function (err, connection) {
        var request = connection.request();
        var query = squel.select()
            .from('Customers')
            .order(req.body.sort, parseInt(req.body.direction) < 0)
            .toString();
        request.query(query , function(err, recordset) {
            connection.close();
            if (err) {
                console.log(err.message)
                return res.send(500, 'Wystąpił błąd.');
            }
            return res.send(recordset);
        });
    });
});

app.post('/get-record', function (req, res) {
    connection.get(function (err, connection) {
        var request = connection.request();
        var query = squel.select()
            .from('Customers')
            .where("CustomerID = '" + req.body.id +"'")
            .toString();
        request.query(query , function(err, recordset) {
            connection.close();
            if (err) {
                console.log(err.message)
                return res.send(500, 'Wystąpił błąd.');
            }
            return res.send(recordset[0]);
        });
    });
});

app.post('/update-record', function (req, res) {
    if (is.not.object(req.body.data)) {
        return res.send(500, 'Brak danych do aktualziacji.');
    }

    if (is.not.unemptyString(req.body.id)) {
        return res.send(500, 'Pole CustomerID jest wymagane do przeprowadzenia aktualiacji.');
    }

    if (is.not.unemptyString(req.body.data.CompanyName)) {
        return res.send(500, 'Pole CustomerID jest wymagane do przeprowadzenia aktualiacji.');
    }

    connection.get(function (err, connection) {
        var request = connection.request();

        request
            .input('id', sql.NChar(5), req.body.id)
            .input('CompanyName', sql.NVarChar(40), req.body.data.CompanyName)
            .input('ContactName', sql.NVarChar(30), req.body.data.ContactName)
            .input('ContactTitle', sql.NVarChar(30), req.body.data.ContactTitle)
            .input('Address', sql.NVarChar(60), req.body.data.Address)
            .input('City', sql.NVarChar(15), req.body.data.City)
            .input('Region', sql.NVarChar(15), req.body.data.Region)
            .input('PostalCode', sql.NVarChar(10), req.body.data.PostalCode)
            .input('Country', sql.NVarChar(15), req.body.data.Country)
            .input('Phone', sql.NVarChar(24), req.body.data.Phone)
            .input('Fax', sql.NVarChar(24), req.body.data.Fax)

        request.query('update Customers set CompanyName = @CompanyName, ContactName = @ContactName, ContactTitle = @ContactTitle, Address = @Address, City = @City, Region = @Region, PostalCode = @PostalCode, Country = @Country, Phone = @Phone, Fax = @Fax where CustomerID = @id' , function(err, recordset) {
            connection.close();
            if (err) {
                console.log(err.message)
                return res.send(500, 'Wystąpił błąd.');
            }
            return res.send(recordset);
        });
    });
})

app.post('/delete-record', function (req, res) {
    if (is.not.unemptyString(req.body.id)) {
        return res.send(500, 'Pole CustomerID jest wymagane do przeprowadzenia usuwania.');
    }

    connection.get(function (err, connection) {
        var request = connection.request();

        request
            .input('id', sql.NChar(5), req.body.id)

        request.query('delete from Customers where CustomerID = @id' , function(err, recordset) {
            connection.close();
            if (err) {
                console.log(err.message)
                return res.send(500, 'Wystąpił błąd.');
            }
            return res.send(recordset);
        });
    });

});

app.post('/add-record', function (req, res) {
    if (is.not.object(req.body.data)) {
        return res.send(500, 'Brak danych do dodania.');
    }

    if (is.not.unemptyString(req.body.data.CompanyName)) {
        return res.send(500, 'Pole CompanyName jest wymagane.');
    }

    connection.get(function (err, connection) {
        var request = connection.request();
        request
            .input('CompanyName', sql.NVarChar(40), req.body.data.CompanyName)
            .input('ContactName', sql.NVarChar(30), req.body.data.ContactName)
            .input('ContactTitle', sql.NVarChar(30), req.body.data.ContactTitle)
            .input('Address', sql.NVarChar(60), req.body.data.Address)
            .input('City', sql.NVarChar(15), req.body.data.City)
            .input('Region', sql.NVarChar(15), req.body.data.Region)
            .input('PostalCode', sql.NVarChar(10), req.body.data.PostalCode)
            .input('Country', sql.NVarChar(15), req.body.data.Country)
            .input('Phone', sql.NVarChar(24), req.body.data.Phone)
            .input('Fax', sql.NVarChar(24), req.body.data.Fax)


        request.output('out', sql.NVarChar(5));
        request.execute('usp_AddCustomer', function(err, recordsets, returnValue) {
           connection.close();
            if (err) {
                console.log(err.message)
                return res.send(500, 'Wystąpił błąd.');
            }
            return res.send(request.parameters.out.value);
        });
    });
})


var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);

});
