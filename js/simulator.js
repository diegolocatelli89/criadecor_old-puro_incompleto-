var allMaterials = [];
var allMaterialTypes = [];

const contractId = 1; //Pegar do arquivos de configuração

window.onload = function() {

}

$(document).ready(function() {

    loadAllMaterialsByContract(contractId).then((materials) => {
        allMaterials = materials.Material;

        $('.material-types').append(createMaterialsTypes(allMaterials));

    }).catch(error => console.log(error.message));

});

loadAllMaterialsByContract = async function(contractId) {

    var url = '/api/repositories/fetchMaterial.php';
    var formData = new FormData();
    formData.append('action', 'getByContract');
    formData.append('contractId', contractId);

    let response = await fetch(url, { method: 'post', body: formData });

    if (response.ok)
        return await response.json();
    else
        throw Error(response.statusText);

};

createMaterialsTypes = function(allMaterials) {

    let html = '';

    if (allMaterials.length > 0) {

        const allMaterialTypes = Array.from(new Set(allMaterials.map(e => e.DescTipo)));

        allMaterialTypes.forEach(MaterialType => {

            html += '    <div class="material-type-item"> ';
            html += '       <h3>' + MaterialType + '</h3> ';
            html += '       <div class="material-type-themes"> ';

            let allMaterialTypes = allMaterials.filter(material => material.DescTipo === MaterialType);

            html += createMaterialsTypesThemes(allMaterialTypes);

            html += '       </div> ';
            html += '    </div> ';

        });
    }
    return html;
}

createMaterialsTypesThemes = function(allMaterialsTypes) {

    const allMaterialTypesThemes = Array.from(new Set(allMaterialsTypes.map(m => m.ReproducaoId)))
        .map(id => {
            return {
                Id: id,
                Descricao: allMaterials.find(e => e.ReproducaoId == id).DescReproducao,
                Thumb: allMaterials.find(f => f.ReproducaoId == id).ThumbReproducao
            };
        });

    let html = '';

    allMaterialTypesThemes.forEach(theme => {

        html += '    		<div id="' + theme.Id + '" class="detail-theme"> ';
        html += '    			<img src="' + theme.Thumb + '"> ';
        html += '    		    <p>' + theme.Descricao + '</p> ';
        html += '    		</div> ';

    });

    return html;

}