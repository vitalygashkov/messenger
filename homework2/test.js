var test = require('tape');
const result = require('./task')();

if (!result.skipTests) {
    test('Test homework #2', function (assert) {

        assert.plan(86);
        
        assert.equal(typeof result.getSmartPhone, 'function');
        assert.equal(result.getSmartPhone.length, 5);
        assert.equal(typeof result.getCharger, 'function');
        assert.equal(result.getCharger.length, 5);
        assert.equal(typeof result.getHeadphones, 'function');
        assert.equal(result.getHeadphones.length, 5);
        assert.equal(typeof result.getHardwareStore, 'function');
        assert.equal(result.getHardwareStore.length, 1);

        const phone = result.getSmartPhone('HTC', 'One M8', 42, 5, 'Android');
        const charger = result.getCharger('HTC', 'Standard', 20, 19, 2000);
        const headphones = result.getHeadphones('Sennheiser', 'HD 598', 340, 'low', false);

        [ phone, charger, headphones ]
        .forEach(device => {
            [ 'id', 'manufacturer', 'model', 'price', 'getLabel' ]
                .forEach(property => assert.assert(device[property] !== 'undefined'));

            assert.equal(typeof device.getLabel, 'function');
            assert.equal(device.getLabel.length, 0);
        });

        [ 'screenSize', 'operatingSystem' ]
            .forEach(property => assert.assert(phone[property] !== 'undefined'));

        [ 'outputVoltage', 'outputCurrent' ]
            .forEach(property => assert.assert(charger[property] !== 'undefined'));
        
        [ 'quality', 'hasMicrophone' ]
            .forEach(property => assert.assert(headphones[property] !== 'undefined'));
        
        var store = result.getHardwareStore('Technomarket');
        assert.assert(store['name'] !== 'undefined');
        
        [ 'stock', 'sell', 'getSold', 'search' ]
            .forEach(property => {
                assert.assert(store[property] !== 'undefined');
                assert.equal(typeof store[property], 'function')
            });

        assert.equal(phone.manufacturer, 'HTC');
        assert.equal(phone.model, 'One M8');
        assert.equal(phone.price, 42);
        assert.equal(phone.screenSize, 5);
        assert.equal(phone.operatingSystem, 'Android');

        assert.equal(charger.manufacturer, 'HTC');
        assert.equal(charger.model, 'Standard');
        assert.equal(charger.price, 20);
        assert.equal(charger.outputVoltage, 19);
        assert.equal(charger.outputCurrent, 2000);

        assert.throws(() => result.getHeadphones('Sennheiser', 'HD 598', 42, 'price', true));
        assert.throws(() => result.getHeadphones('Sennheiser', 'HD 598', 42, [], true));
        assert.throws(() => result.getHeadphones('Sennheiser', 'HD 598', 42, {}, true));
        assert.throws(() => result.getHeadphones('Sennheiser', 'HD 598', 42, -1, true));
        assert.throws(() => result.getHeadphones('Sennheiser', 'HD 598', 42, 0, true));
        assert.throws(() => result.getHeadphones('Sennheiser', 'HD 598', 42, 2, true));

        assert.equal(headphones.manufacturer, 'Sennheiser');
        assert.equal(headphones.model, 'HD 598');
        assert.equal(headphones.price, 340);
        assert.equal(headphones.quality, 'low');
        assert.equal(headphones.hasMicrophone, false);

        assert.equal(phone.getLabel(), 'SmartPhone - HTC One M8 - **42**');
        assert.equal(charger.getLabel(), 'Charger - HTC Standard - **20**');
        assert.equal(headphones.getLabel(), 'Headphones - Sennheiser HD 598 - **340**');

        [ phone, charger,  headphones ]
            .forEach(product => {
                const store = result.getHardwareStore('Technostore');
                store.stock(product, 42);

                assert.equal(store.products.length, 1);
                assert.equal(store.products[0].id, product.id);
            });

        store = result.getHardwareStore('DNS')
        
        store.stock(phone, 1)
        store.stock(charger, 2)
        store.stock(headphones, 3);
        assert.equal(store.products.length, 3);
        
        store.stock(phone, 4);
        assert.equal(store.products.length, 3);

        store.sell(phone.id, 2);
        assert.equal(store.products.length, 3);

        store.sell(headphones.id, 1);
        assert.equal(store.products.length, 3);

        assert.throws(() => store.sell(charger.id, 3));
        store.sell(charger.id, 2);
        assert.equal(store.products.length, 2);

        store.stock(charger, 2)
        assert.equal(store.products.length, 3);

        assert.equal(store.getSold(), phone.price * 2 + headphones.price + charger.price * 2);
        store.sell(headphones.id, 2);
        assert.equal(store.getSold(), phone.price * 2 + headphones.price * 3 + charger.price * 2);

        var actual = store.search('htc');
        assert.equal(actual.length, 2);
        assert.deepEqual(actual.map(x => x.product.id).sort(), [ phone.id, charger.id ].sort());
        assert.deepEqual(actual.map(x => x.quantity).sort(), [ 3, 2 ].sort());
    });
}
