/**
 * Метод инициализации игры.
 */

var current_player = true;
var amount = 0;
var points1 = 0;
var points2 = 0;
const n = 100; // Количество очков, необходимое для победы

function init() {

    document.getElementById('points_1').innerHTML = '0';
    document.getElementById('points_2').innerHTML = '0';
    document.getElementById('image1').src = 'images/dice-1.png';
    document.getElementById('image2').src = 'images/dice-1.png';
    current_player = true;
    document.getElementById("current_player").innerHTML = 'Сейчас ход игрока 1';
    document.getElementById('current_points').innerHTML = 'Набрано очков: 0';
    amount = 0;
    points1 = 0;
    points2 = 0;

}

/**
 * Метод "выбрасывания" костей должен возвращать случайное число
 * в промежутке от 1 до 6 включительно.
 */
function random() {

    return Math.floor(Math.random() * (6 - 1)) + 1;

}

function changePlayer() { // Смена игрока

    current_player = !current_player; // Смена значения current_player на противоположное
    if(current_player) {
        document.getElementById("current_player").innerHTML = 'Сейчас ход игрока 1';
        alert('Вы использовали сохранение, либо у вас выпала единица. Сейчас ход игрока 1');
    }
    else {
        document.getElementById("current_player").innerHTML = 'Сейчас ход игрока 2';
        alert('Вы использовали сохранение, либо у вас выпала единица. Сейчас ход игрока 2');
    }
    amount = 0;
    document.getElementById('current_points').innerHTML = 'Набрано очков: 0';

}

function save() { // Сохранить набранные очки

    if(current_player) {
        points1+=amount;
        if (points1>=n) { alert("Победа игрока 1"); init(); } // Если набрано n очков, то игрок побеждает
        else { document.getElementById('points_1').innerHTML = points1; changePlayer(); } // Смена игрока после сохранения очков
    }
    else {
        points2+=amount;
        if(points2>=n) { alert("Победа игрока 2"); init(); } // Если набрано n очков, то игрок побеждает
        else { document.getElementById('points_2').innerHTML = points2; changePlayer(); } // Смена игрока после сохранения очков
    }

}

function toss() { // Перемешать, бросить кости

    var value1 = random();
    var value2 = random();
    var image1 = document.getElementById('image1');
    var image2 = document.getElementById('image2');
    image1.src='images/dice-'+value1+'.png';
    image2.src='images/dice-'+value2+'.png';
    if (value1 == 1 || value2 == 1) { changePlayer(); } // При выпадании единицы - смена игрока
    else { amount+=value1+value2; document.getElementById('current_points').innerHTML = 'Набрано очков: '+amount; }

}

if (typeof process === 'object' && process + '' === '[object process]') {

    var test = require('tape');

    test('Test homework #3', function (assert) {
        var testsCount = 100;
        assert.plan(testsCount);
        for(var i = 0; i < testsCount; i++) {
            var value = random();
            assert.assert(value >= 1 && value <= 6);
        }
    });
} else {
    init();
}