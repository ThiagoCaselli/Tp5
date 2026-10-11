import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const API_URL = 'http://localhost:3000/api/tareas';

function App() {
  const [tareas, setTareas] = useState([]);
  const [tareaAEditar, setTareaAEditar] = useState(null);

  useEffect(() => {
    obtenerTareas();
  }, []);

  const obtenerTareas = async () => {
    console.log("1. Buscando tareas en la Base de Datos...");
    try {
      const respuesta = await axios.get(API_URL);
      console.log("2. Tareas encontradas:", respuesta.data);
      setTareas(respuesta.data);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  };

  const agregarTarea = async (nuevaTarea) => {
    console.log("3. Enviando nueva tarea al backend...", nuevaTarea);
    try {
      const respuesta = await axios.post(API_URL, nuevaTarea);
      console.log("4. El backend la guardó y respondió:", respuesta.data);
      alert("¡Tarea guardada exitosamente en PostgreSQL!"); 
      
      setTareas([respuesta.data, ...tareas]);
    } catch (error) {
      console.error("ERROR: No se pudo guardar la tarea:", error);
      alert("Hubo un error al guardar, revisá la consola.");
    }
  };

  const eliminarTarea = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTareas(tareas.filter(tarea => tarea.id !== id));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  const finalizarTarea = async (id) => {
    try {
      const tareaAFinalizar = tareas.find(t => t.id === id);
      const tareaActualizada = { ...tareaAFinalizar, estado: 'Finalizada' };
      
      const respuesta = await axios.put(`${API_URL}/${id}`, tareaActualizada);
      
      setTareas(tareas.map(tarea => 
        tarea.id === id ? respuesta.data : tarea
      ));
    } catch (error) {
      console.error("Error al finalizar la tarea:", error);
    }
  };

  const actualizarTarea = async (id, datosActualizados) => {
    try {
      const respuesta = await axios.put(`${API_URL}/${id}`, datosActualizados);
      setTareas(tareas.map(tarea => tarea.id === id ? respuesta.data : tarea));
      setTareaAEditar(null);
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="main-title">Manejador de Tareas</h1>
      <div className="content-layout">
        <TaskForm 
          onAgregar={agregarTarea} 
          tareaAEditar={tareaAEditar} 
          onActualizar={actualizarTarea}
          onCancelarEdicion={() => setTareaAEditar(null)}
        />
        <TaskList 
          tareas={tareas} 
          onEliminar={eliminarTarea} 
          onFinalizar={finalizarTarea} 
          onEditar={setTareaAEditar}
        />
      </div>
    </div>
  );
}

export default App;