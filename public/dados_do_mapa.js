require([
    'dojo/text!./dados_do_mapa.csv',
    'dojo/string'], function (dados,string) {

	
	//Limpando o SearchBox
	document.getElementById("search_map1").value= "";
	document.getElementById("search_map2").value= "";
	
        //PLOTANDO O IPGG
        LatLngIpgg = {lat: -23.4918588, lng: -46.44605790000003};
		var geocoder = new google.maps.Geocoder();

        infoWindowContentIpgg = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">IPGG - Instituto Paulista de Geriatria e Gerontologia</h1>'+
            '<div id="bodyContent">'+
            '<table>'+
            '<tr>'+
            '<td> <img src="./img/logo.jpg"></td>'+
            '<td id= "addressIPGG"> Praça Padre Aleixo Monteiro Mafra, 34 - São Miguel Paulista</td>'+
            '</tr>'+
            '</table>'+
            '<a href="http://www.saude.sp.gov.br/instituto-paulista-de-geriatria-e-gerontologia-ipgg-jose-ermirio-de-moraes/">http://www.saude.sp.gov.br/instituto-paulista-de-geriatria-e-gerontologia-ipgg-jose-ermirio-de-moraes/</a>'+
			'<button onclick="setSearchBox1(LatLngIpgg)">Definir como saída</button>'+
			'<button onclick="setSearchBox2(LatLngIpgg)">Definir como chegada</button>'+
            '</div>'+
            '</div>';

			
        var infowindow = new google.maps.InfoWindow({
            content: infoWindowContentIpgg
        });
        map = new google.maps.Map(document.getElementById('map'), {
            center: LatLngIpgg,
            zoom: 13,            
        });    
        var marker = new google.maps.Marker({
            position: LatLngIpgg,
            map: map
        });
        marker.setIcon('img/mapIcon.jpg');
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
		

        //OBTENDO DADOS DOS DEMAIS LOCAIS PARA PLOTAGEM        
        var rows = dados.split("\n");
	rows.forEach( function getvalues(aRow) {
            dadosDoLocal={}
            let aRowColumns = aRow.split(";");
            let nomeDoLocal = aRowColumns[0];
            let endDoLocal = aRowColumns[1];
            let latitude = aRowColumns[2];
            let longitude = aRowColumns[3];
            let especialidades = aRowColumns[7];
            let position;
            dadosDoLocal.nomeDoLocal = nomeDoLocal;
            dadosDoLocal.endDoLocal = endDoLocal;

            if(latitude != null && longitude != null){
                latitudeF = parseFloat(latitude);
                longitudeF = parseFloat(longitude);
                
                dadosDoLocal.latitude = latitudeF;
                dadosDoLocal.longitude = longitudeF;
                position = {lat: latitudeF, lng: longitudeF};
                dadosDoLocal.position = position;
            }

            dadosDoLocal.tipo = aRowColumns[4];
            dadosDoLocal.cor =  aRowColumns[5];
            dadosDoLocal.especialidades = especialidades;
            locais.push(dadosDoLocal);
        });//rows.forEach
        

        //PLOTANDO DEMAIS LOCAIS
			//console.log("$endereco:  "${endereco}.innerHTML);
			//var address01 = local.endDoLocal;
			
			infoWindowContent = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">${nome}</h1>'+
            '<div id="bodyContent">'+
            '<p id="${endId}">${endereco}<p>'+
            '<p>${tipo}</p>'+
            '<p><strong>Especialidades</strong>:${especialidades}</p>'+
			'<button onclick="setSearchBox01(\'${endId}\')">Definir como saída</button>'+
			'<button onclick="setSearchBox02(\'${endId}\')">Definir como chegada</button>'+
            '</div>'+
            '</div>';
       
	   var NLocal = 0;
        locais.forEach(function(local){
			
			NLocal= NLocal+1;
            if(local.latitude == null || local.longitude == null || isNaN(local.position.lat) || isNaN(local.position.lng)){
                //console.log(local.nomeDoLocal +" nao pode ser plotado");
            }else{
				var latlngid= local.position.lat.toString()+local.position.lng.toString();
				var localInfoWindowContent = string.substitute(infoWindowContent,
                                               {
                                                   endereco:local.endDoLocal,
                                                   nome:local.nomeDoLocal,
                                                   tipo:local.tipo,
                                                   especialidades: local.especialidades,
												   endId:local.position.lat.toString() +local.position.lng.toString()
												   
                                               });
                var infowindow = new google.maps.InfoWindow({
                    content: localInfoWindowContent,
				
					maxWidth: 180
                });
                var marker = new google.maps.Marker({
                    position: {lat: local.latitude, lng: local.longitude},
                    map: map
                });
                
                currentMarkers.push({
                    marcador:marker,
                    objLocal:local
                });
                
                if(new String(local.cor).valueOf() === new String("azul escuro").valueOf()){
                    marker.setIcon('img/azul-escuro-ubs-tradicional.png');
                }
                
                if(local.cor.trim() == "azul escuro".trim()){
                    marker.setIcon('img/azul-escuro-ubs-tradicional.png');
                }

                if(new String(local.cor).valueOf() == new String('azul claro').valueOf()){
                    marker.setIcon('img/azul-claro-pai.png');
                }

                if(new String(local.cor).valueOf() == new String('vermelho').valueOf()){
                    marker.setIcon('img/vermelho-esf-ubs.png');
                }

                if(new String(local.cor).valueOf() == new String( 'verde escuro').valueOf()){
                    marker.setIcon('img/verde-escuro-ama-integrado.png');
                }

                if(new String(local.cor).valueOf() == new String( 'verde claro').valueOf()){
                    marker.setIcon('img/marron_pa.png');
                }
                                
                if(new String(local.cor).valueOf() == new String( 'roxo').valueOf()){
                    marker.setIcon('img/roxo_cecco.png');
                }

                if(new String(local.cor).valueOf() == new String( 'amarelo').valueOf()){
                    marker.setIcon('img/amarelo_caps.png');                    
                }

                if(new String(local.cor).valueOf() == new String( 'rosa').valueOf()){
                    marker.setIcon('img/rosa_cta.png');                    
                }

                if(new String(local.cor).valueOf() == new String( 'pink').valueOf()){
                    marker.setIcon('img/marron_pa.png');                    
                }

                if(new String(local.cor).valueOf() == new String( 'lilas').valueOf()){
                    marker.setIcon('img/lilas_resistencia_terapeutica.png');                    
                }
                
                if(new String(local.cor).valueOf() == new String( 'cinza').valueOf()){
                    marker.setIcon('img/cinza_suvis.png');                    
                }

                if(new String(local.cor).valueOf() == new String( 'laranja').valueOf()){
                    marker.setIcon('img/laranja_cras.png');                    
                }

                if(new String(local.cor).valueOf() == new String( 'preto').valueOf()){
                    marker.setIcon('img/preto_sts.png');                    
                }
                
                if(new String(local.cor).valueOf() == new String( 'bege').valueOf()){
                    marker.setIcon('img/bege_ama-e.png');                    
                }

                if(new String(local.cor).valueOf() == new String( 'branco').valueOf()){
                    marker.setIcon('img/branco_cpn.png');                    
                }

                if(new String(local.cor).valueOf() == new String( 'vinho').valueOf()){
                    marker.setIcon('img/vinho_nir.png');                    
                }

                if(new String(local.cor).valueOf() == new String( 'marron').valueOf()){
                    marker.setIcon('img/vinho_nir.png');                    
                }


                
                google.maps.event.addListener(marker,'click', function() {
					
                    infowindow.open(map, marker);
					
                });
				 
            }//else
        });//forEach de plotagem
	
	
		// procurar endereco
		
	    var input = document.getElementById('search_map2');
		var searchBox = new google.maps.places.SearchBox(input);
		
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
		 
		});
		
		searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

		  //if (places.length == 0) {
          //  return;
          //}

		  
		  var bounds = new google.maps.LatLngBounds();
		 // console.log("bounds"+bounds);
          places.forEach(function(place) {
             if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
		  console.log('address searchBox 2 '+input.value);
          geocoder.geocode({address: input.value}, function(results, status) {
			  console.log('lat'+results[0].geometry.location.lat());	
			  console.log('lng'+results[0].geometry.location.lng());	
			  
			  var markSerchbox2 = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location
				});
          });	  
        });
		
		var input1 = document.getElementById('search_map1');
		var searchBox = new google.maps.places.SearchBox(input1);
		
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
		 
		});
		
		searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

		  var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
             if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
		  console.log('address searchBox 1 '+input.value);
          geocoder.geocode({address: input1.value}, function(results, status) {
			  console.log('lat'+results[0].geometry.location.lat());	
			  console.log('lng'+results[0].geometry.location.lng());	
			  
			  var markSerchbox1 = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location
				});
          });	  
        });

	return map;  
		
});
 
//funcao para definir no searchBox de partida (search_map1) o endereco do IPGG 
function setSearchBox1() {
	var geocoder = new google.maps.Geocoder();
	console.log("working  function setSearchBox1");
	//console.log("setSearchBox1 lat: "+LatLngIpgg.lat+ " , lng: "+LatLngIpgg.lng);
	
	//geocoder.geocode{'location': LatLngIpgg}, function(results, status){
	//console.log ("geocode"+ results[0].formatted_address);};
	
	var address1 = document.getElementById("addressIPGG").innerHTML;
	document.getElementById("search_map1").value= address1;

};
 
 
//funcao para definir no searchBox de partida (search_map1) o endereco do IPGG 
function setSearchBox2() {
	 
	console.log("working function setSearchBox2");
	
	var address2 = document.getElementById("addressIPGG").innerHTML;
	document.getElementById("search_map2").value= address2;
};


//funcao para definir no searchBox de partida (search_map1) o endereco do local 
// id -> lat + lng (concatenado)
function setSearchBox01(id) {
	
	console.log("working function setSearchBox01");
	console.log("setSearchBox01 - id: "+id);
	
	
	var address01 = document.getElementById(id).innerHTML;
	console.log("setSearchBox01 - address01: "+address01);
	
	document.getElementById("search_map1").value= address01;	
};


//funcao para definir no searchBox de chegada (search_map2) o endereco do local 
// id -> lat + lng (concatenado)
function setSearchBox02(id) {
	
	console.log("working function setSearchBox02");
	console.log("setSearchBox02 - id: "+id);	
	
	var address02 = document.getElementById(id).innerHTML;
	console.log("setSearchBox02 - address02: "+address02);
	
	document.getElementById("search_map2").value= address02;
	
};