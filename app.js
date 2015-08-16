app = {
    config: require('./config/config.json'),
    publicIP: require('public-ip'),
    moment: require('moment'),
    currentIP: null,
    nsRecord: {},
    intervalID: null,
    iCount:0
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
                app.log('Found NS record: ' + rec.id);
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
    app.publicIP(function(ipErr, ip){
        //if error is returned or ip address is invalid
        if(ipErr != null || ip == null || !ip.isValidIP()){
            app.log("Public IP error:");
            console.log(ipErr);
            return false;
        }

        if(app.currentIP != ip){
            app.log('NEW IP address: '+  ip);
            app.currentIP = ip;
            app.db.insertIPEntry(ip, function(err){
                console.log(!err?'Insert ID: ' + this.lastID : err);
            });
            app.setDomainRecord(ip);
        }

        // after 6 loops, send the ip address to the log file
        app.iCount++;
        // 12 = 1 minute
        if(app.iCount == (12 * 10)){
            app.log(ip);
            app.iCount = 0;
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
        app.log("ocean update: ");
        app.log(results);
    });
}

app.start();
