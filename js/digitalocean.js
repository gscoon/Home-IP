// Import a module
var DigitalOceanAPI = require('doapi');

var oceanClass = function(){
    // Create an instance with your API credentials
    var ocean = new DigitalOceanAPI({token: app.config.ocean.token});

    this.getDroplets = function(){
        ocean.dropletGetAll().then(function(results) {
            console.log(results);
        });
    }

    this.getDomains = function(){
        console.log("getDomains");
        ocean.domainGetAll().then(function(results){
            console.log(results);
        });
    }

    this.returnDomainRecord = function(domain, callBack){
        ocean.domainRecordGetAll(domain).then(callBack);
    }

    this.updateDomainRecordIP = function(rObj, callback){
        ocean.domainRecordEdit(rObj.name, rObj.id, {data: rObj.ip, type: rObj.type, name: rObj.sub}).then(callback);
    }

}

app.ocean = new oceanClass();

/*
{
    type: "A",
    name: "desktop"
}
*/
