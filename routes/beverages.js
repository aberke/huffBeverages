var mongo = require('mongodb');
 
var Server = mongo.Server,
    BSON = mongo.BSONPure,
    db;


var mongoUri = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/mydb';

mongo.Db.connect(mongoUri, function (err, thedb) {
    if(!err) {
        thedb.collection('beverages', {strict:true}, function(err, collection) {
            if(err){
                console.log('populating beverages database...');
                populateDB(thedb);
            }
        });
    }
    db = thedb;
});


 
exports.findAll = function(req, res) {
    db.collection('beverages', function(err, collection) {
        collection.find().toArray(function(err, items) {
            if (err){res.send({'error':'An error has occurred'});}
            else{res.send(items);}
        });
    });
}; 

 
exports.addBeverage = function(req, res) {
    var beverage = req.body;
    console.log('Adding beverage: ' + JSON.stringify(beverage));
    db.collection('beverages', function(err, collection) {
        collection.insert(beverage, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
 
exports.updateBeverage = function(req, res) {
    var id = req.params.id;
    var beverage = req.body;
    console.log('Updating beverage: ' + id);
    console.log(JSON.stringify(beverage));
    db.collection('beverages', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, beverage, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating beverage: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(beverage);
            }
        });
    });
}
 
exports.deleteBeverage = function(req, res) {
    var id = req.params.id;
    console.log('Deleting beverage: ' + id);
    db.collection('beverages', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
 
/*--------------------------------------------------------------------------------------------------------------------*/
var populateDB = function(thedb) {
 
    var beverages = [
    {
        name: "Coke",
        real: true,
        upvotes: 0,
        downvotes: 0,
        description: "Everyone's fav",
        calories: 140
    },
    {
        name: "Fanta",
        real: false,
        upvotes: 0,
        downvotes: 0,
        description: "Don't you wanta",
        calories: 140
    },
    {
        name: "Seltzer",
        real: true,
        upvotes: 0,
        downvotes: 0,
        description: "so crisp...",
        calories: 0
    }];
 
    thedb.collection('beverages', function(err, collection) {
        collection.insert(beverages, {safe:true}, function(err, result) {});
    });
 
};