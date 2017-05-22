# MMM-NBA


NBA Score modules for MM2

~MagicMirror/modules

git clone https://github.com/cowboysdude/MMM-NBA

THEN in your config.js.....

    Config Options:
    maxWidth: Default is set to 500px you can make it any number
    header: do you want the header?  true = yes, false = no
    logo: do you want the NBA logo?  true = yes, false = no [If set to yes, header must also be yes]
    focus_on: [""] - must be set by teams nickname, uppercase in quotation marks.  More than one seperated by coma -
                     SEE EXAMPLE BELOW.

 ____________________________________CONFIG.JS_____________________________________
          
	   {
        	disabled: false,
			module: 'MMM-NBA',
			position: 'middle_center',
			config: {
				maxWidth: "500px",
				header: true,
				logo: true,
				focus_on: ["Trail Blazers","Bulls"]
			}
		},

________________________________________________________________________________________


![alt tag](http://www.dallascowboyschat.com/mm/NBA.JPG)
