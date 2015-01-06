/**
* Usuarios
**/

// Variables globales
var idUsuarioSeleccionado = null;

/******************************
*   Inicializador del JQuery  *
******************************/
$(function () {

    // Al inicio se refresca la tabla con los ultimos datos que hayan sido agregados.
    refrescarTabla();

    /**
    * Se habilitan las validaciones de datos para los formularios
    **/
    $("#formularioAgregarUsuario").validationEngine();
    $("#formularioEditarUsuario").validationEngine();


    /**
    * Evento para agregar usuarios
    * Este evento se dispara cuando alguien presiona el boton de guardar en el formulario para agregar nuevos usuarios
    **/
    $("#formularioAgregarUsuario").submit(function (e) {

        e.preventDefault();

        var nuevoUsuario = {
            "nombre": $("#txtNombreUsuario_agregar").val(), "apellido": $("#txtApellidoUsuario_agregar").val(), "genero": $("#txtGeneroUsuario_agregar").val(),
            "correo": $("#txtCorreoUsuario_agregar").val(), "cedula": $("#txtCedula_agregar").val(), "estado": $("#txtEstadoUsuario_agregar").val(), 
            "nombre2": $("#txtNombre2_agregar").val(), "apellido2": $("#txtApellido2_agregar").val(), "telefono": $("#txtTelefonoUsuario_agregar").val()
        };

        agregarUsuario(nuevoUsuario);

    });

    /**
    * Evento para editar usuarios
    * Este evento se dispara cuando alguien presiona el boton de editar en el formulario para editar usuario
    **/
    $("#formularioEditarUsuario").submit(function (ev) {

        ev.preventDefault();

        var nuevoDatosUsuario = {
            "id": $("#txtIdUsuario_editar").val(), "nombre": $("#txtNombreUsuario_editar").val(), "apellido": $("#txtApellidoUsuario_editar").val(),
            "genero": $("#txtGeneroUsuario_editar").val(), "correo": $("#txtCorreoUsuario_editar").val(), "cedula": $("#txtCedula_editar").val(), "estado": $("#txtEstadoUsuario_editar").val(),
            "nombre2": $("#txtNombre2_editar").val(), "apellido2": $("#txtApellido2_editar").val(), "telefono": $("#txtTelefonoUsuario_editar").val()
        };

        editarUsuario(nuevoDatosUsuario);

    });


    $("#btnAsignarRol").click(function (e) {

        e.preventDefault();

        var obj = { "idRol": $("#cmbRolUsuario").val(), "idUser": idUsuarioSeleccionado };

        asignarRol(obj);


    });

    $("#btnAsignarCarrera").click(function (e) {

        e.preventDefault();

        asignarCarreraAUsuario(idUsuarioSeleccionado, $("#cmbCarrerasUsuario").val());

    });


});
/******************************
******************************/

/**
Variable global que indentifica la direccion del webservice hacia el cual se deben hacer las peticiones
**/

/**
Variable global que identifica el usuario al que se le sera asignado o removido un rol
**/
var idUser;

/**
* Caso de uso: Listar usuarios
* Refresca el contenido de la tabla de usuarios
**/
function refrescarTabla() {
    // Se elimina todo contenido previamente escrito en la tabla
    $("#contenidoTabla").html("");

    $("#ventanaLoader").modal("show");

    /**
    Llamada JQuery/AJAX
    Esta llamada hace una peticion GET hacia el UriTemplate = "/todos" que se encuentra en el WebGet del Webservice REST ServicioUsuario.svc
    **/
    $.ajax({

        // Direccion hacia donde hacer la llamada
        url: Servicios.Usuarios + "/todos",
        // Tipo de metodo a utilziar
        type: "GET",
        // Tipo de retorno esperado
        dataType: "json",
        // Es de servidor a servidor?
        crossDomain: true,
        // En caso de exito al recuperar informacion de la direccion del webservice
        success: function (resultado) {

            /**
            * Dado que el resultado es una coleccion de cadenas JSON, se puede iterar a travez de ellas mediante el metodo forEach
            **/
            resultado.forEach(function (item) {

                // Se comienza a construir la fila para la tabla.
                var fila = "<tr>";
                // Se añade la columna para el id.
                fila += "<td>" + item.Id + "</td>";
                // Se añade la columna para el nombre.
                fila += "<td>" + item.Nombre + "</td>";
                // Se añade la columna para el seg nombre.
                fila += "<td>" + item.SegundoNombre + "</td>";
                // Se añade la columna para el icono.
                fila += "<td>" + item.PrimerApellido + "</td>";
                // Se añade la columna para el color.
                fila += "<td>" + item.SegundoApellido + "</td>";
                // Se añade la columna para el correo.
                fila += "<td>" + item.Correo + "</td>";
                // Se añade la columna para el genero.
                fila += "<td>" + item.Genero + "</td>";
                // Se añade la columna para el telefono.
                fila += "<td>" + item.Telefono + "</td>";
                // Se añade la columna para la cedula
                fila += "<td>" + item.Cedula + "</td>";
                // Se añade la columna para el estado.
                fila += "<td>" + item.NombreEstado + "</td>";
                // Se añade la columna para los botones de borrar y editar.
                fila += '<td> <div class="dropdown"> <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true"> <span class="glyphicon glyphicon-cog"></span> Modificar <span class="caret"></span> </button> <ul class="dropdown-menu" role="menu"> <li role="presentation"><a id="' + item.Id + '" role="menuitem" tabindex="-1" href="#" class="btnRoles" data-toggle="modal" data-target="#ventanaRolUsuario"><span class="glyphicon glyphicon-tag" ></span> Asignación de roles</a></li> <li role="presentation"><a id="' + item.Id + '" role="menuitem" tabindex="-1" href="#" class="btnCarreras"  data-toggle="modal" data-target="#ventanaCarrerasUsuario"><span class="glyphicon glyphicon-th-list"></span> Carreras asignadas</a></li> <li role="presentation"><a id="' + item.Id + '" role="menuitem" tabindex="-1" href="#" class="btnVentanaEditar"><span class="glyphicon glyphicon-pencil"></span> Actualizar información</a></li> <li role="presentation"><a id="' + item.Id + '" role="menuitem" tabindex="-1" href="#" class="btnBorrar"><span class="glyphicon glyphicon-trash"></span> Borrar usuario</a></li> </ul> </div> </td>';
                // Se termina de construir la fila.
                fila += "</tr>";

                // Se ingresa esta columna dentro del espacio reservado para las filas dentro de la tabla de Grupos Musicales.
                $("#contenidoTabla").append(fila);

                /**
                * Dado que se estan generando botones de eliminar y editar en tiempo de ejecucion 
                * hay que decirle al JQuery que vuelva nuevamente a colocarles los Eventos.
                **/

                // Evento para el nuevo boton de borrar
                $(".btnBorrar").click(function () {

                    // Se obtiene el ID colocado en el atributo del boton
                    var idUsuario = $(this).attr("id");

                    // Se elimina el grupo
                    eliminarUsuario(idUsuario);


                });// Fin del boton eliminar correspondiente a esta fila


                // Evento para el nuevo boton de editar
                $(".btnVentanaEditar").click(function () {

                    // Antes de abrir la ventana se escribiran los detalles del usuario pasado.
                    buscarUsuario($(this).attr("id"), function (resultado) {

                        $("#txtIdUsuario_editar").val(resultado.Id);

                        $("#txtCedula_editar").val(resultado.Cedula);

                        $("#txtNombreUsuario_editar").val(resultado.Nombre);

                        $("#txtNombre2_editar").val(resultado.SegundoNombre);

                        $("#txtApellidoUsuario_editar").val(resultado.PrimerApellido);

                        $("#txtApellido2_editar").val(resultado.SegundoApellido);

                        $("#txtCorreoUsuario_editar").val(resultado.Correo);

                        $("#txtTelefonoUsuario_editar").val(resultado.Telefono);

                        $("#txtGeneroUsuario_editar").val(resultado.Genero);

                        $("#txtEstadoUsuario_editar").val(resultado.Estado);

                        // Se abre la ventana para editar un grupo
                        $("#ventanaEditarUsuario").modal("show");

                    });

                });// Fin del evento para el boton editar correspondiente a esta fila

            });// Fin de la iteracion entre los objetos del resultado

            $("#ventanaLoader").modal("hide");

            // Evento para el boton de modificar contrasena
            $("#btnPassUsuario_editar").click(function () {

                // Se obtiene el ID colocado en el atributo del boton
                var idUsuario = $("#txtIdUsuario_editar").val();

                // Se elimina el grupo
                editarContraUsuario(idUsuario);


            });// Fin del boton modificar contrasena

            // Evento para el nuevo boton de roles
            $(".btnRoles").click(function () {

                // Se obtiene el ID colocado en el atributo del boton
                idUsuarioSeleccionado = $(this).attr("id");

                // Se elimina el grupo
                listarRolUsuario(idUsuarioSeleccionado);


            });// Fin del boton roles correspondiente a esta fila

            // Evento para el nuevo boton de roles
            $(".btnCarreras").click(function () {

                // Se obtiene el ID colocado en el atributo del boton
                idUsuarioSeleccionado = $(this).attr("id");

                // Se listan las carreras asociadas y disponibles para enlazar al usuario.
                listarCarrerasUsuario(idUsuarioSeleccionado);


            });// Fin del boton roles correspondiente a esta fila

        }// Fin de la funcion SUCCESS



    });// Fin de la llamada AJAX

 }

/**
listarCarrerasUsuario
**/
function listarCarrerasUsuario()
{
    $.ajax({

        url: Servicios.Usuarios + "/listaCarrerasAsignadas/" + idUsuarioSeleccionado,
        type: "GET",
        dataType: "json",
        crossDomain: true,

        success: function (resultado) {

            $("#tablaCarreras").empty();

            //Función que va a llenar el combobox con los nombres de los roles.
            nombresCarrera();

            resultado.forEach(function (item) {

                // Se comienza a construir la fila para la tabla.
                var fila = "<tr>";
                // Se añade la columna para el nombre.
                fila += "<td>" + item.Nombre + "</td>";
                //Se agrega el boton para mostrar los roles de un usuario.
                fila += '<td> <button class="btn btn-danger btnRemoverCarrera" id="' + item.Id + '"> <span class="glyphicon glyphicon-trash"></span> Remover</button></td>';
                // Se termina de construir la fila.
                fila += "</tr>";

                // Se ingresa esta columna dentro del espacio reservado para las filas dentro de la tabla de Grupos Musicales.
                $("#tablaCarreras").append(fila);

                /**
                * Dado que se estan generando botones de eliminar y editar en tiempo de ejecucion 
                * hay que decirle al JQuery que vuelva nuevamente a colocarles los Eventos.
                **/

                // Evento para el nuevo boton de remover
                $(".btnRemoverCarrera").click(function () {

                    // Se obtiene el ID colocado en el atributo del boton
                    var idCarrera = $(this).attr("id");

                    // Se elimina el rol
                    removerCarreraDeUsuario(idUsuarioSeleccionado, idCarrera);

                });// Fin del boton remover correspondiente a esta fila

            });// Fin de la iteracion entre los objetos del resultado

            $("#ventanaLoader").modal("hide");


        }// Fin de la funcion SUCCESS

    });// Fin de la llamada AJAX
}


/**
* Caso de uso: Listar roles de un usuario
**/
function listarRolUsuario() {

    $.ajax({

        url: Servicios.Usuarios + "/rolUser/" + idUsuarioSeleccionado,
        type: "GET",
        dataType: "json",
        crossDomain: true,

        success: function (resultado) {

            $("#tablaRol").empty();


            //Función que va a llenar el combobox con los nombres de los roles.

            nombresRol();


            resultado.forEach(function (item) {

                // Se comienza a construir la fila para la tabla.
                var fila = "<tr>";
                // Se añade la columna para el id.
                fila += "<td>" + item.Id + "</td>";
                // Se añade la columna para el nombre.
                fila += "<td>" + item.Nombre + "</td>";
                // Se añade la columna para la descripcion.
                fila += "<td>" + item.Descripcion + "</td>";
                //Se agrega el boton para mostrar los roles de un usuario.
                fila += '<td> <button class="btn btn-danger btnRemover" id="' + item.Id + '"> <span class="glyphicon glyphicon-trash"></span> Remover</button></td>';
                // Se termina de construir la fila.
                fila += "</tr>";

                // Se ingresa esta columna dentro del espacio reservado para las filas dentro de la tabla de Grupos Musicales.
                $("#tablaRol").append(fila);

                /**
                * Dado que se estan generando botones de eliminar y editar en tiempo de ejecucion 
                * hay que decirle al JQuery que vuelva nuevamente a colocarles los Eventos.
                **/

                // Evento para el nuevo boton de remover
                $(".btnRemover").click(function () {

                    // Se obtiene el ID colocado en el atributo del boton
                    var idRol = $(this).attr("id");

                    // Se elimina el rol
                    removerRolUsuario(idRol, idUsuarioSeleccionado);


                });// Fin del boton remover correspondiente a esta fila

            });// Fin de la iteracion entre los objetos del resultado

            $("#ventanaLoader").modal("hide");


        }// Fin de la funcion SUCCESS

    });// Fin de la llamada AJAX


}

/*
    Metodo para agregar un rol a un usuario
*/
function asignarRol(obj) {
    $.ajax({
        url: Servicios.Usuarios + "/asignarRol",
        type: "GET",
        data: {'idRol': obj.idRol, 'idUsuario': obj.idUser},
        success: function (resultado) {
            if (resultado == true) {
                $("#ventanaRolUsuario").modal("hide");
            }
            else {
                alert("Disculpe, hubo un error al momento de modificar el usuario\n\rpor favor intente más tarde.");
            }
        }

    });
}

/*
    Metodo para remover un rol de un usuario
*/
function removerRolUsuario(idRol, idUsuario) {
    $.ajax({
        url: Servicios.Usuarios + "/removerRol",
        type: "GET",
        data: { "idRol": idRol, "idUsuario": idUsuario },
        success: function (resultado) {
            if (resultado == true) {
                $("#ventanaRolUsuario").modal("hide");
            }
            else {
                alert("Disculpe, hubo un error al momento de eliminar el rol\n\rpor favor intente más tarde.");
            }
        }

    });
}

/*
    Metodo para agregar un rol a un usuario
*/
function asignarCarreraAUsuario(idusuario, idcarrera) {
    $.ajax({
        url: Servicios.Usuarios + "/asignarCarrera/"+idusuario+"/"+idcarrera,
        type: "GET",
        success: function (resultado) {
            if (resultado == true) {
                $("#ventanaCarrerasUsuario").modal("hide");
            }
            else {
                alert("Disculpe, hubo un error al momento de modificar el usuario\n\rpor favor intente más tarde.");
            }
        }

    });
}

/*
    Metodo para remover un rol de un usuario
*/
function removerCarreraDeUsuario(idusuario, idcarrera) {
    $.ajax({
        url: Servicios.Usuarios + "/removerCarrera/"+idusuario+"/"+idcarrera,
        type: "GET",
        success: function (resultado) {
            if (resultado == true) {
                $("#ventanaCarrerasUsuario").modal("hide");
            }
            else {
                alert("Disculpe, hubo un error al momento de eliminar el rol\n\rpor favor intente más tarde.");
            }
        }

    });
}

/**
* Caso de uso: Buscar usuario por Id
**/
function buscarUsuario(id, onSuccess) {
    $.ajax({
        url: Servicios.Usuarios + "/detalles/" + id,
        type: "GET",
        dataType: "json",
        success: onSuccess
    });
}

/**
* Caso de uso: Agregar nuevo usuario
**/
function agregarUsuario(obj) {
    $.ajax({
        url: Servicios.Usuarios + "/crear",
        type: "GET",
        data: {
            'nombre': obj.nombre, 'apellido': obj.apellido, 'genero': obj.genero,
            'correo': obj.correo, 'cedula': obj.cedula, 'estado': obj.estado,
            'nombre2': obj.nombre2, 'apellido2': obj.apellido2, 'telefono': obj.telefono
        },

        success: function (resultado) {
            $("#ventanaAgregarUsuario").modal("hide");
            if (resultado == true) {
                refrescarTabla();
            }
            else {
                alert("Disculpe, hubo un error al momento de crear el usuario\n\rpor favor intente más tarde.");
            }
        }

    });
}

/**
* Llena las options del drop down menu
**/
function nombresRol() {

    $.ajax({

        url: Servicios.Usuarios + "/rolesUsuario",
        type: "GET",
        dataType: "json",
        crossDomain: true,

        success: function (resultado) {

            $("#cmbRolUsuario").empty();

            resultado.forEach(function (item) {

                // Se comienza a construir la opcion para la tabla.
                var option = '<option value="' + item.Id + '">' + item.Nombre + '</option>';

                // Se ingresa esta columna dentro del espacio reservado para las filas dentro de la tabla de Grupos Musicales.
                $("#cmbRolUsuario").append(option);


            });// Fin de la iteracion entre los objetos del resultado

        }// Fin de la funcion SUCCESS

    });// Fin de la llamada AJAX

}

/**
* Llena las options del drop down menu
**/
function nombresCarrera() {

    $.ajax({

        url: Servicios.Carreras + "/todos",
        type: "GET",
        dataType: "json",
        crossDomain: true,

        success: function (resultado) {

            $("#cmbCarrerasUsuario").empty();

            resultado.forEach(function (item) {

                // Se comienza a construir la opcion para la tabla.
                var option = '<option value="' + item.Id + '">' + item.Nombre + '</option>';

                // Se ingresa esta columna dentro del espacio reservado para las filas dentro de la tabla de Grupos Musicales.
                $("#cmbCarrerasUsuario").append(option);


            });// Fin de la iteracion entre los objetos del resultado

        }// Fin de la funcion SUCCESS

    });// Fin de la llamada AJAX

}



/**
* Caso de uso: Editar usuario
**/
function editarUsuario(obj) {
    $.ajax({

        url: Servicios.Usuarios + "/actualizar",
        type: "GET",
        data: {
            'id': obj.id, 'nombre': obj.nombre, 'apellido': obj.apellido, 'genero': obj.genero,
            'correo': obj.correo, 'cedula': obj.cedula, 'estado': obj.estado,
            'nombre2': obj.nombre2, 'apellido2': obj.apellido2, 'telefono': obj.telefono
        },
        success: function (resultado) {
            $("#ventanaEditarUsuario").modal("hide");
            if (resultado == true) {
                refrescarTabla();
            }
            else {
                alert("Disculpe, hubo un error al momento de modificar el usuario\n\rpor favor intente más tarde.");
            }
        }

    });
}

/**
* Caso de uso: Editar contrasena de usuario
**/

function editarContraUsuario(id) {

    $.ajax({
        url: Servicios.Usuarios + "/changepass/" + id,
        type: "GET",
        success: function (resultado) {
            if (resultado == true) {
                alert("La clave de acceso ha sido editada exitosamente.");
            }
            else {
                alert("Disculpe, hubo un error al momento de modificar el usuario\n\rpor favor intente más tarde.");
            }
        }

    });
}


/**
* Caso de uso: Eliminar usuario
**/
function eliminarUsuario(id) {
    $.ajax({
        url: Servicios.Usuarios + "/borrar/" + id,
        type: "GET",
        success: function (resultado) {
            if (resultado == true) {
                refrescarTabla();
            }
            else {
                alert("Disculpe, hubo un error al momento de eliminar el usuario\n\rpor favor intente más tarde.");
            }
        }

    });

}