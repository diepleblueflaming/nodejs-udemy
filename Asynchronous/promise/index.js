AsyncAdd= function (a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            if(typeof a === 'number' && typeof b === 'number'){
                resolve( a + b);
            }else {
                reject('a and b must be a number');
            }
        }, 2000);
    });
};

let sum = AsyncAdd(10, 20);
sum.then(
    (result) => {
        console.log(`Result: ${result}`);
        return AsyncAdd(result, '33');
    },
    (errorMessage) => {
        console.log(`Error: ${errorMessage}`);
    }
).then(
    (result) => {
        console.log(`Result: ${result}`);
    },
    (errorMessage) => {
        console.log(`Error: ${errorMessage}`);
    }
);
