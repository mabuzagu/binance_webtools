(function() {

	var priceList = {};
	var pageTitle = $("body > div.wrap > div > div > div.itemTitle.ng-binding").text().trim();
    console.log(pageTitle);

    $.ajaxSetup({async:false});

	if(pageTitle === "Trade History") {

		$("body > div.wrap > div > div > table > tbody > tr").each(function(){

			var feeParts = $(this).find("td:nth-child(6)").text().split(" ");
			var feeQty = feeParts[0];
			var feeSymbol = feeParts[1];
			var feePrice = getPriceForSymbol(feeSymbol);
			var feeUSD = feeQty * feePrice
			$(this).find("td:nth-child(6)").append(" / " + parseFloat(feeUSD).toFixed(3) + "USD");

			var totalParts = $(this).find("td:nth-child(7)").text().split(" ");
			var totalQty = totalParts[0];
			var totalSymbol = totalParts[1];
			var totalPrice = getPriceForSymbol(totalSymbol);
			var totalUSD = totalQty * totalPrice;
			$(this).find("td:nth-child(7)").append(" / " + parseFloat(totalUSD).toFixed(2) + " USD");

		});

	}

	if(pageTitle === "Order History") {

		$("body > div.wrap > div > div > table > tbody > tr:nth-child(2) > td > table").each(function(){

            var totalText = $(this).find("tbody > tr:nth-child(1) td:nth-child(9)").text();

            if(totalText.trim() !== "--") {
                var totalParts = totalText.trim().split(" ");
    			var totalQty = totalParts[0];
    			var totalSymbol = totalParts[1];
    			var totalPrice = getPriceForSymbol(totalSymbol);
    			var totalUSD = totalQty * totalPrice;
    			$(this).find("td:nth-child(9)").append(" / " + parseFloat(totalUSD).toFixed(2) + "");
            } else {
                console.log('Tta');
            }

		});

	}

	var depWith = $("body > div.wrap > div > div > div.chargeWithdraw-title.f-cb > h3").text().trim();

	if(depWith === "Deposits & Withdrawals") {

		$("body > div.wrap > div > div > ul > li").each(function(){

            var totalText = $(this).find("> div > div.equalValue.f-right.ng-binding").text();
            console.log(totalText);

          if(totalText.trim() !== "--") {
	    			var totalQty = totalText;
	    			var totalSymbol = "BTC"
	    			var totalPrice = getPriceForSymbol(totalSymbol);
	    			var totalUSD = totalQty * totalPrice;
	    			$(this).find("> div > div.equalValue.f-right.ng-binding").append(" / " + parseFloat(totalUSD).toFixed(2) + " USD");
	        }
		});

	}

	function getPriceForSymbol(symbol) {

		if(priceList[symbol] === undefined) {
			var url = "https://min-api.cryptocompare.com/data/price?fsym=" + symbol + "&tsyms=USD";
			$.get(url, function(data) {
			    priceList[symbol] = data.USD
			});

	    }

		return priceList[symbol];
	}

})();
