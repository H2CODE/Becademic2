<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Becademic.Master" CodeBehind="Permisos.aspx.vb" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="breadcrumbs" runat="server">
    <ul class="breadcrumb">
		<li>
			<i class="ace-icon fa fa-home home-icon"></i>
			<a href="../default.aspx">Home</a>
		</li>
        <li>
			<a href="./Roles.aspx">Gestion de roles</a>
		</li>
		<li class="active">Gestión de permisos del rol: <span class="nombreRolTxt"></span></li>
	</ul>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="titulo_contenido_principal" runat="server">
    Gestión de permisos para el rol: <span class="nombreRolTxt"></span>.
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="contenido_principal" runat="server">
    
    <div class="col-xs-12">
        <a href="./Roles.aspx" class="btn btn-inverse">Regresar</a>
    </div>

    <div class="col-xs-12">
        <form id="listaPermisosNuevos">
            <div id="contenidoPermisos" class="col-xs-12"></div>
            <div class="col-xs-12">
                <input type="submit" value="Guardar cambios" class="btn btn-primary" />
            </div>
        </form>
    </div>   
    
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

       <script src="/Codigo/Permisos.js"></script>

</asp:Content>
