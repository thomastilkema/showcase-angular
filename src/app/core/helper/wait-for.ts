export const waitFor = async (
  getSource: () => unknown,
  callbackFunction: () => void,
  intervalTiming = 20,
  waitLimit = 1000
) => {
  if (getSource()) {
    callbackFunction();
    return;
  }

  await waitForNextCycle();
  if (getSource()) {
    callbackFunction();
    return;
  }

  let waitedFor = 0;
  const intervalID = setInterval(() => {
    waitedFor = waitedFor + intervalTiming;
    if (getSource()) {
      clearInterval(intervalID);
      callbackFunction();
      return;
    }

    if (waitedFor >= waitLimit) {
      clearInterval(intervalID);
      return;
    }
  }, intervalTiming);
};

const waitForNextCycle = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
