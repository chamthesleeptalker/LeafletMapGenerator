AngularjsApp.controller("MapGenerator", function($scope, $http, $routeParams, $route){
    //initializations
    $scope.width = $routeParams.width;
    $scope.height = $routeParams.height;
    $scope.latitude = $routeParams.latitude;
    $scope.longitude = $routeParams.longitude;
    $scope.zoom = $routeParams.zoom;
    $scope.code = $routeParams.code;

    $scope.name = "";
    $scope.address = "";
    $scope.contact = "";

    $scope.name = $routeParams.name;
    $scope.address = $routeParams.address;
    $scope.contact = $routeParams.contact;

    var iniMap="";
    var addMarker="";
    var content="";
    var mainCode="";

    var holder = "\'map\'";
    var tile = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
    var attrb = "&copy; <a href=\"http://osm.org/copyright\">OpenStreetMap<\/a> contributors";

    var lat = 14;
    var lon =121;

    var marker = L.marker([lat, lon], {
            draggable: true
        });


    //Adds a specific marker to the map
    $scope.generate = function(){

        //check if there are no empty fields!
        function checkFields(scope_field,input_id){
            if(scope_field === undefined){
                $(input_id).addClass("error");
                return true;
            }else{
                $(input_id).removeClass("error");
                return false;
            }
        };

       iniMap = "\tvar map = L.map("+holder+").setView(["+$scope.latitude+","+$scope.longitude+"],"+$scope.zoom+");\n"+
        "\t\tL.tileLayer(\'"+tile+"\', {\n"+
        "\t\tattribution: \'"+attrb+"\'\n"+
        "\t\t}).addTo(map);\n";

        if( (checkFields($scope.name,"#name") === true &&
            checkFields($scope.address,"#address")=== true &&
            checkFields($scope.contact,"#contact")=== true &&
            checkFields($scope.latitude,"#lat") === true &&
            checkFields($scope.longitude,"#lon") === true &&
            checkFields($scope.zoom,"#zoom") === true) ){

            $("#errorMess").show();

            setTimeout(function() {
               $("#errorMess").hide();   
            }, 5000);

        }else if((checkFields($scope.name,"#name") === true &&
            checkFields($scope.address,"#address")=== true &&
            checkFields($scope.contact,"#contact")=== true &&
            checkFields($scope.latitude,"#lat") === false &&
            checkFields($scope.longitude,"#lon") === false &&
            checkFields($scope.zoom,"#zoom") === false)
            ){


            $("#errorMess").show();

            setTimeout(function() {
               $("#errorMess").hide();   
            }, 5000);

        }else{
            content = "<b>"+$scope.name+"</b><br><i>"+$scope.address+"</i><br>"+$scope.contact+"";

            marker.bindPopup(content).openPopup();

            addMarker ="\tL.marker(["+$scope.latitude+","+$scope.longitude+"]).addTo(map).bindPopup("+content+").openPopup();";
            mainCode= "<script>\n\n"+iniMap+"\n\n"+addMarker+"\n\n"+"</script>";
            $scope.code = mainCode;
            $scope.safeApply(function(){
                //console.log("in lieu : zoom");
            });

        }



        /*
        if ($scope.name != "" | $scope.address != "" | $scope.contact != "") {
            content = "<b>"+$scope.name+"</b><br><i>"+$scope.address+"</i><br>"+$scope.contact+"";

            marker.bindPopup(content).openPopup();

            addMarker ="\tL.marker(["+$scope.latitude+","+$scope.longitude+"]).addTo(map).bindPopup("+content+").openPopup();";
            mainCode= "<script>\n\n"+iniMap+"\n\n"+addMarker+"\n\n"+"</script>";
            $scope.code = mainCode;
            $scope.safeApply(function(){
                //console.log("in lieu : zoom");
            });
        }else if(($scope.name === "" | $scope.address === "" | $scope.contact === "") && ($scope.latitude === undefined | $scope.longitude === undefined | $scope.zoom === undefined)){
            alert("Follow the instructions & Click 'This Button'");
        }else if ($scope.name === undefined){
            alert("undefined");
        }else{
            addMarker ="\tL.marker(["+$scope.latitude+","+$scope.longitude+"]).addTo(map);";
            mainCode= "<script>\n\n"+iniMap+"\n\n"+addMarker+"\n\n"+"</script>";
            $scope.code = mainCode;
            console.log($scope.code);
            $scope.safeApply(function(){
                //console.log("in lieu : zoom");
            });
        }*/
    };

    //refreshes the controller to generate new maps
    $scope.onNew = function(){
        $route.reload();
    };

    //replaces $scope.$apply() to avoid "$apply() is already in progress" error 
    $scope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };

    //search function which allows the map to specify the lat and long and the zoom level
    $scope.drag=function(){

            marker.addTo(map);

        // every time the marker is dragged, update the coordinates container
        marker.on('dragend', ondragend);
        // Set the initial marker coordinate on load.
        ondragend();

        function ondragend() {
            var m = marker.getLatLng();
            lat = m.lat;
            lon = m.lng;
            //console.log('Latitude: ' + lat + '<br />Longitude: ' + lon);
            $scope.latitude = parseFloat(lat).toFixed(3); 
            $scope.longitude = parseFloat(lon).toFixed(3);

            $scope.safeApply(function(){
                //console.log("in lieu : lat & long");
            });
            //console.log('Latitude: ' + $scope.latitude + '<br />Longitude: ' + $scope.longitude);
        }

        //update zooom input when map zoom changes
        map.on('zoomend',onzoomend);
        onzoomend();
        function onzoomend(){
            $scope.zoom = map._zoom;

            $scope.safeApply(function(){
                //console.log("in lieu : zoom");
            });
        }



    };

})