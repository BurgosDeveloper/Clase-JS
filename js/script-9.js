let mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];

function guardar() {
  localStorage.setItem('mensajes', JSON.stringify(mensajes));
}

function mostrarMensajes() {
  const chat = document.getElementById('chat');
  chat.innerHTML = '';
  mensajes.forEach((msg, idx) => {
    const div = document.createElement('div');
    div.classList.add('mensaje');
    div.classList.add(msg.lado === '2' ? 'mensaje-derecha' : 'mensaje-izquierda');
    div.innerHTML = `<span>${msg.hora} - ${msg.texto}</span> ` +
      `<button class="editar-btn" data-idx="${idx}">✏️</button> ` +
      `<button class="borrar-btn" data-idx="${idx}">🗑️</button>`;
    chat.appendChild(div);
  });
  chat.scrollTop = chat.scrollHeight;
  // Asignar eventos a los botones
  document.querySelectorAll('.borrar-btn').forEach(btn => {
    btn.onclick = function() {
      const i = parseInt(this.dataset.idx);
      mensajes.splice(i, 1);
      guardar();
      mostrarMensajes();
    };
  });
  document.querySelectorAll('.editar-btn').forEach(btn => {
    btn.onclick = function() {
      const i = parseInt(this.dataset.idx);
      const nuevoTexto = prompt('Editar mensaje:', mensajes[i].texto);
      if (nuevoTexto !== null && nuevoTexto.trim() !== '') {
        mensajes[i].texto = nuevoTexto.trim();
        guardar();
        mostrarMensajes();
      }
    };
  });
}

function enviarMensaje(event) {
  event.preventDefault();
  const texto = document.getElementById('mensaje').value.trim();
  if (!texto) return;

  // Obtener el lado seleccionado
  const lado = document.querySelector('input[name="lado-mensaje"]:checked')?.value || '1';
  const hora = new Date().toLocaleTimeString();
  mensajes.push({ texto, hora, lado });
  guardar();
  mostrarMensajes();
  event.target.reset();
}

window.onload = mostrarMensajes;