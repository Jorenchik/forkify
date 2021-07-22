import { REQUEST_TIMEOUT_SECONDS } from './config';

/**
 * Returns promise that will be rejected after given seconds.
 *
 * @param {*} s
 * @returns
 */
export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/**
 * Returns promise of fetch of json data, if result is not received returns error.
 *
 *
 * @param {*} url fetch url
 * @returns json data Promise|ERROR
 */
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([
      fetch(url),
      timeout(REQUEST_TIMEOUT_SECONDS),
    ]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
