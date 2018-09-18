exports.list = function (req, res) {
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM cars', function (err, rows) {
            if (err) { console.log("Error Selecting : %s ", err); }
            else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows));
            }
        });
    });
};

exports.add = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        var data = {
            make    : input.make,
            model   : input.model,  
            plate_number   : input.plateid 
        };
        console.log('save request...', data);

        var query = connection.query("INSERT INTO cars set ? ",data, function(err, rows)
        {
           if (err) { console.log("Error inserting : %s ",err ); }
           else {
           res.setHeader('Content-Type', 'application/json');
           res.send(JSON.stringify('success'));
        }              
        });
    });
};


exports.delete = function(req,res){
    var id = req.params.id;
    req.getConnection(function (err, connection) {
       connection.query("DELETE FROM cars  WHERE id = ? ",[id], function(err, rows)
       {
            if(err) { 
                res.status(500).send(err);
                console.log("Error deleting : %s ",err ); }
             else { res.redirect('/cars'); }
       });
    });
}



exports.repairs_list = function (req, res) {
    var id = req.params.id;
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM repairs WHERE car_id = ?', [id], function (err, rows)
        {
            if (err) { console.log("Error Selecting : %s ", err); }
            else {
                var query_insert = connection.query("SELECT make, model FROM cars WHERE id = ?", [id], function (err, rows2) {
                    if (err) {
                        //console.log("Error inserting : %s ", err)
                        res.setHeader('Content-Type', 'application/json');
                        res.status(500).send(err);
                    }
                    else{

                        var first = rows2[0]['make'];
                        var second = rows2[0]['model'];
                        var third = rows;

                        res.setHeader('Content-Type', 'application/json');
                        res.json({
                            car_make: first,
                            car_model: second,
                            repair_data: third
                        });
                    }
                });
            }
        });
    });
};

exports.repair_update = function (req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    var repair_id = req.params.repair_id;

    req.getConnection(function (err, connection) {
        var data = {
            repair_date: input.repair_date,
            repaired_part: input.repaired_part,
            comments: input.comments
        };
        connection.query("UPDATE repairs set ? WHERE repair_id = ? ", [data, repair_id], function (err, rows) {
            if (err) { 
                res.setHeader('Content-Type', 'application/json');
                res.status(500).send(err);
            }
            else{
                res.send(JSON.stringify(rows));
            }
        });
    });
};

exports.repair_delete = function (req, res) {
    var repair_id = req.params.repair_id;
    req.getConnection(function (err, connection) {
        connection.query("DELETE FROM repairs  WHERE repair_id = ? ", [repair_id], function (err, rows) {
            if (err) { console.log("Error deleting : %s ", err); }
            else { res.send('deleted'); }                   

            
        });
    });
};

exports.repair_add = function (req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT max(repair_id) as max FROM repairs', function (err, result) {
            if (err)
                console.log("Error Selecting : %s ", err);

            var max_id = result[0]['max'];
            var next_id = max_id + 1;

            var data = {
                repair_id: next_id,
                car_id: input.car_id,
                repair_date: input.repair_date,
                repaired_part: input.repaired_part,
                comments: input.comments
            };

            var query_insert = connection.query("INSERT INTO repairs set ? ", data, function (err, rows) {
                if (err) {
                    
                    //console.log("Error inserting : %s ", err)
                    res.setHeader('Content-Type', 'application/json');
                    res.status(500).send(err);
                }
                else{
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify('success'));
                }
            });
        });
    });
};


exports.check_car_plateid = function(req,res){
    var id = req.params.id;
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM cars',function(err,rows)
        {
            
            if(err)
            console.log("Error Selecting : %s ",err );
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows));
         });
    });
};

