var sqlite3 = require("sqlite3").verbose();
var dbClass = function(){
    var db = new sqlite3.Database(app.config.dbPath);

    this.insertIPEntry = function(ip, callback){
        var ts = app.moment().format("YYYY-MM-DD HH:mm:ss");
        db.run("INSERT INTO ip_table (device, ip, timestamp) VALUES (?, ?, ?)",
            [app.config.device, ip, ts], callback);
    }
}

app.db = new dbClass();
