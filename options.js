document.getElementById("submit").addEventListener("click", function(evt){
   	var hostname = document.forms["debug"]["hostname"].value;
	
	var node = document.createElement("p");
	node.appendChild(document.createTextNode("Domain = " + hostname));
	node.appendChild(document.createElement("br"));
	
	
	chrome.tabs.query({'active': true}, function(tabs) {
	  
		chrome.cookies.getAll({"url": hostname}, function(kue){
			
			console.log(kue);

			for(i = 0; i < kue.length; i++)
			{
				var cookieObject = [
					["domain", kue[i].domain], ["expirationDate", kue[i].expirationDate], ["hostOnly", kue[i].hostOnly], ["httpOnly", kue[i].httpOnly],
					["name", kue[i].name], ["path",kue[i].path], ["sameSite", kue[i].sameSite], ["secure", kue[i].secure],
					["session", kue[i].session], ["storeId", kue[i].storeId], ["value", kue[i].value]
				]
				
				node.appendChild(document.createElement("br"));
				node.appendChild(document.createTextNode(i + ":"));
				node.appendChild(document.createElement("br"));
				
				for(x = 0; x < 11; x++)
				{
					node.appendChild(document.createTextNode(cookieObject[x][0]  + ": " + cookieObject[x][1]));
					node.appendChild(document.createElement("br"));
					document.getElementById("debugger").appendChild(node);
				}
				
				node.appendChild(document.createElement("br"));
			}
		});
	});
	
	evt.preventDefault();
});