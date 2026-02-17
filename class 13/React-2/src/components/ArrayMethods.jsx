import React from 'react'

const ArrayMethods = () => {
    //logic
    //1.Call Back fuction

    function inner(){
      console.log("I am inner");
    }

    function outer(innerRef){
      console.log("I am outer");
      innerRef();
    }

    outer(inner);

    //2.Array Methods

    let arr = [10, 20, 30, 40, 50];
    //square elements
    let sqrArr = [];
    for (let i=0; i<arr.length; i++){
      let sqrVal = arr[i] * arr[i];
      sqrArr.push(sqrVal);
    }
    console.log("Square Array", sqrArr);

    //cube elements
    let cubeArr = [];
    for (let i=0; i<arr.length; i++){
      let cubeVal = arr[i] * arr[i] * arr[i];
      cubeArr.push(cubeVal);
    }
    console.log("Cube Array", cubeArr);

    //3. more generalised method -> where cb performs the given task 
    function map(arr, cb){
    let newArr = [];
    for (let i=0; i<arr.length; i++){
      let newVal = cb(arr[i]);
      newArr.push(newVal);
    }
    return newArr;
    }

    const doubleVal = (val) => {
      return 2 * val;
    }

    const cubeVal = (val) => {
      return val * val * val;
    }

    console.log("Generalised map func", map(arr, doubleVal));
    console.log("Generalised map func cube", map(arr, cubeVal));

    //4. Inbuilt map function (as an Array Method)

    function triple(ele){
      return 3 * ele;
    }
    const tripleArr = arr.map(triple);
    console.log("Triple through map", tripleArr);

    //5. filter

    const IsEven = (num) => {
      return num % 2 == 0;
    }
    const filteredArr = arr.filter(IsEven);
    console.log(filteredArr);


  return (
    <>
      {/*React Fragments. <>.....</> */}
      <h1>Array Methods</h1>
    </>
  )
}

export default ArrayMethods
