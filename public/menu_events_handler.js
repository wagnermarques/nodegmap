define(["dijit/Dialog","dojo/ready"],function(dialog,ready){

    //https://developers.google.com/maps/documentation/javascript/examples/marker-remove?hl=pt-br
    function _setMapOnAllMarkers(map) {
        for (var i = 0; i < currentMarkers.length; i++) {
            currentMarkers[i].marcador.setMap(map);
        }
    }

    function setMapMarkersByCategorias(map,categoria) {
        for (var i = 0; i < currentMarkers.length; i++) {
            console.log(categoria +"<>"+currentMarkers[i].objLocal.tipo);
            if(categoria == currentMarkers[i].objLocal.tipo){
                currentMarkers[i].marcador.setMap(map);
            }            
        }
    }

    
    function clearMarkers() {
        _setMapOnAllMarkers(null);
    }
    
    function showAllMarkers(){
        _setMapOnAllMarkers(map);
    }
    
    function selecionarLocaisPorCategoria(){
        console.log(map);
    }
    
    //registry is avaible when dom is ready for use
    ready(function(){
        require(["dijit/registry"], function(registry) {
            registry.byId("mnuItem_VerSoOIpgg").on("click", function(){
                clearMarkers();
            });            
            registry.byId("mnuItem_VerTodos").on("click", function(){
                showAllMarkers();
            });
//          registry.toArray().forEach(function(w){console.log(w.domNode.InnerHTML)}));
//
	    registry.byId("CAPS").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"CAPS");
            });
	    registry.byId("CECCO").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"CECCO");
            });
	    registry.byId("CTA").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"CTA");
            });
	    registry.byId("Hospital Dia").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"Hospital Dia");
            });
	    registry.byId("PA").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"PA");
            });
	    registry.byId("Residencia Terapeutica").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"Residencia Terapeutica");
            });
	    registry.byId("ESF/UBS").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"ESF/UBS");
            });
	    registry.byId("UBS Tradicional").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"UBS Tradicional");
            });
	    registry.byId("AMA Integrado").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"AMA Integrado");
            });
	    registry.byId("SUVIS").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"SUVIS");
            });
	    registry.byId("CRAS").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"CRAS");
            });
	    registry.byId("ILPI").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"ILPI");
            });
	    registry.byId("STS").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"STS");
            });
	    registry.byId("AMA-E").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"AMA-E");
            });
	    registry.byId("CPN").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"CPN");
            });
	    registry.byId("SAE-DST").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"SAE-DST");
            });
	    registry.byId("NIR").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"NIR");
            });
	    registry.byId("CAPS").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"CAPS");
            });
	    registry.byId("PAI").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"PAI");
            });
	    registry.byId("AE").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"AE");
            });
	    registry.byId("CECCO").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"CECCO");
            });
	    registry.byId("ESF/UBS").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"ESF/UBS");
            });
	    registry.byId("CRAS").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"CRAS");
            });
	    registry.byId("ILPI").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"ILPI");
            });
	    registry.byId("Parque").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"Parque");
            });
	    registry.byId("CEU").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"CEU");
            });
	    registry.byId("Mercado").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"Mercado");
            });
	    registry.byId("NCI").on("click", function(){
                clearMarkers();
                setMapMarkersByCategorias(map,"NCI");
            });
	    
//            registry.byId("mnuItem_SelecionarLocaisPorRegiao").on("click", function(){
//
      //      });
    //                                                              
  //          registry.byId("mnuItem_VerListaDeLocais").on("click", function(){
//
  //          });
//
  //          
//

        });
    });//ready fn          
});
