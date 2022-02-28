var tblEmpleado;
var idEmpleado;
$(document).ready(function () {
    tblEmpleado = $('#tblListEmpleado').DataTable(
        {
            "ajax": {
                type: 'get',
                url: "http://apiEmpleado.com/api/empleado",
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

                        return row.apellido;
                    },
                },
                {
                    "targets": 3,
                    "render": function (data, type, row) {

                        return row.direccion;
                    },
                },
                {
                    "targets": 4,
                    "render": function (data, type, row) {

                        return row.dni;
                    },
                },
                {
                    "targets": 5,
                    "render": function (data, type, row) {

                        return row.telefono;
                    },
                },

                // { data: "Nombre" },
                // { data: "Descripcion" },
                {
                    "targets": 6,
                    "render": function (data, type, row) {
                        return "<a href='#' onclick=\"loadEditEmpleado('" + row.id + "')\">Editar</a> | <a id='btnEliminar' href='#' onclick=\"loadDeleteEmpleado('" + row.id + "')\">Eliminar</a> ";
                    },
                },
            ]
        }
    );
});

function FnActualizartabla() {
    tblEmpleado.ajax.reload();
}

function loadDeleteEmpleado(id) {
    idEmpleado = id;
    console.log("Si llamo");
    // $('#modal1').modal({ show: true, backdrop: 'static', size: 'lg', keyboard: false });
    $("#contenedorModalEliminar").load("/public_html/Views/Empleado/modalEliminarEmpleado.html", function (reponse) {
        $('#modalDeleteEmpleado').modal({ show: true, backdrop: 'static', size: 'lg', keyboard: false });
    });
}

function loadNuevoEmpleado() {
    console.log("Si llamo");
    // $('#modal1').modal({ show: true, backdrop: 'static', size: 'lg', keyboard: false });
    $("#contenedorModal1").load("/public_html/Views/Empleado/modalnuevoEmpleado.html", function (reponse) {
        $('#modalEmpleado').modal({ show: true, backdrop: 'static', size: 'lg', keyboard: false });
    });
}

function loadEditEmpleado(id) {
    $("#contenedorModalEditar").load("/public_html/Views/Empleado/modalEmpleadoEditar.html", function (reponse) {
        loadDataEmpleado(id);
        $('#modalEditarEmpleado').modal({ show: true, backdrop: 'static', size: 'lg', keyboard: false });
    });
}

function loadDataEmpleado(id) {
    
    try {
        $.ajax({
            method: "GET",
            url: "http://apiempleado.com/api/empleado/"+ id,
            success: function (msg) {  
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr);
                console.log(xhr.status);
                console.log(thrownError);
               
            }
        })

        .done( function(reponse){
            $("#txtid").val(reponse.id);
            $("#txtNombre").val(reponse.nombre);
            $("#txtApellido").val(reponse.apellido);
            $("#txtDireccion").val(reponse.direccion);
            $("#txtTelefono").val(reponse.telefono);
            $("#txtDni").val(reponse.dni);
            $('#modalEditarEmpleado').modal({ show: true, backdrop: 'static', size: 'lg', keyboard: false });
        })
        ;
    }
    catch (e) {
        // sentencias para manejar cualquier excepción
        console.log(e); // pasa el objeto de la excepción al manejador de errores
    }
    

}
