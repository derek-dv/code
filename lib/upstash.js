/**
 * Upstash REST and Edge API utils.
 * Note: We use this lib in multiple demos, feel free to
 * use it in your own projects.
 */
async function upstash({ url, token, ...init }) {
  const res = await fetch(url, {
    ...init,
    headers: {
      authorization: `Bearer ${token}`,
      ...init.headers,
    },
  });

  const data = res.headers.get("Content-Type").includes("application/json")
    ? await res.json()
    : await res.text();

  if (res.ok) {
    return data;
  } else {
    throw new Error(
      `Upstash failed with (${res.status}): ${
        typeof data === "string" ? data : JSON.stringify(data, null, 2)
      }`
    );
  }
}

export async function upstashRest(args, options) {
  const domain =
    process.env.UPSTASH_EDGE_API_DOMAIN ||
    "https://eu1-dominant-eft-35297.upstash.io";
  const token =
    process.env.UPSTASH_EDGE_API_TOKEN ||
    "AYnhACQgZDdiZTVlYzEtYmJlYi00YzAzLWFmYTAtZTY4YjQ0MzllNzllNGQyZDRmZjYzYmE2NDhiNmI4MTY0N2I5ZGJjMzc2Zjg=";

  if (!domain || !token) {
    throw new Error("Missing required Upstash credentials of the REST API");
  }

  return upstash({
    token,
    url: `https://${domain}${options?.pipeline ? "/pipeline" : ""}`,
    method: "POST",
    body: JSON.stringify(args),
  });
}

export async function upstashEdge(args) {
  const domain =
    process.env.UPSTASH_EDGE_API_DOMAIN ||
    "https://eu1-dominant-eft-35297.upstash.io";
  const token =
    process.env.UPSTASH_EDGE_API_TOKEN ||
    "AYnhACQgZDdiZTVlYzEtYmJlYi00YzAzLWFmYTAtZTY4YjQ0MzllNzllNGQyZDRmZjYzYmE2NDhiNmI4MTY0N2I5ZGJjMzc2Zjg=";

  if (!domain || !token) {
    throw new Error("Missing required Upstash credentials of the Edge API");
  }

  return upstash({ token, url: `https://${domain}/${args.join("/")}` });
}
