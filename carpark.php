<!DOCTYPE html>
<html lang="en">
<head>
    <link href="carpark.css" rel="stylesheet" type="text/css">

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8;"/>
    <meta http-equiv="Content-language" content="tr"/>

    <script src="jquery.min.js"></script>
    <script src="carpark.js"></script>
    <script src="http://www.openlayers.org/api/OpenLayers.js"></script>

    <title>CAR PARK</title>
</head>
<body>
    <div class="general">
        <div id="ilce" class="ilce">
            <h4>İlçe Listesi</h4>
            <input type="text" id="ilce-input" class="ilce-input"/>
            <div class="ilce-list" id="ilce-list"></div>
        </div>
	<?php $name = 0 ?>
        <div id="park" class="park">
            <h4>Park Yeri Listesi</h4>
            <input type="text" id="park-input" class="park-input"/>
            <div class="park-list" id="park-list"></div>
        </div>
    </div>
    <h2 id="kapasite-degeri"></h2>

    <div class="capacity">
        <div id="carpark-map" class="carpark-map">
        </div>
    </div>

</body>
</html>
