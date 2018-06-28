
var pyoLib={
	utils : {
		luhn_checksum : function(str){

			function sumDigits(x) {
				x = String(x);
				return parseInt(x[0]) + parseInt(x[1]);
			}
			str = String(str).split("").reverse().join("");

			var sum = 0;
			for (var i = 0; i < str.length; i++) {
				if ((i % 2) == 0) {
					sum += parseInt(str[i]);

				} else {
					var dub = parseInt(str[i]) * 2;
					if (dub > 9) {
						dub = sumDigits(dub);
					}
					sum += parseInt(dub);
				}
			}
			return sum % 10;
		}
		
		
	},
	
	chabad : {
		destroySelection : function(selector){
			var deler=document.querySelector(selector);
			while(deler!==null){
				deler.parentNode.removeChild(deler);
				deler=document.querySelector(selector);
			}
		},
		
		destroyALL : function(...selector){
			selector.map(pyoLib.chabad.destroySelection);
		}
	}
};


