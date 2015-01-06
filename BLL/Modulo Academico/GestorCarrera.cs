using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntitiesLayer;
using DAL;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using TIL.CustomExceptions;

namespace BLL
{
    public class GestorCarrera
    {
        /**
         * Agregar Carrera
         * Metodo que permite construir un objeto tipo carrera mediante el repositorio encargado.
         **/
        public void agregarCarrera(string nombre, string descripcion, string icono, string color)
        {
            try
            {
                Carrera carrera = new Carrera(-1, nombre, descripcion, icono, color);
                if (carrera.IsValid)
                {
                    CarreraRepository.Instance.Insert(carrera);
                    CarreraRepository.Instance.Save();
                }
                else
                {
                    StringBuilder sb = new StringBuilder();
                    foreach (RuleViolation rv in carrera.GetRuleViolations())
                    {
                        sb.AppendLine(rv.ErrorMessage);
                    }
                    throw new ApplicationException(sb.ToString());
                }
            }
            catch (DataAccessException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Error: {0}", ex.Message));
            }
        }

        /**
        * Editar carrera
        * Metodo que permite modificar un objeto tipo carrera mediante el repositorio encargado.
        **/
        public void editarCarrera(int idCarrera, string nombre, string descripcion, string icono, string color)
        {

            try
            {

                Carrera carrera = CarreraRepository.Instance.GetById(idCarrera);
                carrera.Id = idCarrera;
                carrera.Nombre = nombre;
                carrera.Descripcion = descripcion;
                carrera.Icono = icono;
                carrera.Color = color;
                CarreraRepository.Instance.Update(carrera);
                CarreraRepository.Instance.Save();

            }
            catch (DataAccessException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Error: {0}", ex.Message));
            }
        }

        /**
        * eliminar carrera
        * Metodo que permite eliminar un objeto tipo carrera mediante el repositorio encargado.
        **/
        public void eliminarCarrera(int idCarrera)
        {
            try
            {

                Carrera carrera = CarreraRepository.Instance.GetById(idCarrera);
                CarreraRepository.Instance.Delete(carrera);
                CarreraRepository.Instance.Save();
            }
            catch (DataAccessException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Error: {0}", ex.Message));
            }
        }

        /**
        * consultar carreras
        * Metodo que permite listar todos los objetos de tipo carrera mediante el repositorio encargado.
        **/
        public IEnumerable<Carrera> consultarCarreras()
        {
            IEnumerable<Carrera> lstCarreras = null;

            try
            {
                lstCarreras = CarreraRepository.Instance.GetAll();
            }

            catch (DataAccessException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Error: {0}", ex.Message));
            }
            return lstCarreras;
        }

        public Carrera consultarCarrera(int idCarrera)
        {
            Carrera carrera = null;
            try
            {

                carrera = CarreraRepository.Instance.GetById(idCarrera);
            }
            catch (DataAccessException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Error: {0}", ex.Message));
            }

            return carrera;
        }



        public void agregarCursoACarrera(int idCurso, int idCarrera, int periodo)
        {
            try
            {
                Curso curso = CursosRepository.Instance.GetById(idCurso);
                Carrera carrera = CarreraRepository.Instance.GetById(idCarrera);

                if (curso.IsValid)
                {

                    foreach (Curso pcurso in carrera.LstCursos)
                    {

                        if (pcurso.Id == curso.Id)
                        {
                            throw new ApplicationException("Este curso ya está asignado");
                        }
                    }

                }
                else
                {
                    StringBuilder sb = new StringBuilder();
                    foreach (RuleViolation rv in carrera.GetRuleViolations())
                    {
                        sb.AppendLine(rv.ErrorMessage);
                    }
                    throw new ApplicationException(sb.ToString());

                }
                CarreraRepository.Instance.AsignarCursoCarrera(curso, carrera, periodo);

            }


            catch (DataAccessException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format(ex.Message));
            }



        }

        public void eliminarCursoDeCarrera(int idCurso, int idCarrera)
        {
            try
            {

                Carrera carrera = CarreraRepository.Instance.GetById(idCarrera);
                Curso curso = CursosRepository.Instance.GetById(idCurso);
                CarreraRepository.Instance.DeleteCarreraCurso(carrera, curso);
                CarreraRepository.Instance.Save();
            }
            catch (DataAccessException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Error: {0}", ex.Message));
            }
        }

        public IEnumerable<Curso> consultarCursosPorCarrera(int idCarrera)
        {

            IEnumerable<Curso> lstCurso = null;

            try
            {
                lstCurso = CarreraRepository.Instance.listarCursosPorCarrera(idCarrera);
            }

            catch (DataAccessException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Error: {0}", ex.Message));
            }
            return lstCurso;
        }

        public void agregarDirectorACarrera(int idUsuario, int idCarrera)
        {

            try
            {
                Usuario usuario = UsuarioRepository.Instance.GetById(idUsuario);
                Carrera carrera = CarreraRepository.Instance.GetById(idCarrera);

                if (usuario.IsValid)
                {

                    foreach (Usuario pusuario in carrera.LstDirectoresAcademicos)
                    {

                        if (pusuario.Id == usuario.Id)
                        {
                            throw new ApplicationException("Este director académico ya está asignado");
                        }
                    }

                }
                else
                {
                    StringBuilder sb = new StringBuilder();
                    foreach (RuleViolation rv in carrera.GetRuleViolations())
                    {
                        sb.AppendLine(rv.ErrorMessage);
                    }
                    throw new ApplicationException(sb.ToString());

                }
                CarreraRepository.Instance.AsignarDirectorCarrera(usuario, carrera);

            }


            catch (DataAccessException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format(ex.Message));
            }
        }


        public IEnumerable<Usuario> consultarDirectoresPorCarrera(int idUsuario)
        {

            IEnumerable<Usuario> lstUsuario = null;

            try
            {
                lstUsuario = CarreraRepository.Instance.listarDirectoresPorCarrera(idUsuario);
            }

            catch (DataAccessException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Error: {0}", ex.Message));
            }
            return lstUsuario;
        }


        public IEnumerable<Usuario> consultarDirectoresAcademicos()
        {
            IEnumerable<Usuario> lstUsuarios = null;

            try
            {
                lstUsuarios = CarreraRepository.Instance.listarDirectoresAcademicos();
            }

            catch (DataAccessException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Error: {0}", ex.Message));
            }
            return lstUsuarios;
        }

        public void eliminarDirectorDeCarrera(int idCarrera, int idUsuario)
        {
            try
            {

                Carrera carrera = CarreraRepository.Instance.GetById(idCarrera);
                Usuario usuario = UsuarioRepository.Instance.GetById(idUsuario);
                CarreraRepository.Instance.DeleteCarreraDirector(carrera, usuario);
                CarreraRepository.Instance.Save();
            }
            catch (DataAccessException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Error: {0}", ex.Message));
            }
        }


        public void agregarEstudianteACarrera(int idUsuario, int idCarrera)
        {

            try
            {
                Usuario usuario = UsuarioRepository.Instance.GetById(idUsuario);
                Carrera carrera = CarreraRepository.Instance.GetById(idCarrera);

                if (usuario.IsValid)
                {

                    foreach (Usuario pusuario in carrera.LstEstudiantes)
                    {

                        if (pusuario.Id == usuario.Id)
                        {
                            throw new ApplicationException("Este estudiante ya está asignado");
                        }
                    }

                }
                else
                {
                    StringBuilder sb = new StringBuilder();
                    foreach (RuleViolation rv in carrera.GetRuleViolations())
                    {
                        sb.AppendLine(rv.ErrorMessage);
                    }
                    throw new ApplicationException(sb.ToString());

                }
                CarreraRepository.Instance.asignarEstudianteCarrera(usuario, carrera);

            }


            catch (DataAccessException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format(ex.Message));
            }
        }




        public void eliminarEstudianteDeCarrera(int idCarrera, int idUsuario)
        {
            try
            {

                Carrera carrera = CarreraRepository.Instance.GetById(idCarrera);
                Usuario usuario = UsuarioRepository.Instance.GetById(idUsuario);
                CarreraRepository.Instance.DeleteEstudianteDeCarrera(carrera, usuario);
                CarreraRepository.Instance.Save();
            }
            catch (DataAccessException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Error: {0}", ex.Message));
            }
        }


        public IEnumerable<Usuario> consultarEstudiantes()
        {
            IEnumerable<Usuario> lstUsuarios = null;

            try
            {
                lstUsuarios = CarreraRepository.Instance.listarEstudiantes();
            }

            catch (DataAccessException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Error: {0}", ex.Message));
            }
            return lstUsuarios;
        }


        public IEnumerable<Usuario> consultarEstudiantesPorCarrera(int idUsuario)
        {

            IEnumerable<Usuario> lstUsuario = null;

            try
            {
                lstUsuario = CarreraRepository.Instance.listarEstudiantesPorCarrera(idUsuario);
            }

            catch (DataAccessException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Error: {0}", ex.Message));
            }
            return lstUsuario;
        }

        /// <summary>
        /// Lista las carreras asignadas a un usuario
        /// </summary>
        /// <param name="idUsuario">Identificador de usuario</param>
        /// <returns>Lista de todas las carreras asignadas</returns>
        public IEnumerable<Carrera> listarCarrerasPorUsuario(int idUsuario)
        {
            IEnumerable<Carrera> lstCarreras = null;

            try
            {
                lstCarreras = CarreraRepository.Instance.listarCarrerasPorUsuario(idUsuario);
            }

            catch (DataAccessException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Error: {0}", ex.Message));
            }
            return lstCarreras;
        }

        /// <summary>
        /// Asigna una carrera a un usuario
        /// </summary>
        /// <param name="idUsuario">Identificador del usuario</param>
        /// <param name="idCarrera">Identificador de la carrera</param>
        /// <returns>True en caso de exito</returns>
        public bool asignaCarreraAUsuario(int idUsuario, int idCarrera)
        {
            try
            {
                CarreraRepository.Instance.asignarCarreraAUsuario(idUsuario, idCarrera);
            }
            catch (DataAccessException ex)
            {
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

        /// <summary>
        /// Remueve una carrera de un usuario
        /// </summary>
        /// <param name="idUsuario">Identificador del usuario</param>
        /// <param name="idCarrera">Identificador de la carrera</param>
        /// <returns>True en caso de exito</returns>
        public bool removerCarreraDeUsuario(int idUsuario, int idCarrera)
        {
            try
            {
                CarreraRepository.Instance.removerCarreraDeUsuario(idUsuario, idCarrera);
            }
            catch (DataAccessException ex)
            {
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

        /// <summary>
        /// Lista de forma ordenada todos los cursos con sus respectivos periodos de la carrera a buscar por Id.
        /// </summary>
        /// <param name="idCarrera">Identificador de la carrera.</param>
        /// <returns>Lista organizada de todos los cursos y periodos asociados con dicha carrera.</returns>
        public IEnumerable<CursoDeCarrera> listarCursosAsignadosACarrera(int idCarrera)
        {
            IEnumerable<CursoDeCarrera> _lista = new List<CursoDeCarrera>();
            try
            {
                _lista = CarreraRepository.Instance.listarCursosAsignadosACarrera(idCarrera);
            }
            catch(Exception ex)
            {
                return _lista;
            }

            return _lista;
        }

        /// <summary>
        /// Remueve los cursos de una carrera en concreto
        /// </summary>
        /// <param name="idCarrera">Identificador de carrera</param>
        /// <returns>True en caso de exito</returns>
        public bool removerCursosDeCarrera(int idCarrera)
        {
            try
            {
                CarreraRepository.Instance.removerCursosDeCarrera(idCarrera);
            }
            catch
            {
                return false;
            }
            return true;
        }

        public IEnumerable<Carrera> consultarCarrerasPorUsuario(int idUsuario)
        {

            IEnumerable<Carrera> listaCarreras = null;

            try
            {
                listaCarreras = CarreraRepository.Instance.listarCarrerasPorUsuarioB(idUsuario);
            }

            catch (DataAccessException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Error: {0}", ex.Message));
            }
            return listaCarreras;
        }

    }
    
}
