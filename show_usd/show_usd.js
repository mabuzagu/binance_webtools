(function() {

	var url = "https://api.coinmarketcap.com/v1/ticker/?limit=0";

	var pageTitle = $("body > div.wrap > div > div > div.itemTitle.ng-binding").text();

	if(pageTitle === "Trading History") {

		$.get(url, function(data) {

			$("body > div.wrap > div > div > table > tbody > tr").each(function(){

				var feeParts = $(this).find("td:nth-child(6)").text().split(" ");
				var feeQty = feeParts[0];
				var feeSymbol = feeParts[1];
				var feeData = data.filter(function(obj) {
					return (obj.symbol === feeSymbol);
				});
				var feeUSD = feeQty * feeData[0].price_usd;
				$(this).find("td:nth-child(6)").append(" / " + parseFloat(feeUSD).toFixed(3) + "USD");

				var totalParts = $(this).find("td:nth-child(7)").text().split(" ");
				var totalQty = totalParts[0];
				var totalSymbol = totalParts[1];
				var totalData = data.filter(function(obj) {
					return (obj.symbol == totalSymbol);
				});
				var totalUSD = totalQty * totalData[0].price_usd;
				$(this).find("td:nth-child(7)").append(" / " + parseFloat(totalUSD).toFixed(2) + " USD");

			});


		});
	}

})();
