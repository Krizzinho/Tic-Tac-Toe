'use strict';

const squares = document.querySelectorAll('.square');
const newGame = document.querySelector('button');
const array = new Array(9).fill(-10);
const horizontal = document.querySelector('.horizontal');
const vertical = document.querySelector('.vertical');
const rotateLine = document.querySelector('.rotate');
let turn = 0;
let id = 0;
let endGame = false;

function squareEdit(el, char, color, turnValue, arrayValue) {
    el.textContent = char;
    el.style.color = color;
    el.classList.remove('square');
    el.classList.add('square-selected');
    turn = turnValue;
    array[el.id] = arrayValue;
}

squares.forEach(el => {
    el.id = id;
    id++;
    el.addEventListener('click', function() {
        if(!endGame) {
            if(array[el.id] == -10) {
                // X starts
                if(!turn) squareEdit(el, 'X', 'red', 1, 0);
                else squareEdit(el, 'O', 'blue', 0, 1);
    
                const conditions = [
                    array[0] + array[1] + array[2],
                    array[3] + array[4] + array[5],
                    array[6] + array[7] + array[8],
                    array[0] + array[3] + array[6],
                    array[1] + array[4] + array[7],
                    array[2] + array[5] + array[8],
                    array[0] + array[4] + array[8],
                    array[2] + array[4] + array[6],
                ];
    
                conditions.forEach((cond, index) => {
                    if(cond == 3) drawLine('blue', index);
                    else if(cond == 0) drawLine('red', index);
                });
            }
        }        
    });
});

function drawLine(color, winScheme) {
    endGame = true;
    switch(winScheme) {
        case 0:
        case 1:
        case 2:          
            selectLine(horizontal);
        break;
        case 3:
        case 4:
        case 5: 
            selectLine(vertical);
        break;
        case 6:
        case 7:
            selectLine(rotateLine);
        break;
    }
    
    function selectLine(type) {
        type.classList.remove('hidden');
        type.style.backgroundColor = color;

        switch(type) {
            case horizontal: {
                switch(winScheme) {
                    case 0: type.style.top = '16.6%'; break;
                    case 1: type.style.top = '50%'; break;
                    case 2: type.style.top = '83.3%'; break;
                }
            } break;
            case vertical: {
                switch(winScheme) {
                    case 3: type.style.left = '16.6%'; break;
                    case 4: type.style.left = '50%'; break;
                    case 5: type.style.left = '83.3%'; break;
                }
            } break;
            case rotateLine: {
                console.log(winScheme);
                switch(winScheme) {
                    case 6: type.classList.add('plus'); break;
                    case 7: type.classList.add('minus'); break;
                }
            }
        }
    }
}

newGame.addEventListener('click', function() {
    squares.forEach(el => {
        el.textContent = '';
        el.setAttribute('class', 'square');
    });
    turn = 0;
    id = 0;
    array.fill(-10);
    endGame = false;
    horizontal.classList.add('hidden');
    vertical.classList.add('hidden');
    rotateLine.classList.add('hidden');
    rotateLine.classList.remove('plus', 'minus');
});