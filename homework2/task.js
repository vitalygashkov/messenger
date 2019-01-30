function solve() {

    var ID = 0;

    // @todo: Добавьте свои классы сюда...
    var Product = function(manufacturer, model, price) {
        this.id = ID++;
        this.manufacturer = manufacturer;
        this.model = model;
        this.price = price;
    }
    Product.prototype.getLabel = function () {
        var label = this.manufacturer + " " + this.model + " - **" + this.price + "**";
        return label;
    }

    var SmartPhone = function(manufacturer, model, price, screenSize, operatingSystem) {
        Product.apply(this,[manufacturer, model, price]);
        this.screenSize = screenSize;
        this.operatingSystem = operatingSystem;
    }
    SmartPhone.prototype = Object.create(Product);
    SmartPhone.prototype.getLabel = function () {
        var label = "SmartPhone - " + Product.prototype.getLabel.apply(this,[]);
        return label;
    }

    var Charger = function(manufacturer, model, price, outputVoltage, outputCurrent) {
        Product.apply(this,[manufacturer, model, price]);
        this.outputVoltage = outputVoltage;
        this.outputCurrent = outputCurrent;
    }
    Charger.prototype = Object.create(Product);
    Charger.prototype.getLabel = function () {
        var label = "Charger - " + Product.prototype.getLabel.apply(this,[]);
        return label;
    }

    var Headphones = function(manufacturer, model, price, quality, hasMicrophone) {
        Product.apply(this,[manufacturer, model, price]);
        if(quality=="high" || quality=="mid" || quality=="low") {
            this.quality = quality;
        }
        else { throw "Quality should be high, mid or low"; }
        this.hasMicrophone = hasMicrophone;
    }
    Headphones.prototype = Object.create(Product);
    Headphones.prototype.getLabel = function () {
        var label = "Headphones - " + Product.prototype.getLabel.apply(this,[]);
        return label;
    }

    var HardwareStore = function(name, products) {
        this.name = name;
        this.products = [];
        this.sum = 0;
    }
    HardwareStore.prototype.stock = function (product, quantity) {
        // Проверка указанного продукта в наличии
        k=-1;
        for(i=0;i<this.products.length;i++)
        {
            if(this.products[i].product==product){ k=i; break;}
        }
        // Если продукт отстутствует в наличии, то создаём новый продукт
        if(k==-1)
        {
            this.products[this.products.length]={
                id: product.id,
                product:product,
                quantity:quantity};
        }
        // В ином случае к существующему продукту добавляем указанное количество
        else
        {
            this.products[k].quantity+=quantity;
        }
    }
    HardwareStore.prototype.sell = function (productId, quantity) {
        // Проверка указанного продукта в наличии
        k=0;
        for(i=0;i<this.products.length;i++)
        {
            if(this.products[i].id==productId){ k=i; break;}
        }
        // Если товара хватает, то продаём
        if(this.products[k].quantity>=quantity)
        {
            this.sum +=this.products[k].product.price*quantity;
            this.products[k].quantity-=quantity;
            if(this.products[k].quantity==0)
            {
                this.products.splice(k,1);
            }
        }
        else
        {
            throw "Product doesn't exist or quantity is wrong";
        }
    }
    HardwareStore.prototype.getSold = function () {
        return this.sum;
    }
    HardwareStore.prototype.search = function (pattern) {
        // Массив продуктов по результатам поиска
        var search_products=[];
        // Поиск
        for(i=0;i<this.products.length;i++)
        {
            // Приведение к нижнему регистру
            if(this.products[i].product.manufacturer.toLowerCase().indexOf(pattern.toLowerCase())!==-1 ||
                this.products[i].product.model.toLowerCase().indexOf(pattern.toLowerCase())!==-1)
            {
                // Поиск продукта
                search_products[search_products.length] = {
                    product:this.products[i].product,
                    quantity:this.products[i].quantity
                };
            }
        }
        return search_products;
    }


    return {

        // @todo: Удалите следующую строку после выполнения задания...
        // skipTests: true,

        getSmartPhone: function(manufacturer, model, price, screenSize, operatingSystem) {

            // @todo: Вернуть новый экземпляр класса SmartPhone...
            var SmartPhone1 = new SmartPhone(manufacturer, model, price, screenSize, operatingSystem);
            return SmartPhone1;

        },

        getCharger: function(manufacturer, model, price, outputVoltage, outputCurrent) {

            // @todo: Вернуть новый экземпляр класса Charger...
            var Charger1 = new Charger(manufacturer, model, price, outputVoltage, outputCurrent);
            return Charger1;

        },

        getHeadphones: function(manufacturer, model, price, quality, hasMicrophone) {

            // @todo: Вернуть новый экземпляр класса Headphones...
            var Headphones1 = new Headphones(manufacturer, model, price, quality, hasMicrophone);
            return Headphones1;

        },

        getHardwareStore: function(name) {

            // @todo: Вернуть новый экземпляр класса HardwareStore...
            var HardwareStore1 = new HardwareStore(name)
            return HardwareStore1;

        }
    };
}

module.exports = solve;