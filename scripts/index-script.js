/*--- Deixando os links desabilitados do mesmo tamanho que os normais*/
function atualizaBotoes(){
  let btsOff = document.querySelectorAll('.desabilitado');
  let btOnEl = document.querySelector('.botao-link');
  for (let botaoEl of btsOff){
    botaoEl.style.width = window.getComputedStyle(btOnEl).width;
    botaoEl.style.height =  window.getComputedStyle(btOnEl).height;
  }
}

let btsOff = document.querySelectorAll('.desabilitado');
let btOnEl = document.querySelector('.botao-link');

atualizaBotoes();

for (let botaoEl of btsOff){
  botaoEl.addEventListener('click', function(e){
    e.currentTarget.classList.add('locked');
  });
  botaoEl.addEventListener('animationend', function(e){
    e.currentTarget.classList.remove('locked');
  });
}

/*================================Jogador===================================*/
var Jogador = {
  level: 0,
};

if(JSON.parse(localStorage.getItem('Jogador')) !== null){
  Jogador = JSON.parse(localStorage.getItem('Jogador'));
}
else{
  localStorage.setItem('Jogador', JSON.stringify(Jogador));
}

document.querySelector("#playerLv").innerHTML = Jogador.level + 1;

for (let i = 0; i < Jogador.level; i++){
  if(Jogador.level >= 1){

    let btAtivadoEl = document.createElement('a');
    btAtivadoEl.classList.add('botao-link');
    btAtivadoEl.innerHTML = "Ir à matéria!";
    btAtivadoEl.href = btsOff[i].dataset.materia + ".html";

    let articleEl = btsOff[i].parentElement;
    articleEl.removeChild(btsOff[i]);
    articleEl.appendChild(btAtivadoEl);
  }
}

/*--- Barra de progresso*/
let barraProgressoEl = document.querySelector("#barra-progresso > div");
let numeroProgressoEl = document.querySelector("#barra-progresso > div > p");
let numeroMaterias = document.querySelectorAll(".tema").length;

barraProgressoEl.style.width = ((100 * (Jogador.level + 1)) / numeroMaterias) + "%";
numeroProgressoEl.innerHTML = (Jogador.level + 1) + "/" + numeroMaterias;
