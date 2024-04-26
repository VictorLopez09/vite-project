import { useState, useEffect } from 'react';
import Select from 'react-select';

function App() {
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/State', {
        headers: {
          'Accept': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
  
      const data = await response.json();
  
      // Mapea los datos a un formato compatible con react-select
      interface Estado {
        clave_estado: number;
        nombre_estado: string;
      }
      
      const options = data.map((item: Estado) => ({
        value: item.clave_estado,
        label: item.nombre_estado,
      }));
  
      // Actualiza el estado con las opciones (usando useState)
      setOpciones(options);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  return (
    <div>
      <Select options={opciones} />
    </div>
  );
}

export default App;
