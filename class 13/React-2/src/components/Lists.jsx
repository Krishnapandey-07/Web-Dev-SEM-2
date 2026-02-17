import React from "react";

const Lists = () => {
  const arr = ["apple", "mango", "orange", "watermelon"];

  //   return (
  //     <div><ul>
  //         <li>{arr[0]}</li>
  //         <li>{arr[1]}</li>
  //         <li>{arr[2]}</li>
  //         <li>{arr[3]}</li>
  //     </ul>
  //     </div>
  //   )
  // this is not a better approach.

  return (
    <>
      <ul>
        {arr.map((item, index) => {
            //logic
            const handleClick = () => {
                alert(item, "was clicked")
            }
          return (
            <li key={`${item} - ${index}`}>
              <span>{item}</span>
              <button onClick={handleClick}>Click</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Lists;
