
    window.onload = function(){
        console.log('onload');
    }
    
    $(document).ready(function(){
        
        console.log('ready');
        
        const allMaterials = loadAllMaterialsByContract(1).then(function(materials){
           console.log(materials);
        }).catch( error => console.log(error.message) );

        console.log('ready II');
    /*
        $.ajax({
            url:'/api/repositories/fetchMaterial.php',
            method:"POST",
           data:{action:'getByContract', contractId: 1},
           success:function(data)
                {
                    console.log(data);
                }
            });
*/
    });
    
    loadAllMaterialsByContract = async function(contractId){
    
        var url = '/api/repositories/fetchMaterial.php';
        var formData = new FormData();
        formData.append('action', 'getByContract');
        formData.append('contractId', contractId);

        let response = await fetch(url, formData);
        let materials = await response.text();

        console.log(materials);

        return materials;
    }; 
    
