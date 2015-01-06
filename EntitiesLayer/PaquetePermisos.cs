using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace EntitiesLayer
{
    [Serializable]
    [DataContract]
    public class PaquetePermisos
    {
        [DataMember]
        public int IdRol { get; set; }

        [DataMember]
        public IEnumerable<int> NumerosDePermisos{ get; set; }

    }
}
