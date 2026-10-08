const numbers = [1, 2, 3];

const result = numbers.map(x => x * 2);

console.log(result);

const prices = ['$7.99', '$9.99', '$15.99'];
const priceValues = prices.map(x => Number(x.replace('$', '')));
console.log('Price Values:', priceValues);





const num = Number("7.99");
console.log('Number Value:', num);

const products=['Sauce Labs Backpack','Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt'];
console.log('Product:', products[0]);

for(const product of products){
        console.log('Products:', product);   

}


for(const product of products){
    if(product==='Sauce Labs Bike Light'){
    }
        console.log('single Product:', product);

};

for(const product of products){
if(product.includes('Sauce Labs')){
}
    console.log('Sauce Labs Product:', product);

}



const BikeProducts=[];
for(const product of products){
if(product.includes('Bike')){
    BikeProducts.push(product);
}
    console.log('Bike Product:', BikeProducts);


const prices = ['$7.99', '$9.99', '$15.99'];

const newPriceValues=[];
for(const price of prices){
    newPriceValues.push(Number(price.replace('$','')));
}
    console.log("newPriceValues :", newPriceValues);


const numbers = [10, 20, 30, 40, 50];
const newNumbers=[];

// for(const num of numbers){
//     if(num>25){
//         newNumbers.push(num);
//     }
//             console.log("newNumbers", newNumbers);

// }
//             console.log("greater than 25:", num);
for(const num of numbers){
    numbers.filter(num=> num>25)
}
console.log("greater than 25", numbers);

}
