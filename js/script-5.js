let citas = JSON.parse(localStorage.getItem('citas')) || [];

function guardar() {
  localStorage.setItem('citas', JSON.stringify(citas));
}

function registrarCita() {
  const cliente = document.getElementById('cliente').value.trim();
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;
  const motivo = document.getElementById('motivo').value.trim();

  if (!cliente || !fecha || !hora || !motivo) {
    alert('Todos los campos son obligatorios');
    return;
  }

  citas.push({ cliente, fecha, hora, motivo });
  guardar();
  mostrarCitas();
  limpiarFormulario();
}

function mostrarCitas() {
  const lista = document.getElementById('lista-citas');
  lista.innerHTML = '';
  citas.forEach((cita, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${cita.cliente}</strong><br/>
      <small>${cita.fecha} ${cita.hora}</small><br/>
      <em>${cita.motivo}</em><br/>
      <button onclick="eliminarCita(${index})">Eliminar</button>
    `;
    lista.appendChild(li);
  });
}

function eliminarCita(index) {
  if (confirm('¿Eliminar esta cita?')) {
    citas.splice(index, 1);
    guardar();
    mostrarCitas();
  }
}

function limpiarFormulario() {
  document.getElementById('cliente').value = '';
  document.getElementById('fecha').value = '';
  document.getElementById('hora').value = '';
  document.getElementById('motivo').value = '';
}

window.onload = mostrarCitas;