let reservas = JSON.parse(localStorage.getItem('reservas')) || [];

function guardar() {
  localStorage.setItem('reservas', JSON.stringify(reservas));
}

function agregarReserva(event) {
  event.preventDefault();
  const cliente = document.getElementById('cliente').value.trim();
  const fecha = document.getElementById('fecha').value;

  if (!cliente || !fecha) {
    alert('Completa todos los campos.');
    return;
  }

  // Verificar si la fecha está reservada
  if (reservas.some(r => r.fecha === fecha)) {
    alert('La fecha ya está reservada.');
    return;
  }

  reservas.push({ cliente, fecha });
  guardar();
  mostrarReservas();
  event.target.reset();
}

function mostrarReservas() {
  const ul = document.getElementById('listaReservas');
  ul.innerHTML = '';

  reservas.forEach((r, i) => {
    const li = document.createElement('li');
    li.textContent = `${r.fecha} - ${r.cliente}`;
    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.onclick = () => eliminarReserva(i);
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

function eliminarReserva(index) {
  if (confirm('Eliminar esta reserva?')) {
    reservas.splice(index, 1);
    guardar();
    mostrarReservas();
  }
}

window.onload = mostrarReservas;