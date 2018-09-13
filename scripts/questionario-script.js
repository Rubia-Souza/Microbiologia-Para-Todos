/*--- Funções auxiliares*/
function inertElement(El, x){
  for(let childEl of El.children){ childEl.inert = x; }
}

function btnProxHabilitado(x){
  let btnConfirmarEl = document.querySelector('#confirmar-btn');
  let btnConfirmarImgEl = document.querySelector('#confirmar-btn > img');
  if(x){
    btnConfirmarEl.disabled = false;
    btnConfirmarImgEl.src = btnConfirmarImgEl.src.replace('-disabled.png', '.png');
  }
  else{
    btnConfirmarEl.disabled = true;
    if(btnConfirmarImgEl.src.indexOf('-disabled.') === -1){
      btnConfirmarImgEl.src = btnConfirmarImgEl.src.replace('.png', '-disabled.png');
    }
  }
}

function btnPularHabilitado(x){
  let btnPularEl = document.querySelector('#pular-btn');
  let btnPularImgEl = document.querySelector('#pular-btn > img');
  if(x){
    btnPulaEl.disabled = false;
    btnPularImgEl.src = btnPularImgEl.src.replace('-disabled.png', '.png');
  }
  else{
    btnPulaEl.disabled = true;
    if(btnPularImgEl.src.indexOf('-disabled.') === -1){
      btnPularImgEl.src = btnPularImgEl.src.replace('.png', '-disabled.png');
    }
  }
}

function fecharMenuAcessivel(){
  let scrollImgEl = menuAcessiBtnEl.querySelector('img');
  for(let i = 0; i < menuAcessibilidadeEl.childNodes.length - 2; i++){
    let element = menuAcessibilidadeEl.childNodes[i];
    element.inert = true;
  }
  inertElement(document.querySelector('#conteudo-principal'), false);

  let usuarioOp = JSON.parse(localStorage.getItem('opcoesQuizUsuario'));
  if(usuarioOp.contrasteNeg === false){
    scrollImgEl.src = "imgs/icons/expandir.png";
  }
  else{
    scrollImgEl.src = "imgs/icons/expandir-white.png";
  }
  scrollImgEl.alt = "Expandir o menu com recursos de acessibilidade";
  scrollImgEl.title = "Expandir o menu com recursos de acessibilidade";

  menuAcessibilidadeEl.style.top = "calc(" + (menuAcessiBtnH - menuAcessibilidadeH + "px") + " + 0.5rem)";
  divModalEl.style.display = "none";
}

function abrirMenuAcessivel(){
  let scrollImgEl = menuAcessiBtnEl.querySelector('img');
  inertElement(menuAcessibilidadeEl, false);
  inertElement(document.querySelector('#conteudo-principal'), true);
  menuAcessibilidadeEl.querySelector("button:first-of-type").focus();

  let usuarioOp = JSON.parse(localStorage.getItem('opcoesQuizUsuario'));
  if(usuarioOp.contrasteNeg === false){
    scrollImgEl.src = "imgs/icons/ocultar.png";
  }
  else{
    scrollImgEl.src = "imgs/icons/ocultar-white.png";
  }
  scrollImgEl.alt = "Contrair o menu com recursos de acessibilidade";
  scrollImgEl.title = "Contrair o menu com recursos de acessibilidade";

  menuAcessibilidadeEl.style.top = "-0.7rem";
  divModalEl.style.display = "inline";
}

/*--- Funções do quiz: */

function criaQuestionario(quest){
  for (let i = 1; i < quest.length; i++){
    let mainEl = document.querySelector('main');
    let enunciadoEl = document.createElement('p');
    let mainFSectionEl = document.createElement('section');
    let rpsSectionEl = document.createElement('section');
    let letra = "A";

    enunciadoEl.innerHTML = quest[i][0];
    for (let j = 1; j <= 4; j++) {
      let labelEl = document.createElement('label');
      let inputEl = document.createElement('input');
      inputEl.type = "radio";
      inputEl.name = ("resp" + (i + 1));
      inputEl.classList.add("resposta");
      inputEl.value = letra;
      labelEl.appendChild(inputEl);
      labelEl.innerHTML = labelEl.innerHTML + letra + ") " + quest[i][j];
      rpsSectionEl.appendChild(labelEl);
      letra = letra.substring(0, letra-1) + String.fromCharCode(letra.charCodeAt(letra-1)+1);
    }

    mainFSectionEl.classList.add("questao");
    mainFSectionEl.appendChild(enunciadoEl);
    mainFSectionEl.appendChild(rpsSectionEl);
    if(i !== 1){
      mainFSectionEl.classList.add("questao-escondida");
      mainFSectionEl.setAttribute("aria-hidden", "true");
      inertElement(mainFSectionEl, true);
    }
    mainEl.insertBefore(mainFSectionEl, mainEl.childNodes[mainEl.childNodes.length - 1]);

    // ao marcar alguma checkbox habilita o btnConfirmar
    let checkboxs = document.querySelectorAll("main > section > section input");
    for(let checkBoxEl of checkboxs){
      checkBoxEl.addEventListener('change', function(){
        btnProxHabilitado(true);
      });
    }
    btnProxHabilitado(false);
  }

  document.querySelector("#conteudo-principal > section:last-of-type > p > span:last-of-type").innerHTML = (quest.length-1);
}

function selecionaQuiz(){
  switch(Jogador.level){
    case 0:
      criaQuestionario(questionario1);
      r = questionario1[0];
      return questionario1.length;
      break;

    case 1:
      criaQuestionario(questionario2);
      r = questionario2[0];
      return questionario2.length;
      break;

    case 2:
      criaQuestionario(questionario3);
      r = questionario3[0];
      return questionario3.length;
      break;

    case 3:
      criaQuestionario(questionario4);
      r = questionario4[0];
      return questionario4.length;
      break;

    case 4:
      criaQuestionario(questionario5);
      r = questionario5[0];
      return questionario5.length;
      break;

    case 5:
      criaQuestionario(questionario6);
      r = questionario6[0];
      return questionario6.length;
      break;
  }
}

function movimentaQuestoes(){
  let iq = 0;
  let questaoRespEl;
  let questoes = document.querySelectorAll('.questao');

  for (iq = 0; iq < questoes.length; iq++){
    if(!questoes[iq].classList.contains('questao-escondida') && !questoes[iq].classList.contains('questao-respondida')){
      questaoRespEl = questoes[iq];
      break;
    }
  }
  let nextQuestEl = questoes[iq + 1];

  nextQuestEl.addEventListener('transitionend', function(){
    questaoRespEl.style.position = "fixed";
    btnPularHabilitado(true);
  });
  nextQuestEl.classList.remove('questao-escondida');
  nextQuestEl.setAttribute('aria-hidden', 'false');
  inertElement(nextQuestEl, false);
  questaoRespEl.classList.add('questao-respondida');
  questaoRespEl.setAttribute('aria-hidden', 'true');
  inertElement(questaoRespEl, true);
  document.querySelector('h1').focus();
}

function incrementaQuestaoCount(){
  let questCoutEl = document.querySelector('main > section:last-of-type > p > span');
  let h1Count = document.querySelector('main > h1');
  questCount++;
  questCoutEl.innerHTML = questCount;
  h1Count.innerHTML = "Questão " + questCount;
}

function finalizaQuiz(){
  let acertos = 0;
  let mainEl = document.querySelector("#conteudo-principal");

  for(let i = 0; i < respostas.length; i++){
    if(respostas[i] === r[i]){
      acertos++;
    }
  }

  if(acertos > Math.floor((tamanhoQuiz-1) * 0.5)){
    if(Jogador.level < 5){
      Jogador.level++;
      localStorage.setItem('Jogador', JSON.stringify(Jogador));
    }

    mainEl.classList.add("main-final");
    mainEl.innerHTML = " ";

    let h1El = document.createElement('h1');
    let divProgressoEl = document.createElement('div');
    let divFundoProgressoEl = document.createElement('div');
    let pContDivEl = document.createElement('p');
    let pLevelUpEl = document.createElement('p');
    let pUnlockEl = document.createElement('p');
    let pGabaritoEl = document.createElement('p');
    let ulEl = document.createElement('ul');
    let linkVoltarIndexEl = document.createElement('a');

    for(let i = 0; i < r.length; i++){
      let liEl = document.createElement('li');
      if(respostas[i] === "F"){
        liEl.innerHTML = "Questão " + (i+1) + ":<br>Resposta " + r[i] + ", nenhuma alternativa marcada";
      }
      else{
        liEl.innerHTML = "Questão " + (i+1) + ":<br>Resposta " + r[i] + ", alternativa marcada " + respostas[i];
      }
      if(r[i] === respostas[i]){
        liEl.classList.add("acerto");
      }
      else{
        liEl.classList.add("erro");
      }
      ulEl.appendChild(liEl);
    }

    h1El.innerHTML = "Quiz completo";
    h1El.setAttribute("tabindex", "-1");

    divFundoProgressoEl.id = "barra-progresso";
    divFundoProgressoEl.setAttribute("aria-hidden", "true");
    pContDivEl.innerHTML = (Jogador.level+1) + "/6";
    divProgressoEl.appendChild(pContDivEl);
    divFundoProgressoEl.appendChild(divProgressoEl);

    pLevelUpEl.innerHTML = "Você chegou ao nível " + (Jogador.level+1);
    pUnlockEl.innerHTML = "Próxima matéria foi desbloqueada.";
    pGabaritoEl.innerHTML = "Gabarito do quiz:";

    linkVoltarIndexEl.innerHTML = "Voltar à página inicial";
    linkVoltarIndexEl.href = "index.html";
    linkVoltarIndexEl.classList.add("botao-link");

    mainEl.appendChild(h1El);
    mainEl.appendChild(divFundoProgressoEl);
    mainEl.appendChild(pLevelUpEl);
    mainEl.appendChild(pUnlockEl);
    mainEl.appendChild(pGabaritoEl);
    mainEl.appendChild(ulEl);
    mainEl.appendChild(linkVoltarIndexEl);
    setTimeout(function(){divProgressoEl.style.width = ((100 * (Jogador.level + 1)) / 6) + "%";}, 500);
    document.querySelector('h1').focus();
  }
  else{
    let h1El = document.createElement('h1');
    let pFalhouEl = document.createElement('p');
    let linkVoltarIndexEl = document.createElement('a');
    let btnReIniciarEl = document.createElement('button');
    let oldH1El = document.querySelector("main > h1");
    let oldSectionEl = document.querySelector("#conteudo-principal > section:last-of-type");

    h1El.innerHTML = "Tente novamente";
    h1El.setAttribute("tabindex", "-1");

    pFalhouEl.innerHTML = "Você deve acertar 3 questões para ir para o próximo nível";

    linkVoltarIndexEl.innerHTML = "Voltar à página inicial";
    linkVoltarIndexEl.href = "index.html";
    linkVoltarIndexEl.classList.add("botao-link");

    btnReIniciarEl.innerHTML = "Tentar novamente";
    btnReIniciarEl.type = "button";
    btnReIniciarEl.classList.add("botao-link");

    mainEl.classList.add("main-final-falhou");
    mainEl.innerHTML = " ";
    mainEl.appendChild(h1El);
    mainEl.appendChild(pFalhouEl);
    mainEl.appendChild(linkVoltarIndexEl);
    mainEl.appendChild(btnReIniciarEl);

    btnReIniciarEl.addEventListener('click', function(){
      oldH1El.innerHTML = "Questão 1";
      oldSectionEl.querySelector("p > span").innerHTML = "1";
      questCount = 1;
      respostas = "";
      mainEl.innerHTML = " ";
      mainEl.appendChild(oldH1El);
      mainEl.appendChild(oldSectionEl);
      selecionaQuiz();
      document.querySelector('h1').focus();
    });
  }
  document.querySelector('h1').focus();
}

/*----------------------------------------------------------------------------*/
// Carrega o respectivo formulário de acordo com o level do jogador
var Jogador = {
  level: 0,
};
const ESCKEY = 27;
var r;
var tamanhoQuiz;

if(JSON.parse(localStorage.getItem('Jogador')) !== null){
  Jogador = JSON.parse(localStorage.getItem('Jogador'));
}
else{
  localStorage.setItem('Jogador', JSON.stringify(Jogador));
}

tamanhoQuiz = selecionaQuiz();

var questCount = 1;
var respostas = "";

let btnProxEl = document.querySelector('#confirmar-btn');
btnProxEl.addEventListener('click', function(){
  let checkeBoxsQAtual = document.querySelectorAll("main > section:nth-child(" + (questCount + 1) + ") input");
  let resposta = 0;
  for(let checkBoxEl of checkeBoxsQAtual){
    if(checkBoxEl.checked){
      resposta = checkBoxEl;
      break;
    }
  }
  respostas = respostas + resposta.value;
  if(questCount <= (tamanhoQuiz-2) && resposta !== 0){
    btnProxHabilitado(false);
    btnPularHabilitado(false);
    incrementaQuestaoCount();
    movimentaQuestoes();
  }
  else if(questCount >= (tamanhoQuiz-1)){
    finalizaQuiz();
  }
});

let btnPulaEl = document.querySelector('#pular-btn');
btnPulaEl.addEventListener('click', function(){
  respostas = respostas + "F";
  if(questCount <= (tamanhoQuiz-2)){
    btnPularHabilitado(false);
    if(document.querySelector("main > section:nth-child(" + (questCount + 1) + ") input:checked") !== undefined){
      btnProxHabilitado(false);
    }
    incrementaQuestaoCount();
    movimentaQuestoes();
  }
  else if(questCount >= (tamanhoQuiz-1)){
    finalizaQuiz();
  }
});

/*--- Menu Acessibilidade: */

let menuAcessibilidadeEl = document.querySelector("#menu-acessibilidade");
let menuAcessiBtnEl = document.querySelector("#menu-acessibilidade > button");
let divModalEl = document.querySelector("#div-modal");
let menuAcessibilidadeH = parseFloat(window.getComputedStyle(menuAcessibilidadeEl, null).getPropertyValue('height'));
let menuAcessiBtnH = parseFloat(window.getComputedStyle(menuAcessiBtnEl, null).getPropertyValue('height'));

menuAcessibilidadeEl.style.top = "calc(" + (menuAcessiBtnH - menuAcessibilidadeH + "px") + " + 0.5rem)";
for(let i = 0; i < menuAcessibilidadeEl.childNodes.length - 2; i++){
  let element = menuAcessibilidadeEl.childNodes[i];
  element.inert = true;
}

menuAcessibilidadeEl.addEventListener("transitionend", function(){
  let scrollImgEl = menuAcessiBtnEl.querySelector('img');
  if(scrollImgEl.src.indexOf("expandir.png") !== -1 || scrollImgEl.src.indexOf("expandir-white.png") !== -1){
    menuAcessiBtnEl.setAttribute("aria-label", "Expandir o menu com recursos de acessibilidade");
  }
  else{
    menuAcessiBtnEl.setAttribute("aria-label", "Contrair o menu com recursos de acessibilidade");
  }
});

menuAcessiBtnEl.addEventListener('click', function(){
  let scrollImgEl = menuAcessiBtnEl.querySelector('img');
  if(scrollImgEl.src.indexOf("expandir-white.png") !== -1 || scrollImgEl.src.indexOf("expandir.png") !== -1){
    abrirMenuAcessivel();
  }
  else{
    fecharMenuAcessivel();
  }
});

divModalEl.addEventListener('click', function(){
  fecharMenuAcessivel();
});

menuAcessibilidadeEl.addEventListener('keyup', function(evt){
  if(evt.keyCode === ESCKEY){
    fecharMenuAcessivel();
  }
});
