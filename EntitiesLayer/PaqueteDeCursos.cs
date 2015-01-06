using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace EntitiesLayer
{
    [Serializable]
    [DataContract]
    public class PaqueteDeCursos
    {

        [DataMember]
        public int IdCarrera { get; set; }

        [DataMember]
        public IEnumerable<CursoDeCarrera> Cursos { get; set; }

    }
}
