// Like the configuration file, here we want to put all the functions that we reuse all over our code.

import { TIMEOUT_SECONDS } from "./configuration.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
}; // The function that we use to race the promises below.

// Get Json and send Json refactored
export const AJAX = async function (url, uploadData = undefined) {
  // upload data set to undefined by default, like this, when we call the ajax function with only the url, there is no upload data
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getJson = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]); // Await promise, notice the syntax. race, more real world for bad internet connections.

    const data = await response.json(); // Await the promise again

    // Error handling - ok comes from the response and message comes from the data(api)
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data; // We need to return the data so we can use it in the model. Resolved value
  } catch (error) {
    throw error; // So we can handle the error in the model. Remember that is not new Error
  }
};
export const sendJson = async function (url, uploadData) {
  try {
    // up until this point, all we ever did was to pass a url into the fetch function and that would automatically create a get request.
    // now we need a post request, so we need to pass an object of options. Headers are snippets of text (information about the request itself)
    // Many are standard headers, but one that we need to define is the content type(syntax) (the data that we are going to send is in the json format)
    // The payload (data that we want to send), called body. So we need to receive the data as an argument to stringify.

    const fetchPromise = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    });

    const response = await Promise.race([
      fetchPromise,
      timeout(TIMEOUT_SECONDS),
    ]);

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};
