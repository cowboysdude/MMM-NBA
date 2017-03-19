/* Magic Mirror
    * Module: MMM-NBA
    *
    * By Cowboysdude
    * 
    */
const NodeHelper = require('node_helper');
const request = require('request');
const moment = require('moment');

module.exports = NodeHelper.create({

    start: function() {
    	console.log("Starting module: " + this.name);
    },

    getNBA: function(url) {
    	var nowDate = moment().format('YYYYMMDD');
        request({
            url: ("http://data.nba.com/5s/json/cms/noseason/scoreboard/"+nowDate+"/games.json"),
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body).sports_content.games.game;
                this.sendSocketNotification('NBA_RESULTS', result);
            }
        });
    },
    
    
    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_NBA') {
                this.getNBA(payload);
            }
       }

});
