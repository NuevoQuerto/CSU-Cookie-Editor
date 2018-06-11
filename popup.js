chrome.tabs.query({'active': true}, function(tabs){
	var hostname = tabs[0].url;
	var arrayCookie = [];
  
	var cookieHostname = document.createElement("p");
	document.getElementById("cookiehostname").append(cookieHostname);
	cookieHostname.innerHTML = hostname + "<br />";
	
	// START Menampilkan Cookie
	chrome.cookies.getAll({"url": hostname}, function(kue){
		// Mengecek Apakah Cookie Kosong
		if(kue.length == 0)
		{
			$("#nocookie").html("<center><h2><b>Tidak ada cookie!!!</b></h2></center>");
			$("#savecookie").hide();
		}
		
		// Menampilkan Cookie Object
		for(i = 0; i < kue.length; i++)
		{
			// var displayArray = new Array(kue[i].name, kue[i].value);
			arrayCookie.push({domain : kue[i].domain, expirationDate : kue[i].expirationDate, hostOnly : kue[i].hostOnly, httpOnly : kue[i].httpOnly, 
							name : kue[i].name, path : kue[i].path, sameSite : kue[i].sameSite, secure : kue[i].secure, 
							session : kue[i].session, storeId : kue[i].storeId, value : kue[i].value
							});
			
			var dataCookie = document.createElement("div");
			dataCookie.className = "cookie";
			document.getElementById("dataCookie").append(dataCookie);
			dataCookie.innerHTML = "<p class=\"cookiename\">" + kue[i].name + "</p><textarea class=\"cookievalue\" name=\"" + kue[i].name + "\" rows=\"10\" cols=\"50\">" + kue[i].value + "</textarea>";
		}
	});
	// END Menampilkan Cookie
	
	// START Button Slide
	$(document).ready(function(){
		$(".cookievalue").hide();
		
		$(".cookiename").click(function(){
			$(this).closest('.cookie').find('.cookievalue').toggle();
		});
    });
	// END Button Slide
	
	// START Mengubah Cookie
	document.getElementById("savecookie").addEventListener("click", function(evt){
		var changedCookieName = [];
		var changedCookieValue = [];
		
		$(".cookiename").each(function(){
			changedCookieName.push($(this).html());
		});
		
		$(".cookievalue").each(function() {
			changedCookieValue.push($(this).val());
		});
		
		// START Membandingkan Variabel changedCookieValue Dengan Variabel arrayCookie, Apabila Berbeda Lalu Set Cookie
		for(z = 0; z < changedCookieName.length; z++)
		{
			if(changedCookieValue[z] != arrayCookie[z].value)
			{
				arrayCookie[z].value = changedCookieValue[z];
				alert(changedCookieName[z] + " Gk Sama Dengan " + arrayCookie[z].value);
				
				chrome.cookies.remove({url: hostname, name: changedCookieName[z]});
				chrome.cookies.set({url: hostname, name: arrayCookie[z].name, value: arrayCookie[z].value, domain: arrayCookie[z].domain, path: arrayCookie[z].path, secure: arrayCookie[z].secure, httpOnly: arrayCookie[z].httpOnly, sameSite: arrayCookie[z].sameSite, expirationDate: arrayCookie[z].expirationDate, storeId: arrayCookie[z].storeId});
				chrome.tabs.update(tabs[0].id, {url: hostname});
			}
		}
		// END Membandingkan Variabel arrayCookie Dengan Variabel changedCookie, Apabila Berbeda Lalu Set Cookie
	});
	// END Mengubah Cookie
});