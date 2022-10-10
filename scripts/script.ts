const numbers = document.querySelectorAll('.btn-number');
const operator = document.querySelectorAll('.btn-operation');
const AC = document.querySelector('.btn-ac')!;
const displayText = document.getElementById('display-text')!;
const equals = document.getElementById('=')!;
const record = document.getElementById('history')!;
const backspace = document.getElementById('backspace')!;
let historyElement = document.querySelectorAll('.historyElement');


var phrase = '';
var floatKey = false;   //true if number has floating point
var divideKey = false;   //true for preventing 0 after divide
var operatorVicinity = false  //true for prevent operands meet eachother

numbers.forEach(item => {
    item.addEventListener('click', () => {
        addToPhrase(item.id);
        display()
    })
});
operator.forEach(item => {
    item.addEventListener('click', () => {
        addToPhrase(item.id);
        display()
    })
});

AC.addEventListener('click', () => {
    phrase = '';
    displayText.innerText = '';
    floatKey = false;
})

equals.addEventListener('click', () => {
    var answer = calculate();
    displayText.innerText = answer;
    phrase += ' = ' + answer;
    record.innerHTML += `<p class="historyElement">${phrase}</p>`;
    phrase = '';
    historyElement = document.querySelectorAll('.historyElement');
    historyElement.forEach(item => {
        item.addEventListener('click', () => {
            item.remove();
        })
    });
});

backspace.addEventListener('click', ()=>{
    phrase = phrase.slice(0, phrase.length - 1);
    display();
})

function addToPhrase(e) {
    phrase += e;
    if (e === ".") {
        floatKey = true;
    } else {
        if (floatKey) {
            if (isNaN(e)) {
                alert('Can not put an operator after floating point! ');
                phrase = phrase.slice(0, phrase.length - 1);
            } else {
                floatKey = false;
            }
        }
    }
    
    if ((e == '+' || e == '-' || e == '*' || e == '/') && (phrase[phrase.length-2] == '+' || phrase[phrase.length-2] =='-' || phrase[phrase.length-2] =='*' || phrase[phrase.length-2] =='/')) {
        alert('Can not put two operators near each other!');
        phrase = phrase.slice(0, phrase.length - 1);
        if (e == '/') {
            divideKey = true
        }
    }
}
function display() {
    displayText.innerText = phrase;
}

function calculate() {
    var x;
    x = eval(phrase);
    return x;
}
