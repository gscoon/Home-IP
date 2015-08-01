app.log = function(m){
    var ts = app.moment().format("YYYY-MM-DD h:mm:ss");
    if(typeof m == 'object'){
        console.log(m);
    }
    else{
        console.log(ts + ': ' + m);
    }
}

String.prototype.isValidIP = function(){
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this);
}
