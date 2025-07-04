function procesarFormulario(event) {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const edad = parseInt(document.getElementById('edad').value);
  const departamento = document.getElementById('departamento').value;

  if (!nombre || !email || !edad || !departamento) {
    alert('Todos los campos son obligatorios.');
    return;
  }

  if (edad < 18 || edad > 65) {
    alert('La edad debe estar entre 18 y 65 años.');
    return;
  }

  document.getElementById('res-nombre').textContent = nombre;
  document.getElementById('res-email').textContent = email;
  document.getElementById('res-edad').textContent = edad;
  document.getElementById('res-departamento').textContent = departamento;
  document.getElementById('resumen').classList.remove('oculto');
}