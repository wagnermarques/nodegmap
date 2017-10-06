require([
    'dojo/text!./dados_do_mapa.csv',
    'dojo/string'], function (dados,string) {

        //PLOTANDO O IPGG
        LatLngIpgg = {lat: -23.4918588, lng: -46.44605790000003};

        infoWindowContentIpgg = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">IPGG - Instituto Paulista de Geriatria e Gerontologia</h1>'+
            '<div id="bodyContent">'+
            '<table>'+
            '<tr>'+
            '<td> <img src="./img/logo.jpg"></td>'+
            '<td> Pra&ccedil;a Padre Aleixo Monteiro Mafra, 34 - S&atilde;o Miguel Paulista"</td>'+
            '</tr>'+
            '</table>'+
            '<p>www.ipgg.saude.sp.gov.br</p>'+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: infoWindowContentIpgg
        });
        map = new google.maps.Map(document.getElementById('map'), {
            center: LatLngIpgg,
            zoom: 12,            
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
        infoWindowContent = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">${nome}</h1>'+
            '<div id="bodyContent">'+
            '<p>${endereco}<p>'+
            '<p>${tipo}</p>'+
            '<p><strong>Especialidades</strong>:${especialidades}</p>'+
            '</div>'+
            '</div>';
        
        locais.forEach(function(local){
            if(local.latitude == null || local.longitude == null || isNaN(local.position.lat) || isNaN(local.position.lng)){
                //console.log(local.nomeDoLocal +" nao pode ser plotado");
            }else{
                var infowindow = new google.maps.InfoWindow({
                    content: string.substitute(infoWindowContent,
                                               {
                                                   endereco:local.endDoLocal,
                                                   nome:local.nomeDoLocal,
                                                   tipo:local.tipo,
                                                   especialidades: local.especialidades
                                               })
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


                
                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                });
            }//else
        });//forEach de plotagem

        return map;
                                            
 });

