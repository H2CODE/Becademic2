var carrera_actual = null;

$(function () {

    $("#ventanaLoader").modal("show");

    carrera_actual = $.sessionStorage.get("carrera_actual");

    $.ajax({

        url: Servicios.Carreras + "/detalles/"+carrera_actual,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        async: false,
        success: function (resultado) {
            
            $(".nombreCarrera").text(resultado.Nombre);

        }// Fin de la funcion SUCCESS

    });// Fin de la llamada AJAX para todos los cursos


    generarListaDeCursos();


    $(".btnGuardarCambios").click(function () {

        var PaqueteDeCursos = {
            IdCarrera: carrera_actual,
            Cursos: []
        };

        $.each($("#listaDeCursosAsignados .elementoPeriodo"), function (index, value) {

            var periodo_actual = $(value).find(".numeroPeriodo").text();

            $.each($(value).find(".listaCursos .elementoCurso"), function (index, value){
            
                PaqueteDeCursos.Cursos.push({
                    Id: $(value).attr("id"),
                    IdCarrera: carrera_actual,
                    Periodo: periodo_actual
                });
            
            });

        });

        console.log("Lo que sale");
        console.log(PaqueteDeCursos);

        $.ajax({
            contentType: 'application/json',
            url: Servicios.Carreras + "/asignarCursosACarrera",
            type: "POST",
            dataType: "json",
            crossDomain: true,
            async: false,
            data: JSON.stringify(PaqueteDeCursos),
            success: function (resultado) {
                console.log("Lo que viene");
                console.log(resultado);
            }// Fin de la funcion SUCCESS

        });// Fin de la llamada AJAX

    });


});

function generarListaDeCursos() {

    var listaDeCursosDisponibles = [];
    var listaDeCursosAsignados = [];
    var listaDePeriodos = [];

    $.ajax({

        url: Servicios.Cursos + "/todos",
        type: "GET",
        dataType: "json",
        crossDomain: true,
        async: false,
        success: function (resultado) {
            listaDeCursosDisponibles = resultado;
        }// Fin de la funcion SUCCESS

    });// Fin de la llamada AJAX para todos los cursos

    $.ajax({

        url: Servicios.Carreras + "/cursosDeCarrera/"+carrera_actual,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        async: false,
        success: function (resultado) {
            listaDeCursosAsignados = resultado;
        }// Fin de la funcion SUCCESS

    });// Fin de la llamada AJAX para todos los cursos

    listaDeCursosDisponibles.forEach(function (curso) {

        $("#listaDeCursosDisponibles").append('<div class="well well-sm col-md-6 elementoCurso" id="'+curso.Id+'">'+curso.Nombre+'</div>');
        $("#listaDeCursosDisponibles .elementoCurso").draggable({
            helper: "clone",
            revert: "invalid"
        });

    });

    listaDeCursosAsignados.forEach(function (curso) {

        var noExiste = true;
        listaDePeriodos.forEach(function (item) {
            if (item.Periodo == curso.Periodo) {
                noExiste = false;
                item.contenido += '<div class="well well-sm clearfix elementoCurso" id="' + curso.Id + '"><button type="button" class="btnBorrarCurso btn btn-danger btn-xs pull-right"><span class="glyphicon glyphicon-trash"></span> Borrar curso </button> ' + curso.Detalles.Nombre + ' <input type="hidden" class="curso" id="' + curso.Id + '" /></div>';
            }
        });

        if (noExiste) {
            listaDePeriodos.push({ Periodo: curso.Periodo, contenido: '' });
        }

    });

    listaDePeriodos.forEach(function (item) {
        $("#listaDeCursosAsignados").append('<div class="panel panel-default elementoPeriodo"> <div class="panel-heading clearfix">Periodo <span class="numeroPeriodo">'+ item.Periodo +'</span> <button type="button" class="btnBorrarPeriodo btn btn-danger btn-xs pull-right"><span class="glyphicon glyphicon-trash"></span> Borrar todo el periodo</button></div> <div class="panel-body listaCursos">' + item.contenido + '</div> <input type="hidden" name="periodo" value="1" /> <input type="hidden" name="idcarrera" value="1" /> </div>');
    });

    activarArrastrarYSoltar();
    activarBotonesDeAccionesAdicionales();
    $(".btnAgregarPeriodo").click(function () {

        $("#listaDeCursosAsignados").append('<div class="panel panel-default elementoPeriodo"> <div class="panel-heading clearfix">Periodo <span class="numeroPeriodo"></span> <button type="button" class="btnBorrarPeriodo btn btn-danger btn-xs pull-right"><span class="glyphicon glyphicon-trash"></span> Borrar todo el periodo</button></div> <div class="panel-body listaCursos"> </div> <input type="hidden" name="periodo" value="1" /> <input type="hidden" name="idcarrera" value="1" /> </div>');
        activarArrastrarYSoltar();
        activarBotonesDeAccionesAdicionales();
        recalcularPeriodos();

    });

}


/*
*   Botones de Acciones especiales.
*/
function activarBotonesDeAccionesAdicionales()
{
    $(".btnBorrarCurso").click(function () {

        $(this).parent().remove();

    });

    $(".btnBorrarPeriodo").click(function () {

        $(this).parents(".elementoPeriodo").remove();

    });

}

/*
*   Funcionalidad de arrastrar y soltar
*/
function activarArrastrarYSoltar()
{
    $(".elementoPeriodo .listaCursos").droppable({
        accept: ".elementoCurso",
        drop: function (event, ui) {

            console.log(event);
            console.log(ui);

            $(this).append('<div class="well well-sm clearfix elementoCurso" id="' + ui.draggable.attr("id") + '"><button type="button" class="btnBorrarCurso btn btn-danger btn-xs pull-right"><span class="glyphicon glyphicon-trash"></span> Borrar curso </button> ' + ui.draggable.text() + ' <input type="hidden" class="curso" id="' + ui.draggable.attr("id") + '" /></div>');
            $(".btnBorrarCurso").click(function () {

                $(this).parent().remove();

            });

        }
    }).sortable({
        items: ".well",
    });


    $("#listaDeCursosAsignados").sortable({
        stop: function () {
            recalcularPeriodos();
        }
    });
}

function recalcularPeriodos()
{
    $.each($("#listaDeCursosAsignados .elementoPeriodo"), function (index, value) {

        $(value).find(".numeroPeriodo").text(index + 1);

    });
}