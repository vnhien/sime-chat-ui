import { AUTH_TOKEN_KEY } from "@/utils";

export async function getAPI<ReturnType>(
  path: string,
  init?: RequestInit | undefined
): Promise<ReturnType> {
  const res = await fetch(path, {
    method: "GET",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    ...init,
  });
  let data;
  try {
    data = await res.json();
  } catch {
    // pass
  }
  if (res.ok) {
    return data;
  }
  throw Error(data?.message || res.statusText);
  //pass error to calling function
}

export async function postAPI<ReturnType>(
  path: string,
  init: RequestInit | undefined
): Promise<ReturnType> {
  const res = await fetch(path, {
    method: "POST",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    ...init,
  });
  let data;
  try {
    data = await res.json();
  } catch {
    // pass
  }
  if (res.ok) {
    return data;
  }
  throw Error(data?.message || res.statusText);
  //pass error to calling function
}

export async function putAPI<ReturnType>(
  path: string,
  init: RequestInit | undefined
): Promise<ReturnType> {
  const res = await fetch(path, {
    method: "PUT",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    ...init,
  });
  let data;
  try {
    data = await res.json();
  } catch {
    // pass
  }
  if (res.ok) {
    return data;
  }
  throw Error(data?.message || res.statusText);
  //pass error to calling function
}

export async function deleteAPI<ReturnType>(
  path: string,
  init: RequestInit | undefined
): Promise<ReturnType> {
  const res = await fetch(path, {
    method: "DELETE",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    ...init,
  });
  let data;
  try {
    data = await res.json();
  } catch {
    // pass
  }
  if (res.ok) {
    return data;
  }
  throw Error(data?.message || res.statusText);
  //pass error to calling function
}

export async function getAuthAPI<ReturnType>(
  path: string,
  init?: RequestInit | undefined
): Promise<ReturnType> {
  const jwt = localStorage.getItem(AUTH_TOKEN_KEY);
  const res = await fetch(path, {
    method: "GET",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: `${jwt}`,
      ...(init?.headers || {}),
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    ...init,
  });
  let data;
  try {
    data = await res.json();
  } catch {
    // pass
  }
  if (res.ok) {
    return data;
  }
  throw Error(data?.message || res.statusText);
  //pass error to calling function
}

export async function postAuthAPI<ReturnType>(
  path: string,
  init: RequestInit | undefined
): Promise<ReturnType> {
  const jwt = localStorage.getItem(AUTH_TOKEN_KEY);
  const res = await fetch(path, {
    method: "POST",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: `${jwt}`,
      ...init?.headers,
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    ...init,
  });
  let data;
  try {
    data = await res.json();
  } catch {
    // pass
  }
  if (res.ok) {
    return data;
  }
  throw Error(data?.message || res.statusText);
  //pass error to calling function
}

export async function putAuthAPI<ReturnType>(
  path: string,
  init: RequestInit | undefined
): Promise<ReturnType> {
  const jwt = localStorage.getItem(AUTH_TOKEN_KEY);
  const res = await fetch(path, {
    method: "PUT",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: `${jwt}`,
      ...init?.headers,
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    ...init,
  });
  let data;
  try {
    data = await res.json();
  } catch {
    // pass
  }
  if (res.ok) {
    return data;
  }
  throw Error(data?.message || res.statusText);
  //pass error to calling function
}

export async function deleteAuthAPI<ReturnType>(
  path: string,
  init: RequestInit | undefined
): Promise<ReturnType> {
  const jwt = localStorage.getItem(AUTH_TOKEN_KEY);
  const res = await fetch(path, {
    method: "DELETE",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: `${jwt}`,
      ...init?.headers,
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    ...init,
  });
  let data;
  try {
    data = await res.json();
  } catch {
    // pass
  }
  if (res.ok) {
    return data;
  }
  throw Error(data?.message || res.statusText);
  //pass error to calling function
}
