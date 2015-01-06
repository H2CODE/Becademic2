﻿Imports System.Runtime.InteropServices
Imports System.Drawing.Text
Imports BLL

Public Class uCPromedioGeneralesCursos

    Private gestorValidaciones As New GestorValidaciones

    Public Sub onControlLoad() Handles MyBase.Load

        Dim contenedor As Panel = pnlCampos
        gestorValidaciones.activarValidaciones(contenedor)
        rpvPromediosGeneralesCursos.RefreshReport()
        Me.Dock = DockStyle.Fill

    End Sub

    Private Sub btnGenerar_Click(sender As Object, e As EventArgs) Handles btnGenerar.Click

        Dim contenedor As Panel = pnlCampos

        If (gestorValidaciones.camposEstanValidos(contenedor)) And cmbPeriodoInicio.Text <= cmbPeriodoFinal.Text And txtAnioInicio.Text <= txtAnioFinal.Text Then

            lblMsgPeriodo.Text = ""
            lblMsgAnio.Text = ""
            actualizarReportViewer()

        Else

            If cmbPeriodoInicio.Text > cmbPeriodoFinal.Text Then

                lblMsgPeriodo.Text = "*Periodo inicial no puede ser mayor"

            Else

                lblMsgPeriodo.Text = ""

            End If

            If txtAnioInicio.Text > txtAnioFinal.Text Then

                lblMsgAnio.Text = "*El año inico no puede ser mayor"

            Else

                lblMsgAnio.Text = ""

            End If

        End If

    End Sub

    Private Sub actualizarReportViewer()

        Dim periodoInicial As Integer = cmbPeriodoInicio.Text
        Dim anioInicial As Integer = txtAnioInicio.Text
        Dim periodoFinal As Integer = cmbPeriodoFinal.Text
        Dim anioFinal As Integer = txtAnioFinal.Text

        Me.pa_reporte_promedios_generales_de_cursosTableAdapter.Fill(Me.beca_becademicDataSet.pa_reporte_promedios_generales_de_cursos, periodoInicial, anioInicial, periodoFinal, anioFinal)

        Me.rpvPromediosGeneralesCursos.RefreshReport()

    End Sub

End Class
