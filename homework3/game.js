/**
 * Метод инициализации игры.
 */
function init() {

    // @todo: Добавьте код сюда...

}

/**
 * Метод "выбрасывания" костей должен возвращать случайное число
 * в промежутке от 1 до 6 включительно.
 */
function random() {

    // @todo: Добавьте код сюда...

}

// @todo: При необходимости добавьте другие методы...




if (typeof process === 'object' && process + '' === '[object process]') {

    var test = require('tape');

    // @todo: Удалите ".skip" из следующей строки после выполнения задания
    test.skip('Test homework #3', function (assert) {
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