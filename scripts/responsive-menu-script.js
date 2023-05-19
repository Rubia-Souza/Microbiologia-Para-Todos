document.addEventListener('DOMContentLoaded', function(e){

  function noneDivModal(){
    divModalEl.style.display = 'none';
  }

  function inlineDivModal(){
    divModalEl.style.display = 'inline';
    divModalEl.style.opacity = '0.7';
  }

  function focaNoMenu(x){
    /* Menu está abrindo*/
    if(x === true){
      for (elFilho of document.body.children){
        if(elFilho !== document.querySelector('#menu-esquerda-group')){
          elFilho.inert = true;
        }
      }
    }
    /* Menu está fechando*/
    else{
      for (elFilho of document.body.children){
        if(elFilho !== document.querySelector('#menu-esquerda-group')){
          elFilho.inert = false;
        }
      }
    }
  }

  let menuBotaoEl = document.querySelector('#botao-hamburguer');
  let menuEl = document.querySelector('#menu-esquerda');
  let divModalEl = document.querySelector('#div-modal');
  const ESCKEY = 27;

  menuEl.inert = true; /*Não deixa focar no menu quando fechado*/

  /*--- Funções para abrir e fechar o menu*/
  function abreMenu(){

    inlineDivModal();
    divModalEl.removeEventListener('animationend', noneDivModal);

    /* Limito o foco ao menu*/
    focaNoMenu(true);
    menuEl.inert = false;

    /* Troco as classes do menu e da div modal*/
    menuEl.classList.remove('some-menu');
    menuEl.classList.add('aparece-menu');

    divModalEl.classList.remove('some-div-modal');
    divModalEl.classList.add('aparece-div-modal');
    divModalEl.addEventListener('animationend', inlineDivModal);

    /* Eventos que fecham o menu*/
    divModalEl.addEventListener('click', fechaMenu);
    menuEl.addEventListener('keyup', escFechaMenu);
    let fechaMenuBotaoEl = document.querySelector('#botao-fecha-menu');
    fechaMenuBotaoEl.addEventListener('click', fechaMenu);

    /* Coloco o foco no primeiro elemento do menu (no meu caso é um link)*/
    fechaMenuBotaoEl.focus();
  }

  function fechaMenu(){

    divModalEl.removeEventListener('animationend', inlineDivModal);

    /* Volto o foco a todos os outros elementos e tiro do menu*/
    focaNoMenu(false);
    menuEl.inert = true;

    /* Troco as classes do menu e da div modal*/
    menuEl.classList.remove('aparece-menu');
    menuEl.classList.add('some-menu');

    divModalEl.classList.remove('aparece-div-modal');
    divModalEl.classList.add('some-div-modal');
    divModalEl.addEventListener('animationend', noneDivModal);

    /* Removo os eventos que fecham o menu*/
    divModalEl.removeEventListener('click', fechaMenu);
    menuEl.removeEventListener('keyup', escFechaMenu);

    /* Coloco o foco ultimo elemento focado antes do menu*/
    menuBotaoEl.focus();
  }

  function escFechaMenu(evt){
    if(evt.keyCode === ESCKEY){
      fechaMenu();
    }
  }

  divModalEl.style.display = 'none';

  /*---- Colocando evento no botão para abrir o menu*/
  menuBotaoEl.addEventListener('click', abreMenu);

  /*---- Não deixar o menu esquerda quebrar*/
  window.addEventListener('resize', function(){
    let windowWidth = window.innerWidth;
    if(windowWidth >= 1090){
      fechaMenu();
    }
  });
});
