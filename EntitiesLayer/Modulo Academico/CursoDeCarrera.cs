using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesLayer
{
    [Serializable]
    [DataContract]
    public class CursoDeCarrera : IEntity
    {

        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public int IdCarrera { get; set; }

        [DataMember]
        public int Periodo { get; set; }

        [DataMember]
        public Curso Detalles { 
            get {
                return CursosRepository.Instance.GetById(this.Id);
            }
            set {
                this.Detalles = value;
            }
        }

    }
}
