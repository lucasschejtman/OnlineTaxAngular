dbService = require('../services/db');

exports.findAll = function (req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');

    forms = dbService.getCollection('forms');
    forms.find().sort({postedOn : -1} , function(err , success){
        if(success){
            console.log('Response success '+success);
            res.send(200 , success);
            return next();
        }else{
            console.log('Response error '+err);
            return next(err);
        } 
    }); 
};

exports.add = function (req , res , next){
    var form = {};
    form.name = req.params.name;
    form.description = req.params.description;
    form.path = req.params.path;
    form.country = req.params.country;
    form.postedOn = new Date();
 
    res.setHeader('Access-Control-Allow-Origin','*');
 
    dbService.save("forms", form).then(
    function(data){
        res.send(201, data);
        return next();
    }, 
    function(reason){
        return next(reason);
    });
};