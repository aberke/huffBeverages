var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('beveragedb', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Destroying and repopulating 'beveragedb' database...");
        db.collection('beverages', function(err, collection) {
            collection.remove({});
        });
        db.collection('beverages', {strict:true}, function(err, collection) {
            populateDB();
        });
    }
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
var populateDB = function() {
 
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
 
    db.collection('beverages', function(err, collection) {
        collection.insert(beverages, {safe:true}, function(err, result) {});
    });
 
};