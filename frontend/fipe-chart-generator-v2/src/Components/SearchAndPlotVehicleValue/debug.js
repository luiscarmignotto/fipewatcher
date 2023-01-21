// const obj = {
//     "array": []
// };

// const newObj = {...obj};

// console.log(obj === newObj);
// console.log(obj.array === newObj.array);

const array1 = [{type: "action1"}, {type: "action2"}, {type: "action3"}, {type: "action4"}];

// 0 + 1 + 2 + 3 + 4
const initialState = {};
const sumWithInitial = array1.reduce(
  (currentState, action) => {
    switch (action.type){ 
        case 'action1':
            const newState = {};
            return newState;
        default: 
            return currentState
    }
  }, initialState
);

console.log(sumWithInitial);
// Expected output: 10
