app = {
    config: require('./config/config.json'),
    publicIP: require('public-ip'),
    moment: require('moment'),
    currentIP: null,
    nsRecord: {},
    intervalID: null
};

require('./js/global');
require('./js/db');
require('./js/digitalocean');

//first step should be to pull latest ip address from digital ocean
app.start = function(){
    app.ocean.returnDomainRecord(app.config.domain, function(records){
        records.some(function(rec){
            if(rec.name == app.config.subdomain){
                app.nsRecord = rec;
                console.log('this is your guy: ' + rec.id);
                app.setLoop();
                return true;
            }
        });
    });
}

app.setLoop = function(){
    this.intervalID = setInterval(this.ipCheck, 5000);
}

app.ipCheck = function(){
    app.publicIP(function(err, ip){
        var ts = app.moment().format("YYYY-MM-DD h:mm:ss");
        console.log(ts + ": IP " + ip);
        if(app.currentIP != ip){
            console.log('NEW IP address: '+  ip);
            app.currentIP = ip;
            app.db.insertIPEntry(ip, function(err){
                console.log(!err?'Insert ID: ' + this.lastID : err);
            });
            app.setDomainRecord(ip);
        }
    });
}

app.setDomainRecord = function(){
    var rObj = {
        name: app.config.domain,
        sub: app.config.subdomain,
        ip: app.currentIP,
        id: app.nsRecord.id,
        type: app.nsRecord.type
    };
    app.ocean.updateDomainRecordIP(rObj, function(results){
        console.log("ocean update: ");
        console.log(results);
    });
}

app.start();
