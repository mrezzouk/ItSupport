/*var MongoClient = require("mongodb").MongoClient;
var MongoObjectID = require("mongodb").ObjectID;
*/

/*
MongoClient.connect('mongodb://localhost:27017/tutoriel', function(error, db) {
    if (error) throw error;
    var collection = db.collection("customers");

    collection.find().toArray(function (error, results) {
        if (error) throw error;

        results.forEach(function(obj,i) {
            console.log(
                "ID : "  + obj._id.toString() + "\n" +
                "Nom : " + obj.name + "\n" +
                "Jeu : " + obj.last_name + "\n" + "\n")});
  });
});
ObjectId("5b50545ee2fa365afe30968f"),

*/

//////// Recuperer le document correspondant à un identifiant
/*
var idToFind      = "5b50545ee2fa365afe30968f";           // Identifiant, sous forme de texte
var objToFind     = { _id: new MongoObjectID(idToFind) }; // Objet qui va nous servir pour effectuer la recherche



MongoClient.connect('mongodb://localhost:27017/tutoriel', function(error, db) {
    if (error) throw error;
    var collection = db.collection("customers");

    collection.findOne(objToFind, function(error, result) {
        if (error) throw error;

        console.log(
            "ID : "  + result._id.toString() + "\n" +
            "Nom : " + result.name + "\n" +
            "Jeu : " + result.last_name
        );
});

});
*/
 /*
///////// Insert a document

MongoClient.connect('mongodb://localhost:27017/tutoriel', function(error, db) {
    if (error) throw error;

    var objNew = { name: "Nachwa", last_name: "Elkhamlichi" };
    var collection = db.collection("customers");
    collection.insert(objNew, null, function (error, results) {
        if (error) throw error;

        console.log("Le document a bien été inséré");
    });
});
*/
