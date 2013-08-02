var express = require('express'),
    path = require('path'),
    http = require('http'),
    beverage = require('./routes/beverages');
 
var app = express();
app.configure(function () {
    app.set('port', process.env.PORT || 5000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});
 
app.get('/beverages', beverage.findAll);
app.post('/beverages', beverage.addBeverage);
app.put('/beverages/:id', beverage.updateBeverage);
app.delete('/beverages/:id', beverage.deleteBeverage);
 
http.createServer(app).listen(app.get('port'), function () {
    console.log("Listening on port " + app.get('port'));
});