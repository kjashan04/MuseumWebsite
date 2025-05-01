
import { getToken } from "./authenticate";

async function fetchWithAuth(url, method = "GET") {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${getToken()}`,
    },
  });

  if (res.status === 200) {
    return await res.json();
  }

  return [];
}

export async function addToFavourites(id) {
  return fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, "PUT");
}

export async function removeFromFavourites(id) {
  return fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, "DELETE");
}

export async function getFavourites() {
  return fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/favourites`);
}

export async function addToHistory(id) {
  return fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, "PUT");
}

export async function removeFromHistory(id) {
  return fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, "DELETE");
}

export async function getHistory() {
  return fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/history`);
}
