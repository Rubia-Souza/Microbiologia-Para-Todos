window.onload = function(){

  function numeroAleatorio(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  let imgs = ['coruja-branca.jpg', 'abelha.jpg', 'passaro.jpeg',
              'crocodilo.jpg', 'folha-verde.jpg', 'segurando-folha.jpeg',
              'folhas.jpg', 'pequena-arvore.jpg', 'passaro2.jpeg'];
  let headerEl = document.querySelector('header');

  headerEl.style.backgroundImage = 'url(imgs/backgrounds/' + imgs[numeroAleatorio(0, imgs.length)] + ')';
}
