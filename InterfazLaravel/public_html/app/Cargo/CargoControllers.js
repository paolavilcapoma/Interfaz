var tblCargo;
var idCargo;
$(document).ready(function () {
    tblCargo = $('#tblListCargo').DataTable(
        {
            "ajax": {
                type: 'get',
                url: "http://apicargo.com/api/cargo",
                dataSrc: '',
                cache: true
            },
            columns: [
                {
                    "targets": 0,
                    "render": function (data, type, row) {

                        return row.created_at;
                    },
                },

                {
                    "targets": 1,
                    "render": function (data, type, row) {

                        return row.nombre;
                    },
                },
                {
                    "targets": 2,
                    "render": function (data, type, row) {

                        return row.descripcion;
                    },
                },
                

                // { data: "Nombre" },
                // { data: "Descripcion" },
                {
                    "targets": 4,
                    "render": function (data, type, row) {
                        return "<a href='#' onclick=\"loadEditCargo('" + row.id + "')\">Editar</a> | <a id='btnEliminar' href='#' onclick=\"loadDeleteCargo('" + row.id + "')\">Eliminar</a> ";
                    },
                },
            ]
        }
    );
});

function FnActualizartabla() {
    tblCargo.ajax.reload();
}

function loadDeleteCargo(id) {
    idCargo = id;
    console.log("Si llamo");
    // $('#modal1').modal({ show: true, backdrop: 'static', size: 'lg', keyboard: false });
    $("#contenedorModalEliminar").load("/public_html/Views/Cargo/modalEliminarCargo.html", function (reponse) {
        $('#modalDeleteCargo').modal({ show: true, backdrop: 'static', size: 'lg', keyboard: false });
    });
}

function loadNuevoCargo() {
    console.log("Si llamo");
    // $('#modal1').modal({ show: true, backdrop: 'static', size: 'lg', keyboard: false });
    $("#contenedorModal1").load("/public_html/Views/Cargo/modalnuevoCargo.html", function (reponse) {
        $('#modalCargo').modal({ show: true, backdrop: 'static', size: 'lg', keyboard: false });
    });
}

function loadEditCargo(id) {
    $("#contenedorModalEditar").load("/public_html/Views/Cargo/modalEditarCargo.html", function (reponse) {
        loadDataCargo(id);
        $('#modalEditarCargo').modal({ show: true, backdrop: 'static', size: 'lg', keyboard: false });
    });
}

function loadDataCargo(id) {
    
    try {
        $.ajax({
            method: "GET",
            url: "http://apicargo.com/api/cargo/"+ id,
            success: function (msg) {  
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr);
                console.log(xhr.status);
                console.log(thrownError);
               
            }
        })
        .done( function(reponse){
            $("#txtNombre").val(reponse.nombre);
            $("#txtDescripcion").val(reponse.descripcion);
            $("#txtid").val(reponse.id);
            $('#modalEditarCargo').modal({ show: true, backdrop: 'static', size: 'lg', keyboard: false });
        })
        ;
    }
    catch (e) {
        // sentencias para manejar cualquier excepción
        console.log(e); // pasa el objeto de la excepción al manejador de errores
    }
    

}
