<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Becademic.Master" CodeBehind="EstudiosSocioEconomicos.aspx.vb" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="breadcrumbs" runat="server">
    <ul class="breadcrumb">
		<li>
			<i class="ace-icon fa fa-home home-icon"></i>
			<a href="../default.aspx">Home</a>
		</li>
		<li class="active">Estudios socio-económicos</li>
	</ul>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="titulo_contenido_principal" runat="server">
    Gestión de estudios socio-económicos
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="contenido_principal" runat="server">

    <table class="table table-bordered table-striped table-hover">

        <thead>
            <tr>
                <td>Nombre del solicitante</td>
                <td>Tipo de beca</td>
                <td>Carrera</td>
                <td>¿Es elegible?</td>
                <td>Estudio Socioeconómico</td>
            </tr>
        </thead>

        <tbody id="tablaSolicitudes"></tbody>

    </table>

    <!-- Ventanas -->
    <div id="ventanasExtra"></div>

</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="footer" runat="server">
    <script src="/Codigo/Estudios.js"></script>
</asp:Content>
