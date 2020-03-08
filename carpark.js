var ilceListesi = new Array();
var parkList = new Array();

$(document).ready(function () {
    haritaEkle2();
    ajaxCall();
});

function ajaxCall(){
    $.ajax({
        type: 'GET',
        url: "https://api.ibb.gov.tr/ispark/Park",
        dataType: "json",
        success: function(data){

            var flag=0;

            for(var i=0; i<data.length; i++) {
                for(var j=0; j<ilceListesi.length; j++){
                    if(ilceListesi[j] == data[i].Ilce){
                        flag = 1;
                        break;
                    }
                    else{
                        flag = 0;
                    }
                }
                if(flag == 0) {
                    ilceListesi.push(data[i].Ilce);
                }
            }

            for(var i=0; i<ilceListesi.length; i++){
                var park = new Object();
                park.ilceadi = ilceListesi[i];
                var liste=new Array();
                for(var j=0; j<data.length; j++){
                    var lonlatpark = new Object();
                    if(data[j].Ilce == park.ilceadi){
                        lonlatpark.parkyeri = data[j].ParkAdi;
                        lonlatpark.kapasite = data[j].Kapasitesi;
                        lonlatpark.boskapasite = data[j].BosKapasite;
                        lonlatpark.long=data[j].Longitude;
                        lonlatpark.lat = data[j].Latitude;
                        liste.push(lonlatpark);
                    }
                    park.parkyerleri = liste;
                }
                parkList.push(park);
            }
            console.log(parkList);
            ilceListesiniAl();
        }
    });
}

function ilceListesiniAl() {

    var html_etiket = "<ul style='list-style-type:none' class='liste'>";

    for(var i=0; i<parkList.length; i++){
        html_etiket += " <li><a class='ilce-link' href='#' onclick='parkYeriListesiAl(this)' >"+ parkList[i].ilceadi+"</a></li>";
    }

    html_etiket += "</ul>";
    var dvList = document.getElementById("ilce-list");
    dvList.innerHTML = html_etiket;

    $("#ilce-input").keyup(function() {
        var inputVal = $(this).val();
        var inputValue = inputVal.toUpperCase();
        var html_etiket = "<ul style='list-style-type:none' class='liste'>";
        if(inputValue !== " "){
            for(var k=0; k<ilceListesi.length; k++) {
                var n = ilceListesi[k].search(inputValue);
                var stri = "'"+ilceListesi[k]+"'";
                if(n !== -1) {
                    html_etiket += " <li><a class='ilce-link' href = '#' onclick='parkYeriListesiAl(this)'>"+ ilceListesi[k]+"</a></li>";
                }
            }
            html_etiket += "</ul>";
            var dvList = document.getElementById("ilce-list");
            dvList.innerHTML = html_etiket;
        }
    });
}

function parkYeriListesiAl(obje) {

    var str = obje.innerText.toString();
    var html_etiket = "<ul class='liste'>";
    var parkYeriListesi = new Array();

    for(var i=0; i<parkList.length; i++){
        if(parkList[i].ilceadi == str){
            for(var j=0; j<parkList[i].parkyerleri.length; j++){
                parkYeriListesi.push(parkList[i].parkyerleri[j]);
                html_etiket += " <li><a href='#' class='park-link' onclick='kapasiteGoster(this)'>"+parkList[i].parkyerleri[j].parkyeri+"</a></li>";
            }
        }
    }

    html_etiket += "</ul>";
    var dvList = document.getElementById("park-list");
    dvList.innerHTML = html_etiket;

    $("#park-input").keyup(function() {
       var inputVal = $(this).val().toString();
       var inputValue = inputVal.toUpperCase();
       var html_etiket1 = "<ul class='liste'>";

       if(inputValue !== " "){
           for(var k=0; k<parkYeriListesi.length; k++) {
               var n1 = (parkYeriListesi[k].parkyeri.toString()).toUpperCase();
               var n= n1.search(inputValue);
               if(n !== -1) {
                   html_etiket1 += " <li><a href='#' class='park-link' onclick='kapasiteGoster(this)'>"+ parkYeriListesi[k].parkyeri+"</a></li>";
               }
           }
           html_etiket1 += "</ul>";
           var dvList = document.getElementById("park-list");
           dvList.innerHTML = html_etiket1;
       }
   });
}

function haritaEkle2() {
    mymap = new OpenLayers.Map("carpark-map");

    mymap.addLayer(new OpenLayers.Layer.OSM());

    var coordinates = new OpenLayers.LonLat( 28.94966 ,41.01384 )
        .transform(
            new OpenLayers.Projection("EPSG:4326"),
            mymap.getProjectionObject()
        );
    
    mymap.setCenter (coordinates, 9);
}

function haritaEkle(latitude, longitude) {
        var lat = Number(latitude);
        var long = Number(longitude);

        var coordinates = new OpenLayers.LonLat(long, lat)
            .transform(
                new OpenLayers.Projection("EPSG:4326"),
                mymap.getProjectionObject()
            );

        var markers = new OpenLayers.Layer.Markers( "Markers1" );
        mymap.addLayer(markers);
        markers.addMarker(new OpenLayers.Marker(coordinates));
        mymap.setCenter (coordinates, 18);
}


function kapasiteGoster(obje) {
    var str = obje.innerText.toString();
    var longitude;
    var latitude;
    var kapasite;
    var boskapasite;
    for(var i=0; i<parkList.length; i++){
        for(var j=0; j<parkList[i].parkyerleri.length; j++){
            if((parkList[i].parkyerleri[j].parkyeri).toString() == str){
                longitude = parkList[i].parkyerleri[j].long;
                latitude = parkList[i].parkyerleri[j].lat;
                kapasite = parkList[i].parkyerleri[j].kapasite;
                boskapasite = parkList[i].parkyerleri[j].boskapasite;
            }
        }
    }
    var stri = ""+ kapasite-boskapasite + " / "+ kapasite;
    var cap = document.getElementById('kapasite-degeri');
    cap.innerHTML = stri;

    haritaEkle(latitude, longitude);
}