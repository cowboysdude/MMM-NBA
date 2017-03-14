/* Magic Mirror
    * Module: MMM-NBA
    *
    * By Cowboysdude
    * 
    */
const NodeHelper = require('node_helper');
const request = require('request');
const moment = require('moment');
const fs = require('fs');

module.exports = NodeHelper.create({

    start: function() {
        this.nba = {
            timestamp: null,
            data: null
        };
        this.path = "modules/MMM-NBA/NBAscores.json";
        if (fs.existsSync(this.path)) {
            var temp = JSON.parse(fs.readFileSync(this.path, 'utf8'));
            if (temp.timestamp === this.getDate()) {
                this.nba = temp;
              // console.log(temp);
            }
        }

    },

    getNBA: function(url) {
    	var nowDate = moment().format('YYYYMMDD'); 
    	
        request({
            url: ("http://data.nba.com/5s/json/cms/noseason/scoreboard/"+nowDate+"/games.json"),
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body).sports_content.games.game;
        console.log(body);
                this.sendSocketNotification('NBA_RESULTS', result);
                this.nba.timestamp = this.getDate();
                this.nba.data = result;
                this.fileWrite();
            }
        });
    },

    fileWrite: function() {
        fs.writeFile(this.path, JSON.stringify(this.nba), function(err) {
        	console.log("Score File Updated")
            if (err) {
                return console.log(err);
            }
            console.log("The NBA Score file was saved!");
        });
    },

    getDate: function() {
        return (new Date()).toLocaleDateString();
    },

    //Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_NBA') {
            if (this.nba.timestamp === this.getDate() && this.nba.data !== null) {
                this.sendSocketNotification('NBA_RESULTS', this.nba.data);
            } else {
                this.getNBA(payload);
            }
        }
    }

});