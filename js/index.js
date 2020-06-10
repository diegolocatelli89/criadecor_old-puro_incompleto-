loadAll = function(){
		
    $.ajax({
        url: "../api/repositories/fetchRoom.php",
        method: "GET",
        data: { 
            contratoId: 1
        },
        success: function(data){
            if (data){

                const allRooms = jQuery.parseJSON(data);

                $('#rooms').html("");

                if (allRooms.length > 0){
                    const roomTypes = Array.from(new Set(allRooms.map(a => a.TipoAmbiente)));

                    roomTypes.forEach((type) => {

                        var htmlRooms = '<section class="typeRoom">';
                        htmlRooms += '<h3>'+ type + '</h3>';
                        htmlRooms += '<div class="rooms"> ';

                        const rooms = allRooms.filter(a => a.TipoAmbiente == type)

                        for(var a in rooms){
                            //if (estilos[e].qtdeMoods > 0)
                                htmlRooms += createRowRoom(rooms[a].PlaycanvasId, rooms[a].CaminhoImagem);
                        }
                        
                        htmlRooms += '<section>';
                        htmlRooms += '</div> <!-- rooms -->';

                        $('#rooms').append(htmlRooms);

                    });

                }

            }
        }
    });
}

createRowRoom = function(playcanvasId, pathThumb){

    var html = '    <div class="item-room"> ';
        html += '    	<a href="simulator.php?Id='+ playcanvasId +'" +  class="link-room"> ';
        html += '    		<div class="detail-room"> ';	  					  
        //html += '    			<img src="'+ pathThumb +'"> ';
        html += '    			<img src="../assets/images/thumb-test-mobile.jpg"> ';
        html += '    		    <p>Ambiente 1</p> ';
        html += '    		</div> ';
        html += '    	</a> '; 
        html += '    </div> ';       

    return html; 
}