<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Becademic.Master" CodeBehind="Calificaciones.aspx.vb"%>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="breadcrumbs" runat="server">
    <ul class="breadcrumb">
		<li>
			<i class="ace-icon fa fa-home home-icon"></i>
			<a href="../index.aspx">Home</a>
		</li>
		<li class="active">Calificaciones</li>
	</ul>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="titulo_contenido_principal" runat="server">
    Consulta y gestión de calificaciones
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="contenido_principal" runat="server">

    <div class="row">
        <div class="col-xs-6">
            <h3 class="lighter block green">Información personal</h3>
            <p>Ingrese la identificación del estudiante al que desea consultar las calificaciones.</p>
            <p>&nbsp;</p>

            <form>
                <p>Carnet o cédula del estudiante:</p>
                <p>
                    <input type="text" id="txtCarnet" />
                    <button type="button" id="btnBuscar" class="btn btn-primary">Buscar</button>
                </p>
            </form>

            <div id="infoEstudiante"></div>
        </div>
    </div>
   
    <div class="row" id="calificaciones" style="display: none;">
            <div class="col-md-12">
                <!-- Tabla de calificaciones -->
                <h3 class="lighter block green">Calificaciones</h3>

                <div class="alert alert-warning" id="msjNoHayCalificaciones" style="display: none;">
                    <h4>No hay calificaciones para mostrar</h4>
                </div>

                <div class="col-md-12 validarPermiso" data-permiso="9">
                    <p>
                        <button class="btn btn-info" data-toggle="modal" data-target="#ventanaAgregarCalificacion">Agregar nueva calificación</button>
                    </p>
                </div>

                <table class="table table-bordered table-hover table-striped">
                    <!-- Encabezado de la tabla -->
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Curso</th>
                            <th>Nota</th>
                            <th>Periodo</th>
                            <th>Año</th>
                            <th>Comentario</th>
                            <th style="width:220px;">Acciones</th>
                        </tr>
                    </thead>
                    <!-- Cuerpo de la tabla, aqui es donde el javascript escribe en tiempo de ejecucion las filas con la informacion necesaria -->
                    <tbody id="contenidoTabla"></tbody>

                </table>
                <!-- / Tabla de carreras -->
        </div>
    </div>
    <!-- / Contenedor principal -->


    <!-- Ventana para modificar una calificación -->
    <div class="modal fade" id="ventanaEditarCalificacion">
      <div class="modal-dialog">
        <div class="modal-content">

            <form id="frmModificarCalificacion">

                <div class="modal-header">
                    <!-- Encabezado de la ventana -->
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title">Modificar calificación</h4>
                    <dl class="dl-horizontal" style="margin-bottom: 0px;">
                        <dt style="width: 80px;">Curso:</dt>
                        <dd style="margin-left: 90px;" id="txtCurso_editar"></dd>
                    </dl>
                    <!-- / Encabezado de la ventana -->
                </div>

                <div class="modal-body">
                    <!-- Cuerpo de la ventana -->
                        <!-- Campo para escribir el nombre del calificaciona -->
                        <div class="form-group">
                            <input type="hidden" id="txtIdCalificacion_editar" />
                            <input type="hidden" id="txtIdCurso_editar" />
                            
                            <!-- Campo para escribir el Nota de la calificacion -->
                            <div class="form-group">
                                <label for="txtNombreCarrera_editar">Nota:</label>
                                <input type="text" class="form-control validate[required,custom[integer],min[0],minSize[1],maxSize[3]]" id="txtNota_editar" placeholder="Ingrese la nota..." />
                            </div>

                            <!-- Campo para escribir la Periodo de la calificacion -->
                            <div class="form-group">
                                <label for="txtDescripcionCarrera_editar">Periodo:</label>
                                <select class="form-control" id="cmbPeriodo_editar">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>

                            <!-- Campo para insertar un Año -->
                            <div class="form-group">
                                <label for="txtIconoCarrera_editar">Año:</label>
                                <input type="text" class="form-control validate[required,custom[integer],min[0],max[2015],minSize[4],maxSize[4]]" id="txtAnnio_editar" placeholder="Seleccione año..." />
                            </div>

                            <!-- Campo para insertar un Comentario -->
                            <div class="form-group">
                                <label for="txtColorCarrera_editar">Comentario:</label>
                                <textarea class="form-control " id="txtComentario_editar" rows="5" placeholder="Ingrese un comentario..." ></textarea>
                            </div>
                        </div>

                    <!-- / Cuerpo de la ventana -->
                </div>

                <div class="modal-footer">
                    <!-- Zona inferior de la ventana -->
                    <button type="button" class="btn btn-primary submit" id="btnEditarCalificacion">Modificar calificación</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                    <!-- / Zona inferior de la ventana -->
                </div>

            </form>

        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!-- / Ventana para modificar una calificación -->


    <!-- Ventana para agregar una nueva calificación -->
    <div class="modal fade" id="ventanaAgregarCalificacion">
      <div class="modal-dialog">
        <div class="modal-content">

            <form id="formularioAgregarCalificacion">

                <div class="modal-header">
                    <!-- Encabezado de la ventana -->
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title">Agregar nueva calificación</h4>
                    <!-- / Encabezado de la ventana -->
                </div>
                <div class="modal-body">
                    <!-- Cuerpo de la ventana -->

                        <!-- Campo para seleccionar el curso -->
                        <div class="form-group">
                            <label for="cmbCursos_listar" id="lblCursos">Cursos...</label>
                            <select name="curso_agregar" class="form-control validate[required]" id="cmbCurso_agregar">
                            </select>
                        </div>
                        
                        <!-- Campo para escribir el Nota de la calificacion -->
                        <div class="form-group">
                            <label for="txtNombreCarrera_agregar">Nota:</label>
                            <input type="text" class="form-control validate[required,custom[integer],min[0],minSize[1],maxSize[3]] text-input" id="txtNota_agregar" placeholder="Ingrese la nota..." />
                        </div>

                        <!-- Campo para escribir la Periodo de la calificacion -->
                        <div class="form-group">
                            <label for="txtDescripcionCarrera_agregar">Periodo:</label>
                            <select name="periodo_agregar" class="form-control validate[required]" id="cmbPeriodo_agregar">
                                <option style="display:none;" selected="selected" >--Seleccione un periodo--</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>

                        <!-- Campo para insertar un Año -->
                        <div class="form-group">
                            <label for="txtIconoCarrera_agregar">Año:</label>
                            <input type="text" class="form-control validate[required,custom[integer],min[0],max[2015],minSize[4],maxSize[4]] text-input" id="txtAnnio_agregar" placeholder="Seleccione año..." />
                        </div>

                        <!-- Campo para insertar un Comentario -->
                        <div class="form-group">
                            <label for="txtColorCarrera_agregar">Comentario:</label>
                            <textarea class="form-control " id="txtComentario_agregar" rows="5" placeholder="Ingrese un comentario..." ></textarea>
                        </div>

                    <!-- / Cuerpo de la ventana -->
                </div>
                <div class="modal-footer">
                    <!-- Zona inferior de la ventana -->
                    <button type="button" class="btn btn-primary submit" id="btnAgregarCalificacion">Agregar calificación</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                    <!-- / Zona inferior de la ventana -->
                </div>

            </form>

        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!-- / Ventana para agregar una nueva calificación -->


    <!-- Ventana Loading.... -->
    <div class="modal fade" id="ventanaLoader">
      <div class="modal-dialog" style="width:126px;">
            <div class="modal-content">
                 <img src="../../assets/img/ajax-loader.gif" class="ïmg-responsive" />
            </div>
        </div>
    </div>
    <!-- Ventana Loading.... -->


</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="footer" runat="server">
    <script src="/Codigo/Calificaciones.js"></script>
</asp:Content>
