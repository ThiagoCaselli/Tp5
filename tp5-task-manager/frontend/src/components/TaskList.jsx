import './TaskList.css';

const TaskList = ({ tareas, onEliminar, onFinalizar, onEditar }) => {
  if (tareas.length === 0) {
    return (
      <div className="list-container empty">
        <h2>Listado de Tareas</h2>
        <p>No hay tareas registradas aún.</p>
      </div>
    );
  }

  return (
    <div className="list-container">
      <h2>Listado de Tareas</h2>
      <div className="tasks-grid">
        {tareas.map((tarea) => (
          <div key={tarea.id} className={`task-card ${tarea.estado === 'Finalizada' ? 'finalizada' : ''}`}>
            <div className="task-header">
              <h3>{tarea.nombreProyecto}</h3>
              <span className={`badge ${tarea.prioridad.toLowerCase()}`}>{tarea.prioridad}</span>
            </div>
            
            <p className="task-summary"><strong>Resumen:</strong> {tarea.resumen}</p>
            <p className="task-detail"><strong>Estado:</strong> {tarea.estado}</p>
            <p className="task-detail"><strong>Asignado a:</strong> {tarea.personaAsignada || 'Sin asignar'}</p>
            
            <div className="task-actions">
              <button 
                className="btn-editar" 
                onClick={() => onEditar(tarea)}
                disabled={tarea.estado === 'Finalizada'}
              >
                Editar
              </button>
              <button 
                className="btn-finalizar" 
                onClick={() => onFinalizar(tarea.id)}
                disabled={tarea.estado === 'Finalizada'}
              >
                Finalizar
              </button>
              <button className="btn-eliminar" onClick={() => onEliminar(tarea.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;