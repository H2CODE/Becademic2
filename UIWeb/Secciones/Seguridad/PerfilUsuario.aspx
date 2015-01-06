<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Becademic.Master" CodeBehind="PerfilUsuario.aspx.vb" Inherits="UIWeb.PerfilUsuario" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="breadcrumbs" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="titulo_contenido_principal" runat="server">
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="contenido_principal" runat="server">
        <div class="modal-dialog">
        <div class="modal-content">

            <form id="formularioPerfilUsuario">

                <div class="modal-header">
                    <!-- Encabezado de la ventana -->
                    <h4 class="modal-title">Mi perfil</h4>
                    <!-- / Encabezado de la ventana -->
                </div>
                <div class="modal-body">
                    <!-- Cuerpo de la ventana -->                        
                    <!-- Campo para mostrar la cedula del usuario -->
                    <div class="form-group">
                        <label for="lblCedula_Perfil">C&eacute;dula:</label>
                        <input type="text" class="form-control" id="txtCedula" disabled="disabled"/>
                    </div>
                    <!-- Campo para mostrar el primer nombre del usuario -->
                    <div class="form-group">
                        <label for="lblPrimerNombre_Perfil">Primer nombre:</label>
                        <input type="text" class="form-control" id="txtPrimerNombre" disabled="disabled"/>
                    </div>
                    <!-- Campo para mostrar el segundo nombre del usuario -->
                    <div class="form-group">
                        <label for="lblSegundoNombre_Perfil">Segundo Nombre:</label>
                        <input type="text" class="form-control" id="txtSegundoNombre" disabled="disabled"/>
                    </div>
                    <!-- Campo para mostrar el primer apellido del usuario -->
                    <div class="form-group">
                        <label for="lblPrimerApellido_Perfil">Primer Apellido:</label>
                        <input type="text" class="form-control" id="txtPrimerApellido" disabled="disabled"/>
                    </div>
                    <!-- Campo para mostrar el segundo apellido del usuario -->
                    <div class="form-group">
                        <label for="lblSegundoApellido_Perfil">Segundo Apellido:</label>
                        <input type="text" class="form-control" id="txtSegundoApellido" disabled="disabled"/>
                    </div>
                    <!-- Campo para mostrar el correo del usuario -->
                    <div class="form-group">
                        <label for="lblCorreo_Perfil">Correo:</label>
                        <input type="text" class="form-control" id="txtCorreo" disabled="disabled"/>
                    </div>
                    <!-- Campo para insertar la cantidad de credito. -->
                    <div class="form-group">
                        <label for="lblTelefono_Perfil">Tel&eacute;fono:</label>
                        <input type="text" class="form-control" id="txtTelefono" disabled="disabled"/>
                    </div>
                    <!-- / Cuerpo de la ventana -->
                </div>
                <div class="modal-footer">
                    <!-- Zona inferior de la ventana -->
        
                    <!-- / Zona inferior de la ventana -->
                </div>

            </form>
            </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="footer" runat="server">
    <script src="../../assets/codigo_secciones/MostrarPerfil.js"></script>
</asp:Content>
