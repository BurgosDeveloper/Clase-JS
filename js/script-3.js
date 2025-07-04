const asistencias = [];

function registrarAsistencia() {
  const nombre = document.getElementById('empleado').value.trim();
  if (!nombre) {
    alert('Debe ingresar el nombre del empleado.');
    return;
  }

  const hora = new Date().toLocaleTimeString();
  asistencias.push({ nombre, hora });
  mostrarAsistencias();
  document.getElementById('empleado').value = '';
}

function mostrarAsistencias() {
  const lista = document.getElementById('lista-asistencias');
  lista.innerHTML = '';

  asistencias.forEach(asistencia => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${asistencia.nombre}</strong> - ${asistencia.hora}`;
    lista.appendChild(li);
  });
}