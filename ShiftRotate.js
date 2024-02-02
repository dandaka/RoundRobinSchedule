function SHIFTROTATE(array, shift) {
  if (!Array.isArray(array)) {
    throw new Error("The first argument must be an array");
  }
  if (array.length % 2 !== 0) {
    throw new Error("The array length must be divisible by 2");
  }
  if (!Number.isInteger(shift)) {
    throw new Error("The shift must be an integer");
  }

  // If the shift is 0, return the original array without modification
  if (shift === 0) {
    return array.slice(); // Return a shallow copy of the array
  }

  const arrayLength = array.length;
  // Normalize the shift value in case it's greater than the array length
  const normalizedShift = shift % arrayLength;

  // Perform the rotation
  return array
    .slice(-normalizedShift)
    .concat(array.slice(0, arrayLength - normalizedShift));
}

// function callShiftRotate() {
//   const result = SHIFTROTATE([1, 2, 3, 4, 5, 6], 2);
//   console.log(result);
// }
// callShiftRotate();
