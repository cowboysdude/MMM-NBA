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
                var result = JSON.parse(body).sports_content.games;
                if(this.config.focus_on.length > 0){
					result.game = result.game.filter((game) => {
						if(this.config.focus_on.includes(game.home.nickname) || this.config.focus_on.includes(game.visitor.nickname)){
							return true;
						} else {
							return false;
						}
					});
				}
                this.sendSocketNotification('NBA_RESULTS', result);
            }
        });
    },
    
    
    socketNotificationReceived: function(notification, payload) {
    	if(notification === 'CONFIG'){
			this.config = payload;
		} else if (notification === 'GET_NBA') {
                this.getNBA(payload);
            }
       }

});
