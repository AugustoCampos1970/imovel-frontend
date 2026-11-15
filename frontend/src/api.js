const productionFallback = "https://imovel-backend1-p6fo.onrender.com";
const configuredApi =
  import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "/api" : productionFallback);
const trimmedApi = configuredApi.replace(/\/+$/, "");
const baseURL = trimmedApi.endsWith("/api") ? trimmedApi : `${trimmedApi}/api`;
const REQUEST_TIMEOUT_MS = 75000;

function getStoredToken() {
  try {
    const user = JSON.parse(localStorage.getItem("imovefacil_user") || "null");
    return user?.access_token || user?.token || null;
  } catch {
    localStorage.removeItem("imovefacil_user");
    return null;
  }
}

function buildUrl(path, params) {
  const url = `${baseURL}${path}`;
  if (!params) return url;
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, String(value));
    }
  });
  const suffix = query.toString();
  return suffix ? `${url}?${suffix}` : url;
}

async function request(method, path, data, config = {}) {
  const controller = new AbortController();
  const timeout = window.setTimeout(
    () => controller.abort(),
    config.timeout || REQUEST_TIMEOUT_MS
  );
  const headers = { Accept: "application/json", ...(config.headers || {}) };
  const token = getStoredToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (data !== undefined) headers["Content-Type"] = "application/json";

  try {
    const response = await fetch(buildUrl(path, config.params), {
      method,
      headers,
      body: data === undefined ? undefined : JSON.stringify(data),
      signal: controller.signal,
    });
    const text = await response.text();
    let payload = null;
    if (text) {
      try {
        payload = JSON.parse(text);
      } catch {
        payload = text;
      }
    }

    if (!response.ok) {
      const error = new Error(`HTTP ${response.status}`);
      error.response = { status: response.status, data: payload };
      error.config = { url: path };
      if (
        response.status === 401 &&
        !path.includes("/auth/login") &&
        !path.includes("/auth/register")
      ) {
        window.dispatchEvent(new CustomEvent("imovefacil:unauthorized"));
      }
      throw error;
    }
    return { data: payload, status: response.status, headers: response.headers };
  } catch (error) {
    if (error.name === "AbortError") error.code = "ECONNABORTED";
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

const api = {
  get: (path, config) => request("GET", path, undefined, config),
  post: (path, data, config) => request("POST", path, data, config),
  put: (path, data, config) => request("PUT", path, data, config),
  delete: (path, config) => request("DELETE", path, undefined, config),
};

export function getApiErrorMessage(error, fallback) {
  const detail = error.response?.data?.detail;
  if (Array.isArray(detail)) {
    return detail.map((item) => item.msg || "Dado inválido.").join(" ");
  }
  if (typeof detail === "string") return detail;
  if (error.code === "ECONNABORTED") {
    return "A API demorou para responder. O servidor pode estar iniciando; tente novamente.";
  }
  return fallback;
}

export { baseURL };
export default api;
