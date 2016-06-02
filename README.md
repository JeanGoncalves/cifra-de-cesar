# Cifra de César

A cifra de César também conhecida como `cifra de troca`, `código de César` ou `troca de César` é uma das mais simples técnicas de `criptografia`. É um tipo de *cifra de substituição* na qual cada letra do texto é substituida por outra, que se apresenta no *alfabeto* abaixo dela um número fixo de vezes.
 - _Fonte: [Wikipédia](https://pt.wikipedia.org/wiki/Cifra_de_C%C3%A9sar)_

# Cifra de César Personalizada

Eu estarei utilizando desta técnica de criptografia para aprimorar meu conhecimento sobre TDD ([Jasmine](http://jasmine.github.io/)) e Automatizador de tarefas ([GULP](http://gulpjs.com/)), e para ficar mais divertida a _brincadeira_, estarei fazendo uma personalização na função de criptografia e descriptografia, podendo ser gerado uma criptografia com a alteração da substituição. 

Para a Cifra de César, é fixo em três a quantidade de casas no alfabeto a ser trocado. 
Ex.: A letra **C** será substituida pella letra **F**.

Nessa função personalizada, **será fornecido** a quantidade de casas a serem puladas e este número será gravado no **fim da criptografia gerada**. Então na função de descriptografia, terá de **pegar esse número** para realizar a **descriptografia correta**.

# Utilização


```html
<script type="text/javascript" src="lib/dist/cifraCesarPersonalized.min.js"></script>
```

```js
var crpCsar = new CrpCsar();
```

Criptografia da mensagem:

```js
var msg = 'CASA AZUL';
var crp = crpCsar.cript(msg, 4); // GEWE EDYP4
```

Descriptografia da mensagem:

```js
var msg = 'GEWE EDYP4';
var dcrp = crpCsar.decript(msg); // CASA AZUL
```
