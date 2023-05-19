let level = document.querySelector('body').dataset.level;

var Jogador = {
  level: 0,
};

if(JSON.parse(localStorage.getItem('Jogador')) !== null){
  Jogador = JSON.parse(localStorage.getItem('Jogador'));
}
else{
  localStorage.setItem('Jogador', JSON.stringify(Jogador));
}

if(Jogador.level < level){
  let lockedH2El = document.createElement('h2');
  let lockedDivEl = document.createElement('div');
  let lockedTextEl = document.createElement('p');
  let lockedLinkEl = document.createElement('a');
  let mainEl = document.querySelector('main');

  mainEl.innerHTML = "";
  mainEl.classList.add("main-bloqueado");

  lockedH2El.innerHTML = "Matéria bloqueada";

  lockedTextEl.innerHTML = "Você ainda não desbloqueou essa matéria. Complete os questionários para poder acessá-la.";

  lockedLinkEl.innerHTML = "Ir ao questionário";
  lockedLinkEl.classList.add("botao-link");
  lockedLinkEl.href = "questionario.html";

  mainEl.appendChild(lockedH2El);
  mainEl.appendChild(lockedDivEl);
  lockedDivEl.appendChild(lockedTextEl);
  lockedDivEl.appendChild(lockedLinkEl);
}
