//variáveis da bolinha//
var xBolinha = 300;
var yBolinha = 200;
var diametro = 20;
var raio = diametro / 2 ;

//variaveis da raquete//
var xRaquete = 5;
var yRaquete = 150;
var rComprimento = 10;
var rAltura = 90

//variaveis da raquete oponente//
var xRaquetecpu = 585;
var yRaquetecpu = 150;
var velocidadeYcpu;

var colidiu = false;

//velocidade da bolinha//
var velocidadeXBolinha = 8
var velocidadeYBolinha = 8

//Placar//
var meusPontos = 0;
var pontosCpu = 0;

//Sons do jogo//
var raquetada;
var trilha;
var ponto;

function preload(){
  raquetada = loadSound("raquetada.mp3");
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaquetecpu,yRaquetecpu);
  moveRaquete();
  colisaoRaquete(xRaquete,yRaquete);
  colisaoRaquete(xRaquetecpu,yRaquetecpu);
  movimentaRaquetecpu()
  placar();
  marcaPonto();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio> width ||
    xBolinha - raio< 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
    yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect (x,y,rComprimento,rAltura)
}

function moveRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete -= -10;
  }
    yRaquete = constrain(yRaquete, 5, 305);
}

function colisaoRaquete(x,y){
  colidiu = collideRectCircle(x,y,rComprimento,rAltura,xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaquetecpu(){
  velocidadeYcpu = yBolinha - yRaquetecpu - rComprimento / 2 - 90
    yRaquetecpu += velocidadeYcpu
    yRaquetecpu = constrain(yRaquetecpu, 5, 305);
}

function placar(){
  stroke(255);
  textAlign(CENTER)
  textSize(16);
  fill(color(0,128,128));
  rect(150, 10, 40, 20);
  fill(255);
  text (meusPontos, 170,26);
  fill(color(0,128,128));
  rect(450, 10, 40, 20);
  fill(255);
  text (pontosCpu, 470, 26)
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
}
  if (xBolinha < 10){
    pontosCpu += 1;
    ponto.play();
  }
}