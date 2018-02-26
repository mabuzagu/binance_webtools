(function() {

	var url = "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR"

	var priceList = {};

	var pageTitle = $("body > div.wrap > div > div > div.itemTitle.ng-binding").text();

	if(pageTitle === "Trade History") {

		console.log("Running Trade History");

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

		console.log("Running Order History");

		$("body > div.wrap > div > div > table > tbody > tr").each(function(){

			var totalParts = $(this).find("td:nth-child(9)").text().split(" ");
			var totalQty = totalParts[0];
			var totalSymbol = totalParts[1];
			var totalData = data.filter(function(obj) {
				return (obj.symbol == totalSymbol);
			});
			var totalUSD = totalQty * totalData[0].price_usd;
			$(this).find("td:nth-child(7)").append(" / " + parseFloat(totalUSD).toFixed(2) + " USD");

		});

	}

	function getPriceForSymbol(symbol) {

		if(priceList.{symbol} == undefined)

			console.log("Go get price");
			// $.get(url, function(data) {
			//
			// });

		)

		return priceList.{symbol};


	}



})();
