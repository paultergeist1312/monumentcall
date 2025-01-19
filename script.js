// Declarar variables globales para el tono de llamada y el efecto de vibración
let ringtone;
let vibrationInterval;

// Intentar reproducir el tono al cargar la página
window.onload = () => {
    ringtone = new Audio('audio/tono.mp3'); // Ruta del audio
    ringtone.loop = true;

    // Intentar reproducir automáticamente
    ringtone.play().catch(error => {
        console.warn('El navegador bloqueó la reproducción automática. Esperando interacción del usuario.');
        // Mostrar un botón de interacción
        const permissionButton = document.createElement('button');
        permissionButton.textContent = 'Habilitar audio';
        permissionButton.style.position = 'absolute';
        permissionButton.style.top = '50%';
        permissionButton.style.left = '50%';
        permissionButton.style.transform = 'translate(-50%, -50%)';
        permissionButton.style.padding = '10px 20px';
        permissionButton.style.fontSize = '16px';
        document.body.appendChild(permissionButton);

        permissionButton.addEventListener('click', () => {
            ringtone.play();
            document.body.removeChild(permissionButton); // Ocultar el botón después de la interacción
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
        ringtone.pause(); // Detener el tono de llamada
        ringtone.currentTime = 0; // Reiniciar el audio al inicio
    }
    if (vibrationInterval) {
        clearInterval(vibrationInterval); // Detener el efecto de vibración
    }
}

// Función para manejar la acción de descolgar
function startCall() {
    stopRingtoneAndVibration(); // Detener tono de llamada y vibración
    alert('Has descolgado la llamada.');
    // Aquí puedes agregar la reproducción de un audio o texto a voz
}

// Función para manejar la acción de colgar
function endCall() {
    stopRingtoneAndVibration(); // Detener tono de llamada y vibración
    alert('Has colgado la llamada.');
    // Aquí puedes reiniciar o realizar alguna acción adicional
}