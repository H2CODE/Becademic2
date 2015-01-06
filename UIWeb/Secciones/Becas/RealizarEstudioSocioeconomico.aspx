<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Becademic.Master" CodeBehind="RealizarEstudioSocioeconomico.aspx.vb" Inherits="UIWeb.RealizarEstudioSocioeconomico" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="breadcrumbs" runat="server">
    <ul class="breadcrumb" runat="server">
		<li>
			<i class="ace-icon fa fa-home home-icon"></i>
			<a href="../default.aspx">Home</a>
		</li>
		<li>
			<a href="./ListaDeSolicitudes.aspx">Lista de solicitudes</a>
		</li>
        <li class="active">
            Realizar estudio socioeconomico
        </li>
	</ul>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="titulo_contenido_principal" runat="server">
    Realizar estudio socioeconomico
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="contenido_principal" runat="server">

    <form id="formularioEstudioSocioEconomico">
	            <input type="hidden" id="idsolicitud_txt" value="0" />
				
                <div class="form-group col-xs-12">
                    <h3>Datos personales</h3>
                    <hr />
				</div>

				<div class="form-group col-md-4">
					<label>Nombre</label>
					<input type="text" class="form-control validate[required,custom[onlyLetterSp]]" id="nombre_txt" disabled="disabled">
				</div>

				<div class="form-group col-md-4">
					<label>Apellidos</label>
					<input type="text" class="form-control validate[required,custom[onlyLetterSp]]" id="apellidos_txt" disabled="disabled">
				</div>

				<div class="form-group col-md-4">
					<label>Cedula</label>
					<input type="text" class="form-control validate[required,custom[integer]]" id="cedula_txt" disabled="disabled">
				</div>

				<div class="form-group col-md-4">
					<label>Fecha nacimiento</label>
					<input type="text" class="form-control validate[required]" id="fecha_nacimiento_txt">
				</div>

				<div class="form-group col-md-4">
					<label>Edad</label>
					<input type="text" class="form-control validate[required,min[17],max[24]]" id="edad_txt" readonly="readonly">
				</div>

				<div class="form-group col-md-4">
					<label>Nacionalidad</label>
					<select id="nacionalidadSelect" class="form-control validate[required]">
						<option data-peso="3" value="Nacional">Nacional</option>
						<option data-peso="2" value="Residente">Residente</option>
						<option data-peso="1" value="Extranjero">Extranjero</option>
					</select>
				</div>

				<div class="form-group col-xs-12">
					<h4>Domicilio</h4>
				</div>

				<div class="form-group col-md-4">
					<label>Provincia</label>
					<select id="provinciaSelect" class="form-control validate[required]"></select> 
				</div>

				<div class="form-group col-md-4">
					<label>Canton</label>
					<select id="cantonSelect" class="form-control validate[required]"></select> 
				</div>

				<div class="form-group col-md-4">
					<label>Distrito</label>
					<select id="distritoSelect" class="form-control validate[required]"></select> 
				</div>
				
                <div class="form-group col-xs-12">
                    <h5>Zona de tipo:</h5>
                    <hr />
                </div>
		
				<div class="form-group col-xs-12">
					<div class="radio-inline">
					  <label>
					    <input type="radio" class="validate[groupRequired[zona]]" name="zona" value="Rural" data-peso="3" checked >
					    Rural
					  </label>
					</div>
					<div class="radio-inline">
					  <label>
					    <input type="radio" class="validate[groupRequired[zona]]" name="zona" value="Urbana" data-peso="1.5">
					    Urbana
					  </label>
					</div>
				</div>
				
				<div class="form-group col-xs-12">
					<h3>Condiciones de vivienda</h3>
                    <hr />
				</div>

				<div class="form-group col-md-3">
					<label>Piso</label>
					<select id="pisoSelect" class="form-control validate[required]">
						<option value="Ceramica, mosaico y similares." data-peso="1">Ceramica, mosaico y similares.</option>
						<option value="Cemento." data-peso="2">Cemento.</option>
						<option value="Madera." data-peso="2">Madera.</option>
						<option value="No tiene." data-peso="3">No tiene.</option>
					</select>
				</div>

				<div class="form-group col-md-3">
					<label>Cieloraso</label>
					<select id="cielorasoSelect" class="form-control validate[required]">
						<option value="Tiene" data-peso="1">Tiene</option>
						<option value="No Tiene" data-peso="2">No Tiene</option>
					</select>
				</div>

				<div class="form-group col-md-3">
					<label>Pared</label> 
					<select id="paredSelect" class="form-control validate[required]">
						<option value="Bloque, ladrillo, concreto." data-peso="1">Bloque, ladrillo, concreto.</option>
						<option value="Prefabricado." data-peso="2">Prefabricado.</option>
						<option value="Pared Forrada (madera, fibrolit, etc)." data-peso="3">Pared Forrada (madera, fibrolit, etc).</option>
						<option value="Pared sin Forro." data-peso="3">Pared sin Forro.</option>
					</select>
				</div>

				<div class="form-group col-md-3">
					<label>Techo</label> 
					<select id="techoSelect" class="form-control validate[required]">
						<option value="Zinc u otra lámina metálica." data-peso="1">Zinc u otra lámina metálica.</option>
						<option value="Entrepiso (cemento, madera,otro)." data-peso="2">Entrepiso (cemento, madera,otro).</option>
						<option value="Palma, Caña, teja artesanal." data-peso="3">Palma, Caña, teja artesanal.</option>
						<option value="Desecho." data-peso="3">Desecho.</option>
					</select>
				</div>

				<div class="form-group col-xs-12">
					<h3>Otros elementos</h3>
                    <hr />
				</div>
				
				

					<div class="col-sm-4">
						<h4>Computadoras</h4>

						<div class="radio-inline">
						  <label>
						    <input type="radio" class="validate[groupRequired[cantidadComputadoras]]" name="cantidadComputadoras" data-peso="3" value="0 - 1" checked>
						    0 - 1
						  </label>
						</div>
						<div class="radio-inline">
						  <label>
						    <input type="radio" class="validate[groupRequired[cantidadComputadoras]]" name="cantidadComputadoras" data-peso="2" value="2">
						    2
						  </label>
						</div>
						<div class="radio-inline">
						  <label>
						    <input type="radio" class="validate[groupRequired[cantidadComputadoras]]" name="cantidadComputadoras" data-peso="1" value="3 o más">
						    3 o más
						  </label>
						</div>
					</div>
					
					<div class="col-sm-4">
						<h4>Telévisor</h4>

						<div class="radio-inline">
						  <label>
						    <input type="radio" class="validate[groupRequired[cantidadTv]]" name="cantidadTv" data-peso="3" value="0 - 1" checked>
						    0 - 1
						  </label>
						</div>
						<div class="radio-inline">
						  <label>
						    <input type="radio" class="validate[groupRequired[cantidadTv]]" name="cantidadTv" data-peso="2" value="2">
						    2
						  </label>
						</div>
						<div class="radio-inline">
						  <label>
						    <input type="radio" class="validate[groupRequired[cantidadTv]]" name="cantidadTv" data-peso="1" value="3 o más">
						    3 o más
						  </label>
						</div>
					</div>
					
					<div class="col-sm-4">
						<h4>Cuartos</h4>

						<div class="radio-inline">
						  <label>
						    <input type="radio" class="validate[groupRequired[cantidadCuartos]]" name="cantidadCuartos" data-peso="3" value="0 - 1" checked>
						    0 - 1
						  </label>
						</div>
						<div class="radio-inline">
						  <label>
						    <input type="radio" class="validate[groupRequired[cantidadCuartos]]" name="cantidadCuartos" data-peso="2" value="2">
						    2
						  </label>
						</div>
						<div class="radio-inline">
						  <label>
						    <input type="radio" class="validate[groupRequired[cantidadCuartos]]" name="cantidadCuartos" data-peso="1" value="3 o más">
						    3 o más
						  </label>
						</div>
					</div>
					
					<div class="col-sm-4">
						<h4>Camas</h4>

						<div class="radio-inline">
						  <label>
						    <input type="radio" class="validate[groupRequired[cantidadCamas]]" name="cantidadCamas" data-peso="3" value="0 - 1" checked>
						    0 - 1
						  </label>
						</div>
						<div class="radio-inline">
						  <label>
						    <input type="radio" class="validate[groupRequired[cantidadCamas]]" name="cantidadCamas" data-peso="2" value="2">
						    2
						  </label>
						</div>
						<div class="radio-inline">
						  <label>
						    <input type="radio" class="validate[groupRequired[cantidadCamas]]" name="cantidadCamas" data-peso="1" value="3 o más">
						    3 o más
						  </label>
						</div>
					</div>
					
					<div class="col-sm-4">
						<h4>Baños</h4>

						<div class="radio-inline">
						  <label>
						    <input type="radio" class="validate[groupRequired[cantidadBanos]]" name="cantidadBanos" data-peso="3" value="0 - 1" checked>
						    0 - 1
						  </label>
						</div>
						<div class="radio-inline">
						  <label>
						    <input type="radio" class="validate[groupRequired[cantidadBanos]]" name="cantidadBanos" data-peso="2" value="2">
						    2
						  </label>
						</div>
						<div class="radio-inline">
						  <label>
						    <input type="radio" class="validate[groupRequired[cantidadBanos]]" name="cantidadBanos" data-peso="1" value="3 o más">
						    3 o más
						  </label>
						</div>
					</div>

					<div class="col-sm-4">
						<h4>Agua potable</h4>

						<div class="radio-inline">
						  <label>
						    <input type="radio" class="validate[groupRequired[aguaRadio]]" name="aguaRadio" data-peso="1.5" value="S&iacute;" checked>
						    S&iacute;
						  </label>
						</div>
						<div class="radio-inline">
						  <label>
						    <input type="radio" class="validate[groupRequired[aguaRadio]]" name="aguaRadio" data-peso="3" value="No">
						    No
						  </label>
						</div>
					</div>
					
					<div class="col-sm-4">
						<h4>Electricidad</h4>

						<div class="radio-inline">
						  <label>
						    <input type="radio" class="validate[groupRequired[electricidad]]" name="electricidadRadio" data-peso="1.5" value="S&iacute;" checked>
						    S&iacute;
						  </label>
						</div>
						<div class="radio-inline">
						  <label>
						    <input type="radio" class="validate[groupRequired[electricidad]]" name="electricidadRadio" data-peso="3" value="No">
						    No
						  </label>
						</div>
					</div>

			
				
                <div  class="form-group col-xs-12">
                    <h3>Ingresos familiares</h3>
                    <hr />
                </div>
				

				<div class="col-xs-12">
					
					<div class="familia">
						<div class="integrante row" id="int0">
							
							<div class="form-group campoNombre col-xs-4">
								<label>Nombre</label>
								<input type="text" class="nombre form-control validate[required,custom[onlyLetterSp]]">
							</div>

							<div class="form-group campoTipo col-xs-4">
								<label>Tipo</label>
								<select class="tipo form-control validate[required]">
									<option value="salario">
										Salario.
									</option>
									<option value="pension">
										Pension.
									</option>
									<option value="no_aporta">
										No aporta.
									</option>
								</select>
							</div>
							
							<div class="form-group campoIngreso col-xs-4">
								<label>Ingreso</label>
								<input type="text" class="ingreso form-control validate[required,custom[integer]]" value="0">
							</div>

							<div class="form-group campoVive col-xs-12">
								<label>Vive bajo el mismo techo que el solicitante: </label>
								<div class="radio-inline">
								  <label>
								    <input type="radio" class="vive validate[groupRequired[viveRadio]]" 
								    name="viveRadio" data-peso="1.5" value="Si" checked>
								    S&iacute;
								  </label>
								</div>
								<div class="radio-inline">
								  <label>
								    <input type="radio" class="vive validate[groupRequired[viveRadio]]" 
								    name="viveRadio" data-peso="3" value="No">
								    No
								  </label>
								</div>
							</div>

							<hr>

						</div>
					</div>

					<button class="btn btn-warning" id="agregarOtroIntegrante" type="button">Agregar otro familiar</button>
				</div>

			</form>

            <div class="col-xs-12">
                <p>&nbsp;</p>
                <button type="button" id="calcularEstudio" class="btn btn-primary">Realizar estudio</button>
            </div>

</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="footer" runat="server">

    <script src="/Codigo/RealizarEstudioSocioeconomico.js"></script>

</asp:Content>
