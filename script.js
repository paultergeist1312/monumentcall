// Declarar variables globales para el tono de llamada, efecto de vibración y el idioma
let ringtone;
let vibrationInterval;

// Función para configurar el audio según el idioma seleccionado
function enableAudio(language) {
    const audioPath = language === 'es' ? 'audio/tono_es.mp3' : 'audio/tono_val.mp3'; // Ruta según idioma
    ringtone.src = audioPath;
    ringtone.play();
    removeLanguageButtons(); // Quitar los botones después de la selección
}

// Función para eliminar los botones de selección de idioma
function removeLanguageButtons() {
    const overlay = document.querySelector('.language-overlay');
    if (overlay) {
        document.body.removeChild(overlay);
    }
}

// Intentar reproducir el tono al cargar la página
window.onload = () => {
    ringtone = new Audio(); // Inicializar el objeto de audio sin cargar ningún archivo
    ringtone.loop = true;

    // Intentar reproducir automáticamente
    ringtone.play().catch(error => {
        console.warn('El navegador bloqueó la reproducción automática. Mostrando selección de idioma.');

        // Crear un fondo oscuro para los botones
        const overlay = document.createElement('div');
        overlay.className = 'language-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '1000';
        document.body.appendChild(overlay);

        // Crear botones
        const buttons = [
            { id: 'es', src: 'images/es_flag.png', alt: 'Español' },
            { id: 'val', src: 'images/val_flag.png', alt: 'Valenciano' }
        ];

        buttons.forEach(button => {
            const btn = document.createElement('button');
            btn.className = 'language-btn';
            btn.style.width = '100px';
            btn.style.height = '100px';
            btn.style.borderRadius = '50%';
            btn.style.border = 'none';
            btn.style.margin = '10px';
            btn.style.backgroundSize = 'cover';
            btn.style.backgroundImage = `url(${button.src})`;
            btn.alt = button.alt;
            btn.addEventListener('click', () => enableAudio(button.id));
            overlay.appendChild(btn);
        });
    });

    // Añadir efecto de vibración al botón de descolgar
    const pickUpButton = document.querySelector('.pick-up');
    vibrationInterval = setInterval(() => {
        pickUpButton.classList.add('vibrate');
        setTimeout(() => {
            pickUpButton.classList.remove('vibrate');
        }, 500);
    }, 1000);
};

// Detener tono de llamada y vibración
function stopRingtoneAndVibration() {
    if (ringtone) {
        ringtone.pause();
        ringtone.currentTime = 0;
    }
    if (vibrationInterval) {
        clearInterval(vibrationInterval);
    }
}

// Función para manejar la acción de descolgar
function startCall() {
    stopRingtoneAndVibration();
    alert('Has descolgado la llamada.');
}

// Función para manejar la acción de colgar
function endCall() {
    stopRingtoneAndVibration();
    alert('Has colgado la llamada.');
}
