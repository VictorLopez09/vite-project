import { useState, useEffect } from 'react';
import Select from 'react-select';

function App() {
  const [opcionesEstado, setOpcionesEstado] = useState([]);
  const [opcionesCiudad, setOpcionesCiudad] = useState([]);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState<ValueType<any>>(null);

  useEffect(() => {
    fetchDataEstado();
  }, []);

  useEffect(() => {
    if (estadoSeleccionado !== null) {
      fetchDataCiudad(estadoSeleccionado?.value); // Aquí se pasa el valor directamente
    }
  }, [estadoSeleccionado]);

  const fetchDataEstado = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/State', {
        headers: {
          'Accept': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Error al obtener los datos de estado');
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
  
      // Actualiza el estado con las opciones de estado
      setOpcionesEstado(options);
    } catch (error) {
      console.error('Error al obtener los datos de estado:', error);
    }
  };

  const fetchDataCiudad = async (claveEstado: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/City?clave_estado=${claveEstado}`, {
        headers: {
          'Accept': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Error al obtener los datos de ciudad');
      }
  
      const data = await response.json();
  
      // Mapea los datos a un formato compatible con react-select
      interface Ciudad {
        clave_ciudad: number;
        nombre_ciudad: string;
      }
      
      const options = data.map((item: Ciudad) => ({
        value: item.clave_ciudad,
        label: item.nombre_ciudad,
      }));
  
      // Actualiza el estado con las opciones de ciudad
      setOpcionesCiudad(options);
    } catch (error) {
      console.error('Error al obtener los datos de ciudad:', error);
    }
  };


  //Mike este creo que es la falla o no se cual es la ffala mas bien
  const handleEstadoChange = (selectedOption: ValueType<OptionType>) => {
    setEstadoSeleccionado(selectedOption);
  };

  return (
    <div>
      <div>
        <h2>Selecciona un estado:</h2>
        <Select options={opcionesEstado} onChange={handleEstadoChange} />
      </div>
      <div>
        <h2>Selecciona una ciudad:</h2>
        <Select options={opcionesCiudad} />
      </div>
    </div>
  );
}

export default App;
