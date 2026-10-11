import { useState, useEffect } from 'react';
import './TaskForm.css';

const TaskForm = ({ onAgregar, tareaAEditar, onActualizar, onCancelarEdicion }) => {
  const estadoInicial = {
    nombreProyecto: '', tipoActividad: '', estado: 'Pendiente', resumen: '',
    descripcion: '', prioridad: 'Baja', informador: '', personaAsignada: '',
    precondicion: '', fechaCreacion: '', fechaCierre: '', sprint: ''
  };

  const [tarea, setTarea] = useState(estadoInicial);

  // Hook useEffect: Se ejecuta cuando tareaAEditar cambia. 
  // Si hay una tarea seleccionada, rellena el formulario.
  useEffect(() => {
    if (tareaAEditar) {
      setTarea(tareaAEditar);
    } else {
      setTarea(estadoInicial);
    }
  }, [tareaAEditar]);

  const handleChange = (e) => {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tareaAEditar) {
      onActualizar(tareaAEditar.id, tarea);
    } else {
      onAgregar(tarea);
    }
    setTarea(estadoInicial);
  };

  return (
    <div className="form-container">
      <h2>{tareaAEditar ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        
        <div className="form-group">
          <label>Nombre del Proyecto</label>
          <input type="text" name="nombreProyecto" value={tarea.nombreProyecto} onChange={handleChange} required placeholder="Ej: Sistema de Gestión" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Tipo de Actividad</label>
            <input type="text" name="tipoActividad" value={tarea.tipoActividad} onChange={handleChange} required placeholder="Ej: Desarrollo" />
          </div>
          
          <div className="form-group">
            <label>Estado</label>
            <select name="estado" value={tarea.estado} onChange={handleChange}>
              <option value="Pendiente">Pendiente</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Finalizada">Finalizada</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Resumen</label>
          <input type="text" name="resumen" value={tarea.resumen} onChange={handleChange} required placeholder="Breve descripción del problema" />
        </div>

        <div className="form-group">
          <label>Descripción Detallada</label>
          <textarea name="descripcion" value={tarea.descripcion} onChange={handleChange} rows="4" placeholder="Pasos para reproducir, detalles técnicos, etc."></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Prioridad</label>
            <select name="prioridad" value={tarea.prioridad} onChange={handleChange}>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
              <option value="Urgente">Urgente</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Sprint</label>
            <input type="text" name="sprint" value={tarea.sprint} onChange={handleChange} placeholder="Ej: Sprint 4" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Informador</label>
            <input type="text" name="informador" value={tarea.informador} onChange={handleChange} required placeholder="Quién reporta" />
          </div>
          
          <div className="form-group">
            <label>Persona Asignada</label>
            <input type="text" name="personaAsignada" value={tarea.personaAsignada} onChange={handleChange} placeholder="Quién resuelve" />
          </div>
        </div>

        <div className="form-group">
          <label>Precondición</label>
          <input type="text" name="precondicion" value={tarea.precondicion} onChange={handleChange} placeholder="Qué debe pasar antes de iniciar" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Fecha de Creación</label>
            <input type="date" name="fechaCreacion" value={tarea.fechaCreacion} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Fecha de Cierre (Estimada)</label>
            <input type="date" name="fechaCierre" value={tarea.fechaCierre} onChange={handleChange} />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {tareaAEditar ? 'Actualizar Tarea' : 'Guardar Tarea'}
          </button>
          {tareaAEditar && (
            <button type="button" className="cancel-btn" onClick={onCancelarEdicion}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;