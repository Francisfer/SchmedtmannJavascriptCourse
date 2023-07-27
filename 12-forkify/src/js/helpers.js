// The goal of this module is to contain a couple of functions that we reuse over and over in our project. This is a central place for all of them.

// To start, one great candidate is to create a function which will get JSON and handle some of the errors (from the model).

// 1. We fetch with that url that we receive.

// 2. We return the data (resolved value).

// 3. We could handle the error right here, but let's sat that we actually want to handle that error in the loadRecipe() in the model. Notice that when we call the method in the model, the error will occur here.
//    It we change the url in the browser to something invalid, the error comes from the helper module (it also bugs the model of course).
//    But we want to handle the error where the method is called, in the module. We need to rethrow the error, remember? Not create a new!

// 4. To make this function a bit more real world, let's add a timeout, basically setting a time after which we make the request fail.
//    This is important in order to prevent for really bad internet connections. So, we will have a race between this timeout function and the fetch function.

// Remember that this is Promise.race[], and this takes two promises.

// The number of seconds in the timeout function seems out of place, if somebody was reading the code, they would not know where it comes from or what this is doing.

// So this is another perfect candidate for the configuration module, we also might want to change this value later.

import { async } from "regenerator-runtime";
import { TIMEOUT_SECONDS } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]); // 1 && 4

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data; // 2
  } catch (error) {
    throw error; // 3
  }
};
