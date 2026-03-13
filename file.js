// Esperamos un poco a que el loader inyecte el video
  setTimeout(() => {
    const container = document.getElementById('07b02207602203a02204a06d07905605805806304504806607304902207d');
    const video = container.querySelector('video');

    if (video) {
      // Quitamos algunas protecciones (no siempre funciona)
      video.removeAttribute('controlslist');
      video.controls = true;

      // Creamos botón de descarga
      const btn = document.createElement('a');
      btn.textContent = '⬇ Descargar video';
      btn.style.cssText = `
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 28px;
        background: #e63946;
        color: white;
        border-radius: 999px;
        text-decoration: none;
        font-weight: bold;
        z-index: 9999;
        box-shadow: 0 4px 15px rgba(0,0,0,0.6);
      `;

      // Intentamos obtener la fuente real
      if (video.currentSrc && video.currentSrc.startsWith('blob:')) {
        // Blob → difícil de descargar directamente, mostramos advertencia
        btn.href = '#';
        btn.onclick = () => {
          alert('Este video usa blob protegido. Prueba clic derecho → Guardar video como... o usa extensión de video downloader.');
          return false;
        };
      } else if (video.src || video.currentSrc) {
        btn.href = video.currentSrc || video.src;
        btn.download = 'choripaneros-enero-2026.mp4';
      } else {
        btn.href = '#';
        btn.textContent = 'No se pudo detectar el video';
      }

      container.appendChild(btn);
    } else {
      console.log('No se encontró <video> dentro del contenedor');
    }
  }, 2500);   // espera 2.5 segundos — ajusta si tarda más