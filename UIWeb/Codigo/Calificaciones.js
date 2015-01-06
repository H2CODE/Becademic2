/**
* Calificaciones
**/

// Variables globales
var listaUsuarios = [];
var listaCarreras = [];
var idUsuario = null;
var idCarrera = null;
var btnBuscar1raVez = true; // Bandera que controla si es la primera vez en que se presiona el botón Buscar
var calificacionAgregadaOModificada = false; // Bandera para comprobar si se ha agregado o modificado alguna calificación

// Variables globales que indentifican la direccion del webservice hacia el cual se deben hacer las peticiones
var serverUsuarios = Servicios.Usuarios;
var serverCarreras = Servicios.Carreras;
var serverCalificaciones = Servicios.Calificaciones;
var serverBecas = Servicios.Becas;


/******************************
*   Inicializador del JQuery  *
******************************/

$(function () {

    // Mostrar ventana Loading
    $("#ventanaLoader").modal("show");

    /**
    * Se habilitan las validaciones de datos para los formularios
    **/
    $("#formularioAgregarCalificacion").validationEngine();
    $("#frmModificarCalificacion").validationEngine();


    /**
    * Recolección de datos de los usuarios
    **/
    $.ajax({
        url: serverUsuarios + "/todos",
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function (usuarios) {
            listaUsuarios = usuarios;

            // Ocultar ventana Loading
            $("#ventanaLoader").modal("hide");

        }// Fin de la funcion SUCCESS
    });// Fin de la llamada AJAX


    /**
    * Evento del boton de buscar usuario por carnet
    **/
    $("#btnBuscar").click(function () {

        var carnet = $("#txtCarnet").val();

        // Hacer ocultar la información de las calificaciones si había aparecido antes
        // Se llama a la siguiente función una vez la animación finalice
        $('#msjNoHayCalificaciones').hide(500);
        $('#calificaciones').hide(1000);
        if (btnBuscar1raVez == true) {
            btnBuscar1raVez = false;
            buscarUsuarioPorCarnet(carnet);
        } else {
            $('#infoEstudiante').hide(
                1000,
                function () {                
                    buscarUsuarioPorCarnet(carnet);
                }
            );
        }

    });


    /**
    * Evento del botón modificar calificación
    **/
    $("#btnEditarCalificacion").click(function () {

        // Primero se confirma la modificación
        bootbox.confirm(
            "Está seguro que desea modificar la calificación?",
            function (respuesta) {
                if (respuesta == true) {
                    // Se procede a modificar la calificación
                    var calificacion = {
                        "idCalificacion": $("#txtIdCalificacion_editar").val(),
                        "idCurso": $("#txtIdCurso_editar").val(),
                        "nota": $("#txtNota_editar").val(),
                        "periodo": $("#cmbPeriodo_editar").val(),
                        "annio": $("#txtAnnio_editar").val(),
                        "comentario": $("#txtComentario_editar").val(),
                    };
                    modificarCalificacion(calificacion);
                }
            }
        );
    });


    /**
    * Evento del botón agregar calificación
    **/
    $("#btnAgregarCalificacion").click(function () {

        var nuevaCalificacion = {
            "idUsuario": idUsuario,
            "idCurso": $("#cmbCurso_agregar").val(),
            "nota": $("#txtNota_agregar").val(),
            "periodo": $("#cmbPeriodo_agregar").val(),
            "annio": $("#txtAnnio_agregar").val(),
            "comentario": $("#txtComentario_agregar").val(),
        };
        agregarCalificacion(nuevaCalificacion);
    });

});



/**
* Buscar usuario por cédula o carnet
**/
function buscarUsuarioPorCarnet(carnet) {

    var usuarioSeleccionado = null;

    listaUsuarios.forEach(function (usuario) {

        if (usuarioSeleccionado == null) {
            if (usuario.Cedula == carnet) {

                usuarioSeleccionado = usuario;

            }
            else {
                usuarioSeleccionado = null;
            }
        }

    });

    var contenidoUsuario = "";
    if (usuarioSeleccionado != null) {
        var esEstudiante = 0;
        usuarioSeleccionado.LstRoles.forEach(function (rol) {
            if (rol.Id == 3) {
                esEstudiante += 1;
            }
        });
        if (esEstudiante > 0) {
            idUsuario = usuarioSeleccionado.Id;
            contenidoUsuario += '<p>&nbsp;</p><h5>Información encontrada</h5>';
            contenidoUsuario += '<dl class="dl-horizontal">';
            contenidoUsuario += '<dt style="width: 80px;">Nombre:</dt> <dd style="margin-left: 100px;">' + usuarioSeleccionado.Nombre + " " + usuarioSeleccionado.PrimerApellido + '</dd>';
            contenidoUsuario += '<dt style="width: 80px;">Correo:</dt> <dd style="margin-left: 100px;">' + usuarioSeleccionado.Correo + '</dd>';
            buscarCarrerasPorUsuario(idUsuario);

            if (listaCarreras.length > 0) {
                if (listaCarreras.length == 1) {
                    contenidoUsuario += '<dt style="width: 80px;">Carrera:</dt> <dd style="margin-left: 100px;">' + listaCarreras[0].Nombre + '</dd>';
                    contenidoUsuario += '</dl>';
                    actualizarVentanaAgregarCalificacion(listaCarreras[0].Id, listaCarreras[0].Nombre);
                } else {
                    contenidoUsuario += '</dl>';
                    contenidoUsuario += '<h3 class="lighter block green">Carrera</h3>';
                    contenidoUsuario += '<p>Seleccione la carrera de la que desea consultar las calificaciones.</p>';
                    contenidoUsuario += '<ul>';
                    listaCarreras.forEach(function (carrera) {
                        contenidoUsuario += '<li><input type="radio" onchange="carreraSeleccionada(this)" value="' + carrera.Id + '" nombre="' + carrera.Nombre + '" name="carrera"> ' + carrera.Nombre + '</li>';
                    });
                    contenidoUsuario += '</ul>';
                }             
            } else {
                contenidoUsuario += '</dl>';
                contenidoUsuario += '<div class="alert alert-warning">';
                contenidoUsuario += '<h4>El usuario seleccionado no tiene carreras asignadas.</h4>';
                contenidoUsuario += '<p>Por favor asigne una carrera al estudiante en el módulo académico o seleccione otro usuario.</p>'
                contenidoUsuario += '</div>';
            }
        } else {
            contenidoUsuario += '<div class="alert alert-danger">';
            contenidoUsuario += '<p>&nbsp;</p><h4>El usuario seleccionado no es un estudiante.</h4>';
            contenidoUsuario += '</div>';
        }
    }
    else {
        contenidoUsuario += '<p>&nbsp;</p><div class="alert alert-danger"><h4>Carnet no encontrado.</h4></div>';
    }

    $("#infoEstudiante").html(contenidoUsuario);
    $("#infoEstudiante").show(1000);
}


/**
* Buscar las carreras del usuario seleccionado
**/
function buscarCarrerasPorUsuario(idUsuario) {

    $.ajax({
        url: serverCarreras + "/listarCarrerasPorUsuario/" + idUsuario,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        async: false,
        success: function (carreras) {
            listaCarreras = carreras;
        }// Fin de la funcion SUCCESS
    });// Fin de la llamada AJAX
}


/**
* Acción que se ejecuta al seleccionar la carrera
**/
function carreraSeleccionada(obj) {

    // Hacer ocultar la información de las calificaciones si había aparecido antes
    // Se llama a la siguiente función una vez la animación finalice
    $('#msjNoHayCalificaciones').hide(500);
    $('#calificaciones').hide(
        // Duración de la animación
        1000,
        // Función a realizar cuando termine la animación
        function () {
            actualizarVentanaAgregarCalificacion($(obj).attr("value"), $(obj).attr("nombre"));
        }
    );
}

/**
* Actualizar ventana Agregar nueva calificación.
* Es necesario realizar este paso antes de llenar la tabla de calificaciones
* para que no haya confictos con la ventana de Agregar nueva calificación si
* el usuario quiere abrir pronto esa ventana donde se muestran los cursos de
* la carrera seleccionada.
**/
function actualizarVentanaAgregarCalificacion(pIdCarrera, pNombreCarrera) {

    // Guardando valor de variable global
    idCarrera = pIdCarrera;

    // Tomar el nombre de la carrera para la ventana de Agregar nueva calificación
    $("#lblCursos").html("Cursos de la carrera " + pNombreCarrera + ":");

    // Actualizar el combobox de carreras para la ventana de Agregar nueva calificación
    $.ajax({
        url: serverCarreras + "/listarCursosCarrera/" + idCarrera,
        type: "GET",
        dataType: "json",
        success: function (listaCursos) {

            // Limpiar la lista de cursos del combobox
            $("#cmbCurso_agregar").html('<option style="display:none;" selected="selected" >--Seleccione un curso--</option>');

            // se agrega una opción para cada curso disponible dentro del combobox
            listaCursos.forEach(function (curso) {
                var opcion = '<option value="' + curso.Id + '">' + curso.Nombre + '</option>';
                $("#cmbCurso_agregar").append(opcion);
            });

            // Una vez actualizada esta ventana, se procede a generar la tabla de calificaciones
            llenarTablaCalificaciones()

        }// Fin de la funcion SUCCESS

    });// Fin de la llamada AJAX
}


/**
* Llenar la tabla de calificaciones
**/
function llenarTablaCalificaciones() {

    /**
    * Busca las calificaciones de un usuario según su carrera
    **/
    $.ajax({
        url: serverCalificaciones + "/todos/" + idUsuario + "/" + idCarrera,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function (listaCalificaciones) {

            // Vaciar contenido de la tabla
            $("#contenidoTabla").html("");

            // En caso de no haber registros de calificaciones para mostrar, hacer aparecer el mensaje que lo indica.
            if (listaCalificaciones.length == 0) {
                $('#msjNoHayCalificaciones').show();
                //hayCalificaciones = false;
            } else {
                // Se toman los datos de cada fila de la tabla
                listaCalificaciones.forEach(function (calificacion) {

                    var fila = '' +
                        '<tr>' +
                            '<td>' + calificacion.Id + '</td>' +
                            '<td>' + calificacion.Curso.Nombre + '</td>' +
                            '<td>' + calificacion.Nota + '</td>'+
                            '<td>' + calificacion.Periodo + '</td>' +
                            '<td>' + calificacion.Annio + '</td>' +
                            '<td>' + calificacion.Comentarios + '</td>' +
                            // Se añade la columna para los botones de borrar y editar.
                            '<td>' +
                                '<button class="btn btn-warning btnModificarCalificacion" id="' + calificacion.Id + '">' +
                                    '<span class="glyphicon glyphicon-trash"></span>' +
                                    ' Editar' +
                                '</button>' +
                                '<button class="btn btn-danger btnBorrarCalificacion" id="' + calificacion.Id + '">' +
                                    '<span class="glyphicon glyphicon-trash"></span>' +
                                    ' Borrar' +
                                '</button>' +
                            '</td>' +
                        '</tr>';

                    // Se ingresa esta columna dentro de la tabla
                    $('#contenidoTabla').append(fila);

                });// Fin de la iteracion entre los objetos del resultado

                // Después de haber sido generados los botones de modifiar y eliminar de cada fila, falta crear los eventos click.


                /**
                * Evento para el nuevo boton de modificar
                **/
                $(".btnModificarCalificacion").click(function () {

                    // Antes de abrir la ventana se escriben los detalles de la calificación.
                    buscarCalificacion($(this).attr("id"), function (calificacion) {

                        $("#txtIdCalificacion_editar").val(calificacion.Id);
                        $("#txtIdCurso_editar").val(calificacion.Curso.Id);
                        $("#txtCurso_editar").html(calificacion.Curso.Nombre);
                        $("#txtNota_editar").val(calificacion.Nota);
                        $("#cmbPeriodo_editar").val(calificacion.Periodo);
                        $("#txtAnnio_editar").val(calificacion.Annio);
                        $("#txtComentario_editar").val(calificacion.Comentarios);

                        // Se abre la ventana para editar un grupo
                        $("#ventanaEditarCalificacion").modal("show");
                    });
                });


                /**
                * Evento para el nuevo boton de borrar
                **/
                $(".btnBorrarCalificacion").click(function () {

                    // Se obtiene el ID colocado en el atributo del boton
                    var idCalificacion = $(this).attr("id");

                    // Confirmar eliminación
                    buscarCalificacion(idCalificacion, function (calificacion) {
                        bootbox.confirm(
                            "Está seguro que desea eliminar la calificación para el curso " + calificacion.Curso.Nombre + "?",
                            function (respuesta) {
                                if (respuesta == true) {
                                    // Se llama a la función para eliminar la calificación
                                    eliminarCalificacion(idCalificacion);
                                }
                            }
                        );
                    });
                    
                });

            }// Fin del if-else listaCalificaciones.length == 0

            // Hacer mostrar la información de las calificaciones
            $('#calificaciones').show(1000);
            // Animación para desplazar la pantalla sobre el título de Calificaciones
            $('html, body').animate(
                // Objeto de CSS
                { scrollTop: $('#calificaciones').offset().top },
                // Duración de la animación
                1000,
                // Función a realizar cuando termine la animación
                function () {
                    if (calificacionAgregadaOModificada == true) {
                        calificacionAgregadaOModificada = false;
                        validarBeca(idUsuario, idCarrera);
                    }
                }
            );

        }// Fin de la funcion SUCCESS

    });// Fin de la llamada AJAX
}


/**
* Buscar la calificación con el id especificado
**/
function buscarCalificacion(id, onSuccess) {
    $.ajax({
        url: serverCalificaciones + "/detalles/" + id,
        type: "GET",
        dataType: "json",
        success: onSuccess
    });
}


/**
* Modificar la calificación aportada
**/
function modificarCalificacion(calificacion) {

    $.ajax({
        url: serverCalificaciones + "/actualizar",
        type: "GET",
        data: {
            'idCalificacion': calificacion.idCalificacion,
            'idCurso': calificacion.idCurso,
            'nota': calificacion.nota,
            'periodo': calificacion.periodo,
            'annio': calificacion.annio,
            'comentario': calificacion.comentario
        },
        success: function (resultado) {
            calificacionAgregadaOModificada = true;
            llenarTablaCalificaciones(idCarrera);
            $("#ventanaEditarCalificacion").modal("hide");
        }

    });
}


/**
* Buscar la calificación con el id especificado
**/
function eliminarCalificacion(id) {
    $.ajax({
        url: serverCalificaciones + "/borrar/" + id,
        type: "GET",
        success: function (resultado) {
            calificacionAgregadaOModificada = true;
            llenarTablaCalificaciones(idCarrera);
        }
    });
}


/**
* Agregar nueva calificacion
**/
function agregarCalificacion(calificacion) {

    $.ajax({
        url: serverCalificaciones + "/crear",
        type: "GET",
        data: {
            'idUsuario': calificacion.idUsuario,
            'idCurso': calificacion.idCurso,
            'nota': calificacion.nota,
            'periodo': calificacion.periodo,
            'annio': calificacion.annio,
            'comentario': calificacion.comentario
        },
        success: function (resultado) {
            calificacionAgregadaOModificada = true;
            llenarTablaCalificaciones(idCarrera);
            $("#ventanaAgregarCalificacion").modal("hide");
            $('#msjNoHayCalificaciones').hide(1000);
        }
    });
}


/**
* Llama al servicio de validarBeca para comprobar si el promedio de calificaciones
* de un estudiante cumple con el promedio mínimo para inactivar o activar su beca
* otorgada (si la tuviera) para una carrera indicada.
**/
function validarBeca(idUsuario, idCarrera) {
    $.ajax({
        url: serverBecas + "/validarBeca",
        type: "GET",
        data: {
            'idUsuario': idUsuario,
            'idCarrera': idCarrera
        },
        success: function (mensaje) {
            bootbox.alert("<h3>Validador de estados de becas</h3><br />" + mensaje);
        }

    });
}