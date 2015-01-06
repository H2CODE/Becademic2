<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Becademic.Master" CodeBehind="CursosDeCarreras.aspx.vb" Inherits="UIWeb.CursosDeCarreras" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="breadcrumbs" runat="server">
    <ul class="breadcrumb">
		<li>
			<i class="ace-icon fa fa-home home-icon"></i>
			<a href="../default.aspx">Home</a>
		</li>
        <li>
			<i class="ace-icon fa fa-home home-icon"></i>
			<a href="./Carreras.aspx">Carreras</a>
		</li>
		<li class="active">Asignación de cursos a la carrera: <span class="nombreCarrera"></span></li>
	</ul>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="titulo_contenido_principal" runat="server">
    Asignacion de cursos a la carrera: <span class="nombreCarrera"></span>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="contenido_principal" runat="server">

    <!-- Boton de guardar cambios -->
    <div class="row">
        <div class="col-xs-12">
            <button class="btn btn-primary btnGuardarCambios"><span class="glyphicon glyphicon-floppy-disk"></span> Guardar cambios</button>
        </div>
    </div>
    <!-- / Boton de guardar cambios -->

    <!-- Contenido principal -->
    <div class="row">

        <!-- Columna de periodos y cursos asignados -->
        <div class="col-md-6">

            <div class="row">
                <div class="col-xs-12">
                    <h3 class="lead">Cursos asignados</h3>
                </div>
            </div>

            <div class="col-xs-12">
                <div class="row" id="listaDeCursosAsignados">

                </div>
            </div>

            <div class="col-xs-12">
                <button class="btn btn-warning btnAgregarPeriodo"><span class="glyphicon glyphicon-plus"></span> Agregar un nuevo periodo</button>
            </div>
            
        </div>
        <!-- / Columna de periodos y cursos asignados -->

        <!-- Columna de cursos disponibles -->
        <div class="col-md-6">

            <div class="row">
                <div class="col-xs-12">
                    <h3 class="lead">Cursos disponibles</h3>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12" id="listaDeCursosDisponibles">

                </div>
            </div>

        </div>
        <!-- / Columna de cursos disponibles -->

    </div>
    <!-- / Contenido principal -->

</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="footer" runat="server">
     <script src="/Codigo/CursoDeCarreras.js"></script>
</asp:Content>
