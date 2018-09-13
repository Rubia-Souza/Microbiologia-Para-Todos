var usuarioOp = {
  contrasteNeg: false, /*Padrão 0; Negativo 1*/
  fontMainP: 0,
  fontMainA: 0
};

function salvarUsuario(usuarioOp){
  localStorage.setItem('opcoesQuizUsuario', JSON.stringify(usuarioOp));
}

function carregarUsuario(){
  return JSON.parse(localStorage.getItem('opcoesQuizUsuario'));
}

function getFontSize(el){
  return parseFloat(window.getComputedStyle(el, null).getPropertyValue('font-size'));
}

function contrasteNeg(x){
  let linkCSSEl;
  let linkFavIconEl
  let btnExpandeContraEl = document.querySelector("#menu-acessibilidade > button > img");
  if(x){
    linkCSSEl = document.querySelector("link[href='styles/questionario-cores-style.css");
    linkFavIconEl = document.querySelector("link[href='imgs/icons/favicon.png']");

    linkCSSEl.href = "styles/questionario-negative-cores-style.css";
    linkFavIconEl.href = "imgs/icons/favicon-white.png";
    btnExpandeContraEl.src = btnExpandeContraEl.src.replace(".png", "-white.png");

    usuarioOp.contrasteNeg = true;
  }
  else{
    linkCSSEl = document.querySelector("link[href='styles/questionario-negative-cores-style.css");
    linkFavIconEl = document.querySelector("link[href='imgs/icons/favicon-white.png']");

    linkCSSEl.href = "styles/questionario-cores-style.css";
    linkFavIconEl.href = "imgs/icons/favicon.png";
    btnExpandeContraEl.src = btnExpandeContraEl.src.replace("-white.png", ".png");

    usuarioOp.contrasteNeg = false;
  }
  salvarUsuario(usuarioOp);
}

/*----------------------------------------------------------------------------*/
/*--- Alterar fonte*/
let mainEl = document.querySelector("#conteudo-principal");
let btnsFonte = document.querySelectorAll("#menu-acessibilidade > ul:last-of-type > li > button");

if(carregarUsuario() === undefined || carregarUsuario() === null){
  usuarioOp.fontMainP = getFontSize(mainEl);
  salvarUsuario(usuarioOp);
}
else{
  usuarioOp = carregarUsuario();
  if(usuarioOp.fontMainA !== usuarioOp.fontMainP && usuarioOp.fontMainA !== 0){
    mainEl.style.fontSize = usuarioOp.fontMainA + "px";
  }
  else{
    mainEl.style.fontSize = usuarioOp.fontMainP + "px";
  }
  if(usuarioOp.contrasteNeg === true){
    contrasteNeg(true);
  }
}

for(let btnFonteEl of btnsFonte){
  btnFonteEl.addEventListener('click', function(evt){
    let mainEl = document.querySelector('#conteudo-principal');
    let escolhido = evt.currentTarget.dataset.fonte;
    let mainFontSize = getFontSize(mainEl);

    if(escolhido === "+"){
      mainEl.style.fontSize = (mainFontSize + 1) + "px";
    }
    else if(escolhido === "0"){
      mainEl.style.fontSize = usuarioOp.fontMainP + "px";
    }
    else{
      mainEl.style.fontSize = (mainFontSize - 1) + "px";
    }

    usuarioOp.fontMainA = getFontSize(mainEl);
    salvarUsuario(usuarioOp);
  });
}
/*----------------------------------------------------------------------------*/
/*--- Alterar contraste*/
let btnsContraste = document.querySelectorAll("#menu-acessibilidade > ul:first-of-type > li > button");

for(let btnContrasteEl of btnsContraste){
  btnContrasteEl.addEventListener('click', function(evt){
    let escolhido = evt.currentTarget.dataset.contraste;
    if(escolhido === "padrao" && usuarioOp.contrasteNeg === true){
      contrasteNeg(false);
    }
    else if(escolhido === "negativo" && usuarioOp.contrasteNeg === false){
      contrasteNeg(true);
    }
  });
}
