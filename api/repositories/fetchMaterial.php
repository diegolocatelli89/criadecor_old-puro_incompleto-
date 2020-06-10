<?php 

    include('connect.php');
        
    if(isset($_POST["action"])) {

        if(($_POST["action"]) =='getByContract') {

            $query = "
                SELECT distinct 
                    Material.MaterialId, 
                    Material.Descricao as DescMaterial, 
                    /* Material.CaminhoThumbnail as Thumb, */
                    CASE WHEN coalesce(Material.CaminhoMiniThumbnail, '') <> '' THEN Material.CaminhoMiniThumbnail ELSE Material.CaminhoThumbnail END as Thumb,
                    Marca.Descricao as DescMarca, 
                    Formato.Descricao as DescFormato, 
                    Reproducao.Descricao as DescReproducao, 
                    Reproducao.CaminhoThumbnail as ThumbReproducao,
                    Superficie.Abreviacao as DescSup,
                    Superficie.Descricao as DescSuperficie,   
                    Tipo.Descricao as DescTipo,
                    Tipo.CaminhoThumbnail as ThumbTipo,
                    Cor.Descricao as DescCor,
                    Material.FormatoId,
                    Material.MarcaId,
                    Material.ReproducaoId,
                    Material.SuperficieId,
                    Material.TipoId,
                    Material.CorId,
                    Tipo.AplicacaoPadrao
                FROM Material 
                INNER JOIN Marca ON Material.MarcaId = Marca.MarcaId
                INNER JOIN Formato ON Material.FormatoId = Formato.FormatoId
                INNER JOIN Reproducao ON Material.ReproducaoId = Reproducao.ReproducaoId
                INNER JOIN Superficie ON Material.SuperficieId = Superficie.SuperficieId
                INNER JOIN Tipo ON Material.TipoId = Tipo.TipoId
                INNER JOIN Cor ON Material.CorId = Cor.CorId
                WHERE Status = 1
                AND Simulador = 1
                AND coalesce(Material.CaminhoDiffuse, '') <> ''
                AND coalesce(CaminhoDiffuse, '') <> ''
                AND coalesce(CaminhoNormalMap, '') <> ''
                AND coalesce(CaminhoSpecularMap, '') <> '' ";

                if (isset($_POST['contractId'])){
                    $query .= " AND MaterialId IN (SELECT MC.MaterialId 
                                                    FROM Material_Contrato MC
                                                    WHERE MC.ContratoId = ".$_POST['contractId'].") ";
                }
            
            $query .= " ORDER BY CAST(Material.Descricao AS UNSIGNED) ASC, DescMaterial ASC";

            $result = mysqli_query($con, $query);

            while($row = $result->fetch_array(MYSQLI_ASSOC)) {
                $myArray['Material'][] = $row;
            }

            echo "too aqio";

            if (isset($myArray))
                echo json_encode($myArray);
        }
    }
?>