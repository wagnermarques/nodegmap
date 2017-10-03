define(["dojo/ready"],function(ready){
    
    //https://developers.google.com/maps/documentation/javascript/examples/marker-remove?hl=pt-br
    function _setMapOnAllMarkers(map) {
        for (var i = 0; i < currentMarkers.length; i++) {
            currentMarkers[i].setMap(map);
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
                                                 
            registry.byId("mnuItem_SelecionarLocaisPorCategorias").on("click", function(){
                
            });
                                                                      
            registry.byId("mnuItem_SelecionarLocaisPorRegiao").on("click", function(){

            });
                                                                  
            registry.byId("mnuItem_VerListaDeLocais").on("click", function(){

            });

            


        });
    });          
});
