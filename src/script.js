let audio = document.querySelector("#audio");
let nomeDaMusica = document.querySelector("#music-name");
let nomeDoArtista = document.querySelector("#artist-name");
let botaoPlayPause = document.querySelector("#playbutton");
let botaoNext = document.querySelector("#nextbutton");
let botaoBack = document.querySelector("#prevbutton");
let duracaoMusica = document.querySelector(".duracao");
let tempoMusica = document.querySelector(".tempo-atual");
let barraDeProgresso = document.querySelector(".progresso-bar");
let progressoElemento = document.querySelector(".progresso");

import songs from "./songs.js";

let index = 0;

botaoNext.onclick = () => prevNextMusic('next');
botaoBack.onclick = () => prevNextMusic('prev');
botaoPlayPause.onclick = () => playPause();

const playPause = () => {
    if (audio.paused) {
        audio.play();
        botaoPlayPause.innerHTML = '<i class="fa fa-pause"></i>';
    } else {
        audio.pause();
        botaoPlayPause.innerHTML = '<i class="fa fa-play"></i>';
    }
}

audio.ontimeupdate = () => updatetime();

const updatetime = () => {
    const minutoAtual = Math.floor(audio.currentTime / 60);
    const segundoAtual = Math.floor(audio.currentTime % 60);

    tempoMusica.innerHTML = minutoAtual + ":" + formatZero(segundoAtual);

    const duracaoFormatada = isNaN(audio.duration) ? 0 : audio.duration;

    const duracaoMinuto = Math.floor(duracaoFormatada / 60);
    const duracaoSegundo = Math.floor(duracaoFormatada % 60);

    duracaoMusica.textContent = duracaoMinuto + ":" + formatZero(duracaoSegundo);

    const progresso = duracaoFormatada ? (audio.currentTime / duracaoFormatada) * 100 : 0;
     progressoElemento.style.width = `${progresso}%`;
}

const formatZero = (n) => {
    return n < 10 ? `0${n}` : n;
}


barraDeProgresso.onclick = (e) => {
    const novoTime = (e.offsetX / barraDeProgresso.offsetWidth) * audio.duration;
    audio.currentTime = novoTime;
}

const prevNextMusic = (type = 'next') => {
    if ((type == 'next' && index + 1 === songs.length) || type === "init") {
        index = 0;
    } else if (type == 'prev' && index === 0) {
        index = songs.length - 1;
    } else {
        index = type === 'prev' ? index - 1 : index + 1;
    }

    audio.src = songs[index].src;
    nomeDaMusica.innerHTML = songs[index].name;
    nomeDoArtista.innerHTML = songs[index].artista;
    audio.load();

    if (type !== 'init') playPause();
}

audio.addEventListener('ended', () => {
    prevNextMusic('next'); 
});

prevNextMusic('init');
