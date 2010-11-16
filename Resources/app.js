

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
//Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

var win = Titanium.UI.currentWindow;

var annotation = Titanium.Map.createAnnotation({
	latitude:-31.848344,
	longitude:115.825403,
	title:"Boston College",
	subtitle:'Newton Campus, Chestnut Hill, MA',
	animate:true,
	image:"taxi.png"
});

var boston = {latitude:-31.848344,longitude:115.825403,latitudeDelta:0.010, longitudeDelta:0.018};


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'EggCab',
    backgroundColor:'#fff',
    barColor:'#000000'
	
});

var controls_view = Titanium.UI.createView({
	backgroundGradient:{
		type:'linear',
		colors:[{color:'#1e1e22',position:0.0},{color:'#34333d',position:1.00}]
	},
   height:120,
   bottom:0
});

var location_button = Titanium.UI.createButton({
	color:'#fff',
	backgroundImage:'./BUTT_grn_off.png',
	backgroundSelectedImage:'./BUTT_grn_on.png',
	backgroundDisabledImage: './BUTT_drk_off.png',
	top:55,
	width:301,
	height:57,
	font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'Confirm Location'
});


win1.add(controls_view);



controls_view.add(location_button);



var tab1 = Titanium.UI.createTab({  
    icon:'car.png',
    title:'Hail Cab',
    window:win1
});


var mapview = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	region: boston,
	animate:true,
	userLocation:true,
	zoom:-5000,
	height:250,
	top:0,
	annotations:[annotation]
});


win1.add(mapview);

 Ti.Geolocation.purpose = "Recieve User Location";

 Titanium.Geolocation.getCurrentPosition(function(e)
 {
     if (e.error)
     {
         alert('We cannot get your current location');
         return;
     }
  
     var longitude = e.coords.longitude;
     var latitude = e.coords.latitude;
     var altitude = e.coords.altitude;
     var heading = e.coords.heading;
     var accuracy = e.coords.accuracy;
     var speed = e.coords.speed;
     var timestamp = e.coords.timestamp;
     var altitudeAccuracy = e.coords.altitudeAccuracy;

	var currentRegion = {latitude:latitude,longitude:longitude,animate:true,latitudeDelta:0.04, longitudeDelta:0.04};

    mapview.setLocation(currentRegion);

});



var pin_image = Titanium.UI.createImageView({image:'PinDown1Purple.png', top:-150, left:0, touchEnabled:false});
win1.add(pin_image);

var address_label = Titanium.UI.createLabel({
	color:'#FFF',
	text:'',
	top:185,
	font:{fontSize:18,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win1.add(address_label);


//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Settings',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'gear.png',
    title:'Settings',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});


var connectButton = Titanium.UI.createButton({
	title:'Connect',
	width:75,
	top:10,
	height:75,
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED		
});

win2.add(connectButton);

var closeButton = Titanium.UI.createButton({
	title:'Close',
	width:75,
	top:100,
	height:75,
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED		
});
win2.add(closeButton);


win2.add(label2);



//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();



	var holder_lat = ""
	var holder_lon = ""
	

mapview.addEventListener('regionChanged', function(e) {
		
	holder_lat = e.latitude;
	holder_lon = e.longitude;
	
	url = "http://rge.heroku.com/reverse-geo-encode?lat=" + holder_lat + "&lon=" + holder_lon;

	//alert(url);
		
	var xhr = Titanium.Network.createHTTPClient();
	
	xhr.onload = function()
	{
		var stuff = JSON.parse(this.responseText);
		//alert(this.responseText);
		// alert(stuff.address);
	    address_label.text = stuff.address;
	 
	};
		// open the client
		xhr.open('GET',url);
	
		// send the data
		xhr.send();
		
	
});

	
location_button.addEventListener('click', function() {
	
   // mapview.addEventListener('regionChanged', function(e) {
   // 	holder_lat = e.latitude
   // 	holder_lon = e.longitude
   // 	
   // });
   // 
    url = "http://rge.heroku.com/reverse-geo-encode?lat=" + holder_lat + "&lon=" + holder_lon;


	//alert(url);
		
	var xhr = Titanium.Network.createHTTPClient();
	
	xhr.onload = function()
	{
		var stuff = JSON.parse(this.responseText);
		//alert(this.responseText);
		// alert(stuff.address);
	    address_label.text = stuff.address;
	 
	};
		// open the client
		xhr.open('GET',url);
	
		// send the data
		xhr.send();
	
	
	
});



connectButton.addEventListener('click', function() {
	try {
	    socket.connect();
	   	Titanium.API.info('Opened!');
	} catch (e) {
	   	Titanium.API.info('Exception: '+e);
	}
});

closeButton.addEventListener('click', function() {
	try {
		socket.close();
	} catch (e) {
		Titanium.API.info('Exception: '+e);
	}
});

var w = Ti.UI.createWindow({
	backgroundImage:'./background.png'
	
});
var b = Ti.UI.createButton({
	title:'Close',
	top:80,
	width:100,
	height:30
});
b.addEventListener('click',function()
{
	w.close();
});




var image = Titanium.UI.createImageView({url:'egg.png', width:128, top:20});

w.add(b);
w.add(image)
