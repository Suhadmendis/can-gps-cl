function GetXmlHttpObject() {
    var xmlHttp = null;
    try {
        // Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
    } catch (e) {
        // Internet Explorer
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xmlHttp;
}


function getdt() {

    xmlHttp = GetXmlHttpObject();
    if (xmlHttp == null) {
        alert("Browser does not support HTTP Request");
        return;
    }

    var url = "mapp_data.php";
    url = url + "?Command=" + "live";
    url = url + "&ls=" + "new";

    

    xmlHttp.onreadystatechange = assign_dt;
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}


var locations = [];

var vehiNo = '';
var vehiAC = '';
var vehiENG = '';
var vehiSTATUS = '';
var vehiSTOPTIME = '';
var vehiLOC = '';


function assign_dt() {
    var XMLAddress1;

    if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete")
    {
  
         XMLAddress1 = xmlHttp.responseXML.getElementsByTagName("driver");
        // document.getElementById('uniq').value = XMLAddress1[0].childNodes[0].nodeValue;

        // console.log(xmlHttp.responseXML); 
        var obj = JSON.parse(XMLAddress1[0].childNodes[0].nodeValue);
        var loc = [];
        for (var i=0; i<XMLAddress1.length; i+=1) {
         loc.push(JSON.parse(XMLAddress1[i].childNodes[0].nodeValue));

          
        }
        
        XMLAddress1 = xmlHttp.responseXML.getElementsByTagName("vehiNo");
        vehiNo = XMLAddress1[0].childNodes[0].nodeValue;
        XMLAddress1 = xmlHttp.responseXML.getElementsByTagName("vehiAC");
        vehiAC = XMLAddress1[0].childNodes[0].nodeValue;
        XMLAddress1 = xmlHttp.responseXML.getElementsByTagName("vehiENG");
        vehiENG = XMLAddress1[0].childNodes[0].nodeValue;
        XMLAddress1 = xmlHttp.responseXML.getElementsByTagName("vehiSTATUS");
        vehiSTATUS = XMLAddress1[0].childNodes[0].nodeValue;
        XMLAddress1 = xmlHttp.responseXML.getElementsByTagName("vehiSTOPTIME");
        vehiSTOPTIME = XMLAddress1[0].childNodes[0].nodeValue;
     


        locations = loc;

    }
}

function initMap() {
console.log(locations);
   // xmlHttp = GetXmlHttpObject();
   //  if (xmlHttp == null) {
   //      alert("Browser does not support HTTP Request");
   //      return;
   //  }

   //  var url = "mapp_data.php";
   //  url = url + "?Command=" + "backtrack";
   //  url = url + "&ls=" + "new";

    

   //  xmlHttp.onreadystatechange = show;
   //  xmlHttp.open("GET", url, true);
   //  xmlHttp.send(null);

  showVehi();

}




function showVehi() {
  // var map = new google.maps.Map(document.getElementById('map'), {
  //   zoom: 10,
  //   center: {lat: 6.863225, lng: 79.877445}
  // });

    var uluru = locations[0];
    console.log(uluru);
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: uluru
        });

        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h3 id="firstHeading" class="firstHeading">Vehicle NO : '+vehiNo+'</h3>'+
            '<p>DEV Location : </p>'+
            '<p>DEV Location : Lat : '+locations[0].lat+', Lng : '+locations[0].lng+'</p>'+
            '<p>AC : '+vehiAC+'</p>'+
            '<p>Engine : '+vehiENG+'</p>'+
            '<p>Status : '+vehiSTATUS+'</p>'+
            '<p>Last Stop Time : '+vehiSTOPTIME+'</p>'+
         
            '<p><a href="backTrack.php">'+
            'Backtrack</a> '+
           
            '</div>';







        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        var marker = new google.maps.Marker({
          position: uluru,
          map: map,
          icon: 'cap.png',
          title: 'Uluru (Ayers Rock)'
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });


  // Add a marker clusterer to manage the markers.
  var markerCluster = new MarkerClusterer(map, markers,
{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}
 
