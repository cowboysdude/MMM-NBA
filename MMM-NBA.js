  /* Magic Mirror
    * Module: MMM-NBA
    *
    * By cowboysdude
    * 
    */
   
Module.register("MMM-NBA", {

       // Module config defaults.
       defaults: {
           updateInterval: 60000, // every 2 minutes
           animationSpeed: 10,
           initialLoadDelay: 3505, // 0 seconds delay
           retryDelay: 1500,
           maxWidth: "500px",
           fadeSpeed: 4,
           rotateInterval: 5 * 1000,
           header: true,
           logo: false,
           focus_on: []
       },
       
           
       // Define required scripts.
       getScripts: function() {
           return ["moment.js"];
       },
       
       getStyles: function() {
           return ["MMM-NBA.css"];
       },

       // Define start sequence.
       start: function() {
           Log.info("Starting module: " + this.name);
           this.sendSocketNotification('CONFIG', this.config);
           // Set locale.
           this.week = "";
           this.nba = {};
           this.today = "";
           this.activeItem = 0;
           this.rotateInterval = null;
           this.scheduleUpdate();
       },

      getDom: function() {
         
          var nbascores = this.nba;
         
         var wrapper = document.createElement("div");
         wrapper.className = "wrapper";
         wrapper.style.maxWidth = this.config.maxWidth;
         
         if (this.config.header === true){
         var header = document.createElement("header");
         header.classList.add("header");
         if (this.config.logo === true){
         header.innerHTML = "<img class='emblem' src='modules/MMM-NBA/icons/nba.png'>   NBA Scores  " + moment().format('MM/DD/YYYY');
         } else {
		 header.innerHTML = "NBA Scores  " + moment().format('MM/DD/YYYY');	
		 }
         wrapper.appendChild(header);
        }
        
         var keys = Object.keys(this.nba);
         if (keys.length > 0) {
             if (this.activeItem >= keys.length) {
                 this.activeItem = 0;
             }
         var scores = this.nba[keys[this.activeItem]];
         var qtr = scores.period_time.period_value;
            
         var top = document.createElement("div");
         top.classList= "small bright";
         
         var gameTable = document.createElement("table");
         var firstrow = document.createElement("tr");
         var teamcolumn = document.createElement("th");
         teamcolumn.setAttribute("colspan", 3);
         teamcolumn.classList.add("align-left", "status");
         if (scores.period_time.period_value === "In Progress"){
		 teamcolumn.innerHTML = "Period: ";	
		 } else {
		 teamcolumn.innerHTML = "";	
		 }
         firstrow.appendChild(teamcolumn);
         gameTable.appendChild(firstrow);
        
         var firstcolumn = document.createElement("th");
         firstcolumn.setAttribute("colspan", 1);
         firstcolumn.classList.add("score","xsmall","bright");
         firstcolumn.innerHTML = "1";
         firstrow.appendChild(firstcolumn);
         gameTable.appendChild(firstrow);
         
         var spacer = document.createElement("th");
         spacer.setAttribute("colspan", 1);
         spacer.innerHTML = "";
         firstrow.appendChild(spacer);
         gameTable.appendChild(firstrow);
         
         var secondcolumn = document.createElement("th");
         secondcolumn.setAttribute("colspan", 1);
         secondcolumn.classList.add("score","xsmall","bright");
         secondcolumn.innerHTML = "2";
         firstrow.appendChild(secondcolumn);
         gameTable.appendChild(firstrow);
         
         var spacer = document.createElement("th");
         spacer.setAttribute("colspan", 1);
         spacer.innerHTML = "";
         firstrow.appendChild(spacer);
         gameTable.appendChild(firstrow);
         
         var thirdcolumn = document.createElement("th");
         thirdcolumn.setAttribute("colspan", 1);
         thirdcolumn.classList.add("score","xsmall","bright");
         thirdcolumn.innerHTML = "3";
         firstrow.appendChild(thirdcolumn);
         gameTable.appendChild(firstrow);
         
         var spacer = document.createElement("th");
         spacer.setAttribute("colspan", 1);
         spacer.innerHTML = "";
         firstrow.appendChild(spacer);
         gameTable.appendChild(firstrow);
         
         var fourthcolumn = document.createElement("th");
         fourthcolumn.setAttribute("colspan", 1);
         fourthcolumn.classList.add("score","xsmall","bright");
         fourthcolumn.innerHTML = "4";
         firstrow.appendChild(fourthcolumn);
         gameTable.appendChild(firstrow);
         
         var spacer = document.createElement("th");
         spacer.setAttribute("colspan", 1);
         spacer.innerHTML = "";
         firstrow.appendChild(spacer);
         gameTable.appendChild(firstrow);
         
         var spacer2 = document.createElement("th");
         spacer2.setAttribute("colspan", 1);
         spacer2.innerHTML = "";
         firstrow.appendChild(spacer2);
         gameTable.appendChild(firstrow);
         
         var totalcolumn = document.createElement("th");
         totalcolumn.setAttribute("colspan", 1);
         totalcolumn.classList.add("score","small","bright");
         totalcolumn.innerHTML = "T";
         firstrow.appendChild(totalcolumn);
         gameTable.appendChild(firstrow);
         
         
         var awayTemp = document.createElement("tr");
         var awayTempColumn = document.createElement("td");
         var awayImg = '<img class="logo" src="modules/MMM-NBA/icons/'+ scores.visitor.nickname +'.png"> ' + scores.visitor.nickname;
         awayTempColumn.setAttribute("colspan", 3);
         awayTempColumn.classList.add("awayteam"); 
		 awayTempColumn.innerHTML = awayImg;	
		 
         
         awayTemp.appendChild(awayTempColumn);
         gameTable.appendChild(awayTemp);
         
         
        
         var awayScore1Column = document.createElement("td");
         awayScore1Column.setAttribute("colspan", 1);
         if (qtr >= 1){		
		 awayScore1Column.innerHTML = scores.visitor.linescores.period[0].score;
		 } else {
		 awayScore1Column.innerHTML = "0";	
		 }
         awayTemp.appendChild(awayScore1Column);
         gameTable.appendChild(awayTemp);
		 
		 var spacer = document.createElement("td");
         spacer.setAttribute("colspan", 1);
         spacer.innerHTML = "";
         awayTemp.appendChild(spacer);
         gameTable.appendChild(firstrow);
		
         var awayScore2Column = document.createElement("td");
         awayScore2Column.setAttribute("colspan", 1);
         if (qtr >= 1){
		 awayScore2Column.innerHTML = scores.visitor.linescores.period[1].score;
		 } else {
		 awayScore2Column.innerHTML = "0";	
		 }	
         awayTemp.appendChild(awayScore2Column);
         gameTable.appendChild(awayTemp);
         
		  
		 var spacer = document.createElement("td");
         spacer.setAttribute("colspan", 1);
         spacer.innerHTML = "";
         awayTemp.appendChild(spacer);
         gameTable.appendChild(awayTemp); 
         
         var awayScore3Column = document.createElement("td");
         awayScore3Column.setAttribute("colspan", 1);
		 if (qtr >= 1){
		 awayScore3Column.innerHTML = scores.visitor.linescores.period[2].score;
		 } else {
		 awayScore3Column.innerHTML = "0";	
		 }
         awayTemp.appendChild(awayScore3Column);
         gameTable.appendChild(awayTemp);
         
		 
		 var spacer = document.createElement("td");
         spacer.setAttribute("colspan", 1);
         spacer.innerHTML = "";
         awayTemp.appendChild(spacer);
         gameTable.appendChild(awayTemp);
		 
		 var awayScore4Column = document.createElement("td");
         awayScore4Column.setAttribute("colspan", 1);
		 if (qtr >= 1){
		 awayScore4Column.innerHTML = scores.visitor.linescores.period[3].score;
		 } else {
		 awayScore4Column.innerHTML = "0";	
		 }
         awayTemp.appendChild(awayScore4Column);
         gameTable.appendChild(awayTemp);
         
		 
         var spacer = document.createElement("td");
         spacer.setAttribute("colspan", 1);
         spacer.innerHTML = "";
         awayTemp.appendChild(spacer);
         gameTable.appendChild(awayTemp);
         
         var spacer2 = document.createElement("td");
         spacer2.setAttribute("colspan", 1);
         spacer2.innerHTML = "";
         awayTemp.appendChild(spacer2);
         gameTable.appendChild(awayTemp);
         
         var awayScoreTotalColumn = document.createElement("td");
         awayScoreTotalColumn.setAttribute("colspan", 1);
         if (scores.period_time.period_value === "" || null || undefined){
		 awayScoreTotalColumn.innerHTML = "0";
		 } else {
		 awayScoreTotalColumn.innerHTML = scores.visitor.score;	
		 }
         awayTemp.appendChild(awayScoreTotalColumn);
         gameTable.appendChild(awayTemp);
         

         
         var homeTemp = document.createElement("tr");
         var homeTempColumn = document.createElement("td");
         var homeImg = '<img class="logo" src="modules/MMM-NBA/icons/'+ scores.home.nickname +'.png"> ' + scores.home.nickname;
         homeTempColumn.setAttribute("colspan", 3);
         homeTempColumn.classList.add("hometeam");
         homeTempColumn.innerHTML = '<img class="logo" src="modules/MMM-NBA/icons/'+ scores.home.nickname +'.png"> ' + scores.home.nickname;
         homeTemp.appendChild(homeTempColumn);
         gameTable.appendChild(homeTemp);
         
         var homeScore1Column = document.createElement("td");
         homeScore1Column.setAttribute("colspan", 1);
		 if (qtr >= 1){
		 homeScore1Column.innerHTML = scores.home.linescores.period[0].score;
		 } else {
		 homeScore1Column.innerHTML = "0";	
		 }	
         homeTemp.appendChild(homeScore1Column);
         gameTable.appendChild(homeTemp);
         
		  var spacer = document.createElement("td");
         spacer.setAttribute("colspan", 1);
         spacer.innerHTML = "";
         homeTemp.appendChild(spacer);
         gameTable.appendChild(homeTemp);
		
         var homeScore2Column = document.createElement("td");
         homeScore2Column.setAttribute("colspan", 1);
		 if (qtr >= 1){
		 homeScore2Column.innerHTML = scores.home.linescores.period[1].score;
		 } else {
		 homeScore2Column.innerHTML = "0";	
		 }	
         homeTemp.appendChild(homeScore2Column);
         gameTable.appendChild(homeTemp);
         
		 
		  var spacer = document.createElement("td");
         spacer.setAttribute("colspan", 1);
         spacer.innerHTML = "";
         homeTemp.appendChild(spacer);
         gameTable.appendChild(homeTemp);
         
         var homeScore3Column = document.createElement("td");
         homeScore3Column.setAttribute("colspan", 1);
		 if (qtr >= 1){
		 homeScore3Column.innerHTML = scores.home.linescores.period[2].score;
		 } else {
		 homeScore3Column.innerHTML = "0";	
		 }
         homeTemp.appendChild(homeScore3Column);
         gameTable.appendChild(homeTemp);
         
		 
		  var spacer = document.createElement("td");
         spacer.setAttribute("colspan", 1);
         spacer.innerHTML = "";
         homeTemp.appendChild(spacer);
         gameTable.appendChild(homeTemp);
		 
		 var homeScore4Column = document.createElement("td");
         homeScore4Column.setAttribute("colspan", 1);
		 if (qtr >= 1){
		 homeScore4Column.innerHTML = scores.home.linescores.period[3].score;
		 } else {
		 homeScore4Column.innerHTML = "0";	
		 }
         homeTemp.appendChild(homeScore4Column);
         gameTable.appendChild(homeTemp);
         
         var spacer = document.createElement("td");
         spacer.setAttribute("colspan", 1);
         spacer.innerHTML = "";
         homeTemp.appendChild(spacer);
         gameTable.appendChild(homeTemp);
         
         var spacer2 = document.createElement("td");
         spacer2.setAttribute("colspan", 1);
         spacer2.innerHTML = "";
         homeTemp.appendChild(spacer2);
         gameTable.appendChild(homeTemp);
         
         var homeScoreTotalColumn = document.createElement("td");
         awayScoreTotalColumn.setAttribute("colspan", 1);
         if (scores.home.score === "" || null || undefined){
		 homeScoreTotalColumn.innerHTML = "0";
		 } else {
		 homeScoreTotalColumn.innerHTML = scores.home.score;	
		 }
         homeTemp.appendChild(homeScoreTotalColumn);
         gameTable.appendChild(homeTemp);
         
         
         var statusTemp = document.createElement("tr");
         var statusTempColumn = document.createElement("td");
         statusTempColumn.setAttribute("colspan", 1);
         statusTempColumn.classList.add("xsmall", "dimmed", "venueTop");
		 statusTempColumn.innerHTML = scores.arena;	
         statusTemp.appendChild(statusTempColumn);
         gameTable.appendChild(statusTemp);
 
         
         var venuetemp = document.createElement("tr");
         var venuetempColumn = document.createElement("td");
         venuetempColumn.setAttribute("colspan", 4);
         if (scores.period_time.period_status === " "){
         venuetempColumn.classList.add("xsmall", "dimmed", "venueBottom");	
		 venuetempColumn.innerHTML = "Game Time:  " + scores.period_time.period_status;	
		 } else {
		 venuetempColumn.classList.add("xsmall", "final");	
		 venuetempColumn.innerHTML = scores.period_time.period_status;	
		 }
         
		 
		 venuetemp.appendChild(venuetempColumn);
         gameTable.appendChild(venuetemp);
         
         top.appendChild(gameTable);
         wrapper.appendChild(top);
       }
        
         return wrapper;
        
     },
     
     processNBA: function(data) {
         this.nba = data.game;
         this.loaded = true;
     },
     
     scheduleCarousel: function() {
         console.log("Showing NBA games today");
         this.rotateInterval = setInterval(() => {
             this.activeItem++;
             this.updateDom(this.config.animationSpeed);
         }, this.config.rotateInterval);
     },
     
     scheduleUpdate: function() {
         setInterval(() => {
             this.getNBA();
         }, this.config.updateInterval);
         this.getNBA(this.config.initialLoadDelay);
     },
     
      getNBA: function() {
         this.sendSocketNotification('GET_NBA');
     },

        socketNotificationReceived: function(notification, payload) {
         if (notification === 'NBA_RESULTS') {
             this.processNBA(payload);
             if (this.rotateInterval == null) {
                 this.scheduleCarousel();
             }
             this.updateDom(this.config.animationSpeed);
         }
     },
});
