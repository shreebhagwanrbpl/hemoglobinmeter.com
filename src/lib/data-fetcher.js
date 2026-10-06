const json = async (res) => {
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
};

export async function fetchDocCached(path) {
  try {
    return await json(
      await fetch(`/api/site-data?path=${encodeURIComponent(path)}`, {
        cache: "no-store",
      })
    );
  } catch (e) {
    console.error(`[data-fetcher] ${path}`, e);
    return null;
  }
}

export async function fetchFullCatalog() {
  try {
    return await json(await fetch("/api/catalog", { cache: "no-store" }));
  } catch (e) {
    console.error("[data-fetcher] catalog", e);
    return [];
  }
}

export async function fetchHomeData() {
  return fetchDocCached("__website__/pages/home");
}

export async function fetchContactData() {
  return fetchDocCached("__website__/pages/contact");
}

export async function fetchServicesData() {
  return fetchDocCached("__website__/pages/services");
}

export async function fetchDistrictData(district) {
  return fetchDocCached(`__website__/districts/${encodeURIComponent(district || "")}`);
}

export async function fetchAllDistricts() {
  try {
    return await json(await fetch("/api/site-data?districts=1", { cache: "no-store" }));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const fetchActiveDistricts = fetchAllDistricts;

export async function submitContactQuery(data) {
  const res = await fetch("/api/contact-query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data || {}),
  });
  return json(res);
}

export async function submitProductQuery(data) {
  const res = await fetch("/api/product-query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data || {}),
  });
  return json(res);
}
