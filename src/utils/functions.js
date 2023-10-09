import { randomString } from "./Helpers";

export function setTokenApi(token) {
  localStorage.setItem("access_token", token);
}

export function getTokenApi() {
  return localStorage.getItem("access_token");
}

export function removeTokenApi() {
  localStorage.removeItem("access_token");
}

//Client seed
export function setClientSeed(seed) {
  localStorage.setItem("client_seed", seed);
}

export function getClientSeed() {
  return localStorage.getItem("client_seed");
}

export function updateClientSeed() {
  setClientSeed(randomString(32));
}

export function checkClientSeed() {
  let clientSeed = getClientSeed();
  if (clientSeed === null) {
    setClientSeed(randomString(32));
  }
}

//Active display balance
export function setDisplayBalance(balance) {
  localStorage.setItem("display_balance", balance);
}

export function getDisplayBalance() {
  return localStorage.getItem("display_balance");
}
