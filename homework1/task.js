var test = require('tape');

/**
 * Функция, которая вычисляет значение 1+ 1/2^2+1/3^2+...+1/n^2
 * до указанного N или с указанной точностью
 */
function calculate(N) {
    var sum = 0;
    var i = 1;
    if (N >= 1) {
      for (i = 1; i <= N; i++) { sum += 1/Math.pow(i,2); }
      return sum
    } else if (N < 1) {
      while (1/Math.pow(i,2) >= N) {
        sum += 1/Math.pow(i,2);
        i++;
      }
      return sum + 1/Math.pow(i,2);
    } else { return "error" }
}


// @todo: Удалите ".skip" из следующей строки после выполнения задания
test('Test homework #1', function (assert) {
    assert.plan(3);
    assert.equal(Number(calculate(100).toFixed(10)), 1.6349839002);
    assert.equal(Number(calculate(0.01).toFixed(10)), 1.5580321940);
    assert.equal(calculate("abc"), "error");
});
