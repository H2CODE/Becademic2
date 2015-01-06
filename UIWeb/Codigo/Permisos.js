var rol_actual = null;

$(function () {

    $("#ventanaLoader").modal("show");

    rol_actual = $.sessionStorage.get("rol_actual");

    generarListaDePermisos();
    
});

function generarListaDePermisos() {

    var todosLosPermisos = [];
    var permisosDeUsuario = [];
    var categoriasPermisos = [];
    var placasPermisos = [];
    var rolActual = [];

    $.ajax({

        url: Servicios.Roles + "/detalles/"+rol_actual,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        async: false,
        success: function (resultado) {
            rolActual = resultado;
            $(".nombreRolTxt").empty().append(rolActual.Nombre);
        }// Fin de la funcion SUCCESS

    });// Fin de la llamada AJAX

    $.ajax({

        url: Servicios.Roles + "/permisos",
        type: "GET",
        dataType: "json",
        crossDomain: true,
        async: false, 
        success: function (resultado) {
            todosLosPermisos = resultado;
        }// Fin de la funcion SUCCESS

    });// Fin de la llamada AJAX

    $.ajax({

        url: Servicios.Roles + "/permisoRol/" + rol_actual,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        async: false,
        success: function (resultado) {
            resultado.forEach(function (item) {

                permisosDeUsuario.push(item.Id);

            });
        }// Fin de la funcion SUCCESS

    });// Fin de la llamada AJAX

    todosLosPermisos.forEach(function (permiso){

        var noExiste = true;
        categoriasPermisos.forEach(function (item) {
            if (item.nombre == permiso.Descripcion)
            {
                noExiste = false;
            }
        });

        if (noExiste)
        {
            categoriasPermisos.push({ nombre: permiso.Descripcion, contenido: '<div class="col-xs-12"><h3>' + permiso.Descripcion + '</h3><hr></div>' });
        }

    });

    todosLosPermisos.forEach(function (permiso) {

        if (permisosDeUsuario.indexOf(permiso.Id) >= 1) {
            categoriasPermisos.forEach(function (item) {
                if (item.nombre == permiso.Descripcion) {
                    item.contenido += '<div class="col-md-3"><div class="well well-sm"><h6><input type="checkbox" name="' + permiso.Id + '" value="' + permiso.Id + '" checked="checked"> ' + permiso.Nombre + '</h6>Permiso #'+permiso.Id+'</div></div>';
                }
            });
        }
        else {
            categoriasPermisos.forEach(function (item) {
                if (item.nombre == permiso.Descripcion) {
                    item.contenido += '<div class="col-md-3"><div class="well well-sm"><h6><input type="checkbox" name="' + permiso.Id + '" value="' + permiso.Id + '"> ' + permiso.Nombre + '</h6>Permiso #' + permiso.Id + '</div></div>';
                }
            });
        }

    });

    categoriasPermisos.forEach(function (item) {
        $("#contenidoPermisos").append(item.contenido);
    });

    $("#listaPermisosNuevos").submit(function (e) {
        e.preventDefault();

        var PaquetePermisos = { IdRol: rol_actual, NumerosDePermisos: [] };

        $('input[type="checkbox"]:checked').each(function () {
            PaquetePermisos.NumerosDePermisos.push(parseInt($(this).val()));
        });

        console.log(PaquetePermisos);

        $.ajax({
            contentType: 'application/json',
            url: Servicios.Roles + "/actualizarPermisos",
            type: "POST",
            dataType: "json",
            crossDomain: true,
            async: false,
            data: JSON.stringify(PaquetePermisos),
            success: function (resultado) {
                console.log(resultado);
            }// Fin de la funcion SUCCESS

        });// Fin de la llamada AJAX

    });

    $("#ventanaLoader").modal("hide");
}