/*==========================================================
    ESCOLA BÍBLICA ATALAIA
    script.js
==========================================================*/

"use strict";

/*==========================================================
    ELEMENTOS
==========================================================*/

const cursos = document.querySelectorAll(".curso");

const botoes = document.querySelectorAll(".curso-btn");

/*==========================================================
    FECHAR TODOS OS CURSOS
==========================================================*/

function fecharTodos() {

    cursos.forEach((curso) => {

        const licoes = curso.querySelector(".licoes");

        licoes.style.display = "none";

    });

}

/*==========================================================
    ABRIR PRIMEIRO CURSO
==========================================================*/

fecharTodos();

if (cursos.length > 0) {

    cursos[0].querySelector(".licoes").style.display = "block";

}

/*==========================================================
    ACCORDION
==========================================================*/

botoes.forEach((botao) => {

    botao.addEventListener("click", () => {

        const curso = botao.parentElement;

        const licoes = curso.querySelector(".licoes");

        const aberto = licoes.style.display === "block";

        fecharTodos();

        if (!aberto) {

            licoes.style.display = "block";

        }

    });

});

/*==========================================================
    SCROLL SUAVE AO ABRIR
==========================================================*/

botoes.forEach((botao) => {

    botao.addEventListener("click", () => {

        setTimeout(() => {

            botao.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }, 150);

    });

});

/*==========================================================
    RODAPÉ
==========================================================*/

const ano = new Date().getFullYear();

const rodape = document.querySelector("footer p:last-child");

if (rodape) {

    rodape.innerHTML = `© ${ano} Ministério Atalaia`;

}

/*==========================================================
    SALVAR ÚLTIMO CURSO ABERTO
==========================================================*/

botoes.forEach((botao, indice) => {

    botao.addEventListener("click", () => {

        localStorage.setItem("cursoAberto", indice);

    });

});

const cursoSalvo = localStorage.getItem("cursoAberto");

if (cursoSalvo !== null) {

    fecharTodos();

    cursos[cursoSalvo].querySelector(".licoes").style.display = "block";

}

/*==========================================================
    CAMPO DE PESQUISA
==========================================================*/

const pesquisa = document.querySelector("#pesquisa");

if (pesquisa) {

    pesquisa.addEventListener("keyup", () => {

        const texto = pesquisa.value.toLowerCase();

        document.querySelectorAll(".licao").forEach((licao) => {

            const conteudo = licao.innerText.toLowerCase();

            if (conteudo.includes(texto)) {

                licao.style.display = "block";

            } else {

                licao.style.display = "none";

            }

        });

    });

}

/*==========================================================
    BOTÃO VOLTAR AO TOPO
==========================================================*/

const voltarTopo = document.querySelector("#voltarTopo");

if (voltarTopo) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            voltarTopo.style.display = "block";

        } else {

            voltarTopo.style.display = "none";

        }

    });

    voltarTopo.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/*==========================================================
    MARCAR LIÇÃO COMO CONCLUÍDA
==========================================================*/

const licoes = document.querySelectorAll(".licao");

licoes.forEach((licao, indice) => {

    let botao = document.createElement("button");

    botao.innerHTML = "✔ Concluir Aula";

    botao.className = "btn-concluir";

    licao.appendChild(botao);

    if (localStorage.getItem("licao_" + indice)) {

        botao.innerHTML = "✅ Aula Concluída";

        botao.disabled = true;

    }

    botao.addEventListener("click", () => {

        localStorage.setItem("licao_" + indice, "ok");

        botao.innerHTML = "✅ Aula Concluída";

        botao.disabled = true;

        atualizarProgresso();

    });

});

/*==========================================================
    PROGRESSO GERAL
==========================================================*/

function atualizarProgresso() {

    const total = licoes.length;

    let concluidas = 0;

    licoes.forEach((licao, indice) => {

        if (localStorage.getItem("licao_" + indice)) {

            concluidas++;

        }

    });

    const porcentagem = Math.round((concluidas / total) * 100);

    const barra = document.querySelector("#barraProgresso");

    const texto = document.querySelector("#textoProgresso");

    if (barra) {

        barra.style.width = porcentagem + "%";

    }

    if (texto) {

        texto.innerHTML = porcentagem + "% concluído";

    }

}

atualizarProgresso();

/*==========================================================
    CONTINUAR ÁUDIO
==========================================================*/

const audios = document.querySelectorAll("audio");

audios.forEach((audio, indice) => {

    const tempo = localStorage.getItem("audio_" + indice);

    if (tempo) {

        audio.currentTime = tempo;

    }

    audio.addEventListener("timeupdate", () => {

        localStorage.setItem(

            "audio_" + indice,

            audio.currentTime

        );

    });

});

/*==========================================================
    FINAL
==========================================================*/

console.log("Escola Bíblica Atalaia carregada com sucesso.");

