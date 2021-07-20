import { REQUEST_TIMEOUT_SECONDS } from './config';

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    // const res = await fetch(
    //   `${API_URL}/${id}?key=c839caa0-136c-4f5b-881a-530fef098fe9`
    //   );
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
