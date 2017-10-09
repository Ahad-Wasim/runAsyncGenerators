// import test from 'tape';
// import { incrementAsync } from './sagas';

// test('increment saga test', () => {
//     const gen = incrementAsync();
//     gen().next();
//     gen().next();
// });

function runAsyncGenerators(generator){
    const gen = generator();

    const iterateThroughYields = (iterator) => {

        if(iterator.done) return iterator.value;

        if(iterator.value.then){
            return iterator.value.then((res) => iterateThroughYields(gen.next(res)) );
        }
    };

    return iterateThroughYields(gen.next());
}

const fetchCats = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['Felix', 'Tom'])
        }, 2000);
    });
}

const fetchDogs = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['Clifford', 'Brian'])
        }, 2000);
    });
}



function* fetchAllAnimals(){
    const cats = yield fetchCats();
    const dogs = yield fetchDogs();
    return [ ...cats, ...dogs ];
}

runAsyncGenerators(fetchAllAnimals).then( allAnimals => {
    console.log('Here is the collection of animals', allAnimals);
});



