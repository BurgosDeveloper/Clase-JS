let proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];

function guardar() {
  localStorage.setItem('proyectos', JSON.stringify(proyectos));
}

function agregarProyecto(event) {
  event.preventDefault();
  const nombre = document.getElementById('nombreProyecto').value.trim();
  const fechaEntrega = document.getElementById('fechaEntrega').value;
  const prioridad = document.getElementById('prioridad').value;

  if (!nombre || !fechaEntrega || !prioridad) {
    alert('Todos los campos son obligatorios.');
    return;
  }

  proyectos.push({
    nombre,
    fechaEntrega,
    prioridad,
    estado: 'Pendiente',
  });

  guardar();
  mostrarProyectos();
  event.target.reset();
}

function mostrarProyectos() {
  const tbody = document.getElementById('listaProyectos');
  tbody.innerHTML = '';

  proyectos.forEach((proyecto, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${proyecto.nombre}</td>
      <td>${proyecto.fechaEntrega}</td>
      <td>${proyecto.prioridad}</td>
      <td>
        <select onchange="cambiarEstado(${index}, this.value)">
          <option value="Pendiente" ${proyecto.estado === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
          <option value="En Proceso" ${proyecto.estado === 'En Proceso' ? 'selected' : ''}>En Proceso</option>
          <option value="Completado" ${proyecto.estado === 'Completado' ? 'selected' : ''}>Completado</option>
        </select>
      </td>
      <td><button onclick="eliminarProyecto(${index})">Eliminar</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function cambiarEstado(index, nuevoEstado) {
  proyectos[index].estado = nuevoEstado;
  guardar();
  mostrarProyectos();
}

function eliminarProyecto(index) {
  if (confirm('¿Eliminar este proyecto?')) {
    proyectos.splice(index, 1);
    guardar();
    mostrarProyectos();
  }
}

window.onload = mostrarProyectos;