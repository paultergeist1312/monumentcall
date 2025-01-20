// Declarar variables globales para el tono de llamada, efecto de vibración y el idioma seleccionado
let ringtone;
let vibrationInterval;
let selectedLanguage = 'es'; // Idioma predeterminado: español
let callAudio; // Variable para el audio de la llamada en curso

// Función para configurar el idioma seleccionado
function selectLanguage(language) {
    selectedLanguage = language; // Guardar el idioma seleccionado
    ringtone.play(); // Reproducir el tono de llamada
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
    ringtone = new Audio('audio/tono.mp3'); // Ruta del tono de llamada
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
            btn.addEventListener('click', () => selectLanguage(button.id));
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
    stopRingtoneAndVibration(); // Detener tono de llamada y vibración

    // Ocultar el botón de descolgar y centrar el de colgar
    const pickUpButton = document.querySelector('.pick-up');
    const hangUpButton = document.querySelector('.hang-up');
    pickUpButton.style.display = 'none'; // Ocultar botón de descolgar
    hangUpButton.style.position = 'absolute';
    hangUpButton.style.bottom = '20px';
    hangUpButton.style.left = '50%';
    hangUpButton.style.transform = 'translateX(-50%)';

    // Reproducir audio correspondiente al idioma seleccionado
    const callAudioPath = selectedLanguage === 'es' ? 'audio/call_es.mp3' : 'audio/call_val.mp3';
    callAudio = new Audio(callAudioPath);
    callAudio.play();
}

// Función para manejar la acción de colgar
function endCall() {
    stopRingtoneAndVibration(); // Detener tono de llamada y vibración

    // Detener el audio de la llamada
    if (callAudio) {
        callAudio.pause();
        callAudio.currentTime = 0;
        callAudio = null; // Limpiar la referencia
    }

    // Restaurar botones
    const pickUpButton = document.querySelector('.pick-up');
    const hangUpButton = document.querySelector('.hang-up');
    pickUpButton.style.display = 'block'; // Mostrar botón de descolgar
    hangUpButton.style.position = ''; // Restaurar posición del botón de colgar
    hangUpButton.style.bottom = '';
    hangUpButton.style.left = '';
    hangUpButton.style.transform = '';
}

