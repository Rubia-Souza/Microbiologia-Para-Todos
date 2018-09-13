document.addEventListener('DOMContentLoaded', function(e){

  var usuarioOp = {
    contrasteNeg: false, /*Padrão 0; Negativo 1*/
    fontMainP: 0,
    fontMainA: 0,
    fontFooterP: 0,
    fontFooterA: 0
  };

  function salvarUsuario(){
    localStorage.setItem('opcoesUsuario', JSON.stringify(usuarioOp));
  }

  function carregarUsuario(){
    return JSON.parse(localStorage.getItem('opcoesUsuario'));
  }

  /*--------------------------------------------------------------------------*/
  /*--- Fazendo o menu-nav-acessivel aprecer quando os links estão em foco*/

  let links = document.querySelectorAll('.itens-menu-acessivel');
  let menuNavAceEl = document.querySelector('#menu-nav-acessivel');

  for (link of links){
    link.addEventListener('focus', function(){
      menuNavAceEl.classList.remove('sobe-menu-nav-acessivel');
      menuNavAceEl.classList.add('desce-menu-nav-acessivel');
    });

    link.addEventListener('blur', function(){
      menuNavAceEl.classList.add('sobe-menu-nav-acessivel');
      menuNavAceEl.classList.remove('desce-menu-nav-acessivel');
    });
  }

  /*--------------------------------------------------------------------------*/
  /*--- Alterar o contraste de cores do site*/

  function alteraImg(imgEl, negativo){
    if(negativo === true){
      imgEl.src = imgEl.src.replace(".", "-white.");
    }
    else{
      imgEl.src = imgEl.src.replace("-white.", ".");
    }
  }

  function alterarContraste(negativo){
    if(negativo === true){
      let coresPadroes = document.querySelector("link[href='styles/cores-style.css']");
      let favIcon = document.querySelector("link[href='imgs/icons/favicon.png']");
      let alterarImgs = document.querySelectorAll('.contraste-altera-img');

      coresPadroes.href = "styles/negative-cores-style.css";
      document.querySelector('#menu-esquerda').style.backgroundColor = "rgba(69, 65, 64, 0.8)";
      favIcon.href = "imgs/icons/favicon-white.png";

      for (let img of alterarImgs){
        alteraImg(img, negativo);
      }

      usuarioOp.contrasteNeg = true;
      salvarUsuario();
    }

    else{
      let coresNegativas = document.querySelector("link[href='styles/negative-cores-style.css']");
      let favIcon = document.querySelector("link[href='imgs/icons/favicon-white.png']");
      let alterarImgs = document.querySelectorAll('.contraste-altera-img');

      coresNegativas.href = "styles/cores-style.css";
      document.querySelector('#menu-esquerda').style.backgroundColor = "rgba(255, 255, 255, 0.8)";
      favIcon.href = "imgs/icons/favicon.png";

      for (let img of alterarImgs){
        alteraImg(img, negativo);
      }

      usuarioOp.contrasteNeg = false;
      salvarUsuario();
    }
  }

  let botoesContraste = document.querySelectorAll('.botao-contraste');

  for (botao of botoesContraste){
    botao.addEventListener('click', function(evt){
      let escolhido = evt.currentTarget.dataset.contraste;

      if(escolhido === "negativo" && usuarioOp.contrasteNeg === false){
        alterarContraste(true);
      }
      else if(escolhido === "padrao" && usuarioOp.contrasteNeg === true){
        alterarContraste(false);
      }
    });
  }

  /*--------------------------------------------------------------------------*/
  /*--- Aumentar, diminuir e voltar ao normal as fontes do site*/

  function getFontSize(el){
    return parseFloat(window.getComputedStyle(el, null).getPropertyValue('font-size'));
  }

  function aumentaFonte(){
    /*--- Main*/
    let allMainEl = document.querySelector('main');
    allMainEl.style.fontSize = (getFontSize(allMainEl) + 1) + 'px';
    usuarioOp.fontMainA = getFontSize(allMainEl);
    /*--- Footer*/
    let allFooterEl = document.querySelector('footer');
    allFooterEl.style.fontSize = (getFontSize(allFooterEl) + 1) + 'px';
    usuarioOp.fontFooterA = getFontSize(allFooterEl);
    salvarUsuario();
  }

  function reduzFonte(){
    /*--- Main*/
    let allMainEl = document.querySelector('main');
    allMainEl.style.fontSize = (getFontSize(allMainEl) - 1) + 'px';
    usuarioOp.fontMainA = getFontSize(allMainEl);
    /*--- Footer*/
    let allFooterEl = document.querySelector('footer');
    allFooterEl.style.fontSize = (getFontSize(allFooterEl) - 1) + 'px';
    usuarioOp.fontFooterA = getFontSize(allFooterEl);
    salvarUsuario();
  }

  function padraoFonte(){
    /*--- Main*/
    let allMainEl = document.querySelector('main');
    allMainEl.style.fontSize = usuarioOp.fontMainP + 'px';
    /*--- Footer*/
    let allFooterEl = document.querySelector('footer');
    allFooterEl.style.fontSize = usuarioOp.fontFooterP + 'px';
    usuarioOp.fontMainA = usuarioOp.fontMainP;
    usuarioOp.fontFooterA = usuarioOp.fontMainP;
    salvarUsuario();
  }

  let botoesFonte = document.querySelectorAll('.botao-fonte');

  for(botao of botoesFonte){
    botao.addEventListener('click', function(evt){
      let escolhido = evt.currentTarget.dataset.fonte;

      if(escolhido === "+"){
        aumentaFonte();
      }
      else if(escolhido === "-"){
        reduzFonte();
      }
      else{
        padraoFonte();
      }
    });
  }

  if(carregarUsuario() !== null && carregarUsuario() !== undefined){
    usuarioOp = carregarUsuario();
    if(usuarioOp.contrasteNeg === true){
      alterarContraste(true);
    }
    if(usuarioOp.fontMainA !== usuarioOp.fontMainP && usuarioOp.fontMainA !== 0){
      /*--- Main*/
      let allMainEl = document.querySelector('main');
      allMainEl.style.fontSize = usuarioOp.fontMainA + 'px';
      /*--- Footer*/
      let allFooterEl = document.querySelector('footer');
      allFooterEl.style.fontSize = usuarioOp.fontFooterA + 'px';
    }
    else{
      padraoFonte();
    }
  }
  else{
    usuarioOp.fontMainP = getFontSize(document.querySelector('main'));
    usuarioOp.fontFooterP = getFontSize(document.querySelector('footer'));
    salvarUsuario();
  }
});
