<?php

    include('connect.php');
    
    $contratoId = 0;

    if(isset($_GET['contratoId']))
        $contratoId = 1;

    $query = " SELECT a.AmbienteId, a.PlaycanvasId, a.CaminhoImagem, a.TipoAmbienteId, ta.Descricao TipoAmbiente
                 FROM Ambiente a		
                 JOIN Tipo_Ambiente ta on (ta.TipoAmbienteId = a.TipoAmbienteId)
                WHERE a.Ativo = 1 
                  AND (a.AmbienteId in (select AC.AmbienteId 
                                        from Ambiente_Contrato AC 
                                         where AC.ContratoId = ".$contratoId.") )";
    $query .= " ORDER BY TipoAmbiente ";

    $result = mysqli_query($con, $query);
   
    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
        $ambientes[] = $row;
   }
    
   if (isset($ambientes))
       echo json_encode($ambientes);

?>