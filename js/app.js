// ==============================
// ELEMENTOS
// ==============================
const loader = document.getElementById("loader");
const cover = document.getElementById("cover");
const invitation = document.getElementById("invitation");
const music = document.getElementById("backgroundMusic");
const openButton = document.getElementById("openInvitation");
const musicButton = document.getElementById("musicButton");

// ==============================
// LOADER
// ==============================
window.addEventListener("load", () => {
    setTimeout(() => {
        loader.classList.add("hidden");
    }, 1500);
});

music.load();

// ==============================
// ABRIR INVITACIÓN
// ==============================
openButton.addEventListener("click", abrirInvitacion);

function abrirInvitacion() {
    openButton.disabled = true;
    openButton.style.transform = "scale(.95)";
    openButton.innerHTML = "Abriendo...";

    music.currentTime = 0;
    music.play().then(() => {
        musicButton.innerHTML = "⏸ Pausar";
    }).catch(error => {
        console.log(error);
    });

    setTimeout(() => {
        cover.style.transition = "1s";
        cover.style.opacity = "0";
        cover.style.transform = "scale(.95)";
    }, 500);

    setTimeout(() => {
        cover.style.display = "none";
        invitation.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Iniciar efecto de escritura
        setTimeout(iniciarEfectoEscritura, 500);
    }, 1500);
}

// ==============================
// EFECTO DE ESCRITURA
// ==============================
const textoCompleto = "Con la bendición de Dios y el amor de nuestra familia, hoy celebramos quince años de vida, sueños y felicidad. Este día marca el inicio de una nueva etapa, y nos honra contar con tu presencia para compartirlo.";
const textoEscrito = document.getElementById("texto-escrito");
let indiceTexto = 0;

function iniciarEfectoEscritura() {
    if (indiceTexto < textoCompleto.length) {
        textoEscrito.textContent += textoCompleto.charAt(indiceTexto);
        indiceTexto++;
        setTimeout(iniciarEfectoEscritura, 50);
    } else {
        document.querySelector('.cursor').style.display = 'none';
    }
}

// ==============================
// BOTÓN MÚSICA
// ==============================
musicButton.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        musicButton.innerHTML = "⏸ Pausar";
    } else {
        music.pause();
        musicButton.innerHTML = "▶ Reproducir";
    }
});

// ==============================
// CUENTA REGRESIVA
// ==============================
const fechaEvento = new Date("December 19, 2026 18:00:00").getTime();
const contador = setInterval(() => {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;

    if (distancia <= 0) {
        clearInterval(contador);
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
        return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = dias.toString().padStart(2, '0');
    document.getElementById("hours").innerHTML = horas.toString().padStart(2, '0');
    document.getElementById("minutes").innerHTML = minutos.toString().padStart(2, '0');
    document.getElementById("seconds").innerHTML = segundos.toString().padStart(2, '0');
}, 1000);

// ==============================
// MARIPOSAS FLOTANTES
// ==============================
function crearMariposa() {
    const mariposa = document.createElement('div');
    mariposa.className = 'mariposa';
    mariposa.innerHTML = Math.random() > 0.5 ? '🦋' : '';
    mariposa.style.left = Math.random() * 100 + 'vw';
    mariposa.style.top = Math.random() * 100 + 'vh';
    mariposa.style.animationDuration = (Math.random() * 15 + 15) + 's';
    mariposa.style.animationDelay = Math.random() * 5 + 's';
    document.body.appendChild(mariposa);

    setTimeout(() => {
        mariposa.remove();
    }, 30000);
}

setInterval(crearMariposa, 4000);

// ==============================
// APARICIÓN AL HACER SCROLL
// ==============================
const tarjetas = document.querySelectorAll(".card, .calendario, .marco-dorado, .foto-padres, .foto-allison, .foto-familia");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.2 });

tarjetas.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "all 0.8s ease";
    observer.observe(card);
});