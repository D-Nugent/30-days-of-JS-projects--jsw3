let timeOut = 160;
const repeat = (func,numberOfTimes) => {
  for (let i = 0; i < numberOfTimes; i++) {
    setTimeout(() => func(), timeOut);
    timeOut += 160
  }
}