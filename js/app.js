//Toada a minha animação
const ulSquares = document.querySelector("ul.square-animation");

for (let i = 0; i < 21; i++){
    const li = document.createElement('li');
    const random = (min, max) => Math.random() * (max - min) + min;

    const size = Math.floor(random(10, 120));
    const position = random(1, 99);
    const delay = random(5, 0.1);
    const duration = random(24, 12);
    let number = Math.floor(random(1, 100));
    const text = document.createTextNode(number);
    li.appendChild(text);
    li.style.width = `${size}px`;
    li.style.height = `${size}px`;
    //li.style.bottom = `${size}px`;

    li.style.left = `${position}%`;

    li.style.animationDelay = `${delay}s`;
    li.style.animationDuration = `${duration}s`;
    li.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`;
    
    ulSquares.appendChild(li);
}


//Funcionalidades da Calculadora
let input = document.querySelector('.input-digito');
let reset = document.querySelector('.btn-reset');
let result = document.querySelector('.btn-igual');
let show_result = document.querySelector('.result');
let display_result = document.querySelector('.display-result .result');
let btn_mais_menos = document.querySelector('.btn-mais-menos');
let btn_percentagem = document.querySelector('.btn-resto');
let flag = -1; 
let numero_anterior;
let expressao_anterior = '';
let index_paragem;
let flag_operador = false;
function input_number(value){
let input_value = input.value;
numero_anterior = input_value[input_value.length - 1];
if(input_value != '')
{
    if(validarNumero(numero_anterior) || (validarPonto(numero_anterior) && !validarPonto(value.textContent.toString()))){
        if(validarOperador(value.textContent.toString())){
            expressao_anterior = '';
        }
        if(validarPonto(value.textContent.toString())){
            if(!verificarPontos(expressao_anterior)){
                input.value += value.textContent;
                expressao_anterior += value.textContent;         
            } 
        }else{
            input.value += value.textContent;
            expressao_anterior += value.textContent;
            flag_operador = false;
        }
        if(validarOperador(value.textContent.toString())){
            index_paragem = undefined;
            flag = -1;
        } 
    }
    else if(validarOperador(numero_anterior) && !validarOperador(value.textContent.toString())){
        input.value += value.textContent;
    }
    console.log('Text: '+input_value); 
}else{
    if (!validarPonto(value.textContent.toString() ) && !validarOperador(value.textContent.toString()) )
    {
        input.value += value.textContent;
        expressao_anterior += value.textContent;
    }
}

console.log('NÚMERO ACTUAL: '+expressao_anterior);  
}
reset.addEventListener('click', function(){
var value = input.value;
console.log(value);
input.value = '';
show_result.innerHTML = '';
flag = -1;
expressao_anterior = ''; 
index_paragem = undefined;
flag_operador = false; 
});

result.addEventListener('click', function(){ 
let arr = input.value;
let str = input.value;
arr = arr.split('');
let resultado = eval(input.value);
if(!validarOperador(arr[arr.length - 1]) && !validarPonto(arr[arr.length - 1]) && resultado !== undefined){
    let numero_digito = resultado;
    //Math.log(resultado) * Math.LOG10E + 1 | 0;
    numero_digito = (numero_digito + '').replace('.','').length;
    let inteiro = parseInt(numero_digito);
    console.log(inteiro);
    if(inteiro <= 9) display_result.style.fontSize = '4em';
    else if(inteiro == 10) display_result.style.fontSize = '3.5em';
    else if(inteiro <= 12) display_result.style.fontSize = '3.2em';
    else if(inteiro <= 18) display_result.style.fontSize = '2.2em';
    else if(inteiro >= 20) display_result.style.fontSize = '1.8em';
    show_result.innerHTML = resultado;    
}

});


function verificarPontos(str){
if(typeof(str) === 'string'){
    let str_aux = str.split('');
    for (const element of str_aux){
        if (element === '.' ) return true;
    }
}
return false;
}

function validarOperador(value){
let arrOperadores = ['+','-','/','*'];
for (const element of arrOperadores){
    if (element === value) return true;
}
return false; 
}

function validarPonto(value){
if(value == '.') return true;
else return false;
}

console.log('Resultado: '+ validarNumero('3'));

function validarNumero(value){
let arrNumeros = [0,1,2,3,4,5,6,7, 8, 9];
for (const element of arrNumeros){
    if (element === parseInt(value)) return true;
}
return false;
}

function remover_sinal(value){
//let flag = 0;
for(let i = index_paragem; i < value.length - 1; i++){
    value[i] = value[i+1];
}
if(!flag_operador) value.pop();
}

function inserir_sinal(value){
let str_aux = '';
let index_pretendido = -1;

for(let i = value.length - 1; i >= 0; i--)
{
    if(validarOperador(value[i])){
        index_pretendido = i;
        if(value[i] == '-')flag_operador = true;
        break; 
    }
}
if (index_pretendido != -1 && value[index_pretendido] !== '-'){ 
    let tamanho_actual = value.length; 
    for(let i = tamanho_actual; i >= index_pretendido ; i--){
        if(i === index_pretendido + 1){
            value[i] = '-';
            index_paragem = i;
            break;
        }
        value[i] = value[i-1];
    }
}else if(value[0] !== '-' && !flag_operador){
    let tamanho_actual = value.length;
    for(let i = tamanho_actual; i >= 0 ; i--){
        if(i === 0){
            value[i] = '-';
            index_paragem = i;
        }else value[i] = value[i-1]; 
    }
}
}

btn_mais_menos.addEventListener('click', function(){

let value = input.value, valor_anterior, valor_mutado;
value = value.split("");
if(value !== '' &&  !validarOperador(value[value.length - 1]))
{
    if(flag === -1){
        inserir_sinal(value);
        value = value.toString();
        value = value.split(',').join('');
        input.value = value;
        flag = 1;
    }else if(flag === 1){
        remover_sinal(value);
        value = value.toString();
        value = value.split(',').join('');
        input.value = value;
        flag = -1;
    }
}
});


function reverterString(str){
if(typeof(str)){
    let str_new = '';
    for(let i = str.length - 1; i >= 0; i--){
        str_new += str[i];
    }
    return str_new;
}
return null;
}

function converterPercentagem(value){
let index_pretendido = -1;
let str_aux = '';
let valor_convertido;
let tamanho_actual = value.length;
console.log('Valor Original: '+value);
if(!validarPonto(value[value.length - 1])  && !validarOperador(value[value.length - 1])){
    for(let i = value.length - 1; i >= 0; i--)
    {
        if(validarOperador(value[i])){
            index_pretendido = i;
            break; 
        }
        str_aux+=value[i];
    }
    str_aux = reverterString(str_aux);
    if(index_pretendido != -1){
        for(let i = tamanho_actual - 1; i > index_pretendido; i--){
            value.pop();
        }
        valor_convertido = parseFloat(str_aux);
        console.log('Novo convertido: '+valor_convertido);  
        valor_convertido = valor_convertido/100;
        str_aux = valor_convertido.toString();
        console.log('Convertido: '+str_aux);
        let new_array = str_aux.split('');
        console.log('Convertido: '+new_array);
        for(let i = 0; i < new_array.length; i++){
            value.push(new_array[i]);
        }
        console.log('Array Convertido: '+value);
    }else{
        for(let i = tamanho_actual - 1; i >= 0; i--){
            value.pop();
        }
        valor_convertido = parseFloat(str_aux);
        console.log('Novo convertido: '+valor_convertido);  
        valor_convertido = valor_convertido/100;
        str_aux = valor_convertido.toString();
        console.log('Convertido: '+str_aux);
        let new_array = str_aux.split('');
        console.log('Convertido: '+new_array);
        for(let i = 0; i < new_array.length; i++){
            value.push(new_array[i]);
        }
        console.log('Array Convertido: '+value);
    }
}
}


btn_percentagem.addEventListener('click', function(){
    let value = input.value;
    value = value.split('');
    console.log('Super: '+value);
    converterPercentagem(value);
    value = value.toString();
    value = value.split(',').join('');
    input.value = value;
});
