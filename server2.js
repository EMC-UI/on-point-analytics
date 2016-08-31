var express = require('express');
var tally = require('tally');
var app = express();
var url = require('url');
var userStatsMock = require('./mock/userStats.json');
var projectStatsMock = require('./mock/projectStats.json');
var tweetFile1 = require('./mock/tweetStats.json');
var tweetFile2 = require('./mock/tweets-vmware_textOnly.json');
var tweetFile3 = require('./mock/tweets-vmWareAndEMC.json');

app.get('/stats/userStats', function (req, res) {
    // var urlParts = url.parse(req.url, true);
    // tally.userStats(urlParts.query.prevDays).then(function(result) {
    //     res.json(result);
    // });
    res.json(userStatsMock);
});

app.get('/stats/projectStats', function (req, res) {
    // var urlParts = url.parse(req.url, true);
    // tally.projectStats(urlParts.query.prevDays).then(function(result) {
    //     res.json(result);
    // });
    res.json(projectStatsMock);
});

app.get('/stats/repoStats', function (req, res) {
    //var urlParts = url.parse(req.url, true);
    //tally.repoStats(urlParts.query.prevDays).then(function(result) {
    //    res.json(result);
    //});
    res.json({});
});

app.get('/create', function(req, res) {
    tally.createData(30);
    res.send('building');
});

app.get('/stats/tweetStats', function (req, res) {
    // var urlParts = url.parse(req.url, true);
    // tally.userStats(tweetsMock).then(function(result) {
    //     res.json(result);
    // });
    var tweetsMock = "";
    //tweetsMock = tweetFile1;
    //tweetsMock = tweetFile2;
    tweetsMock = tweetFile3;
    var emcWorldCount = countTerm(tweetsMock, 'emcworld');
    var vmWorldCount = countTerm(tweetsMock, 'vmworld');
    var flashCount = countTerm(tweetsMock, 'flash');
    var vcloudCount = countTerm(tweetsMock, 'vcloud');
    var avamarCount = countTerm(tweetsMock, 'avamar');
    var vcenterCount = countTerm(tweetsMock, 'vcenter');
    var bothCount = vmWorldCount + emcWorldCount;
    var totalCount = vmWorldCount + emcWorldCount + flashCount + vcloudCount + avamarCount + vcenterCount;
    console.log('Search results: ' + ' EmcWorld=' + emcWorldCount +
                                    ', VmWorld=' + vmWorldCount +
                                    ', Flash=' + flashCount +
                                    ', VCloud=' + vcloudCount +
                                    ', Avamar=' + avamarCount +
                                    ', VCenter=' + vcenterCount);
    res.json({"EmcWorld": emcWorldCount,
        "VmWorld": vmWorldCount,
        "Flash" : flashCount,
        "VCloud" : vcloudCount,
        "Avamar" : avamarCount,
        "VCenter" : vcenterCount,
        "Both": bothCount,
        "Total": totalCount,
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

app.use(express.static('.'));

//function countTerm(obj, term) { return Object.keys(term).length; }
function countTermOld(obj, term) {
    var n = JSON.stringify(obj).search(term);
    if (n < 0) {
        n = 0;
    }
    return n;
}

function countTerm(obj, term)
{
    var str = JSON.stringify(obj);
    var regExp = new RegExp(term, "gi");
    console.log('regExp=' + regExp);
    var count = (str.match(regExp) || []).length;
    return count;
}