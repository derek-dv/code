/**
 * Multi purpose rate limiting API.
 * Note: We use this lib in multiple demos, feel free to
 * use it in your own projects.
 */
function getHeaders(nameOrHeaders) {
  nameOrHeaders = nameOrHeaders ?? "RateLimit";
  return !nameOrHeaders || typeof nameOrHeaders === "string"
    ? [
        `X-${nameOrHeaders}-Limit`,
        `X-${nameOrHeaders}-Remaining`,
        `X-${nameOrHeaders}-Reset`,
      ]
    : nameOrHeaders;
}

const rateLimited = ({ id }) => {
  return new Response(
    JSON.stringify({
      error: { message: `API rate limit exceeded for ${id}` },
    }),
    {
      status: 403,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

async function rateLimit(context) {
  let { headers, id, limit, timeframe, count, onRateLimit } = context;

  // Temporal logging
  const start = Date.now();
  // By removing the milliseconds our of the date and dividing by `timeframe`
  // we now have a time that changes every `timeframe` seconds
  const time = Math.floor(Date.now() / 1000 / timeframe);
  const key = `${id}:${time}`;
  let countOrRes;

  try {
    countOrRes = await count({ ...context, key });
  } catch (err) {
    console.error("Rate limit `count` failed with:", err);
    // If the count function fails we'll ignore rate limiting and
    // return a successful response to avoid blocking the request
    return new Response(null);
  }

  const h = countOrRes instanceof Response ? countOrRes.headers : new Headers();
  const remaining = countOrRes instanceof Response ? 0 : limit - countOrRes;
  const reset = (time + 1) * timeframe;

  // Temporal logging
  const latency = Date.now() - start;
  h.set("x-upstash-latency", `${latency}`);

  if (headers[0]) h.set(headers[0], `${limit}`);
  if (headers[1]) h.set(headers[1], `${remaining < 0 ? 0 : remaining}`);
  if (headers[2]) h.set(headers[2], `${reset}`);
  if (countOrRes instanceof Response) return countOrRes;
  if (remaining < 0) {
    const res = await onRateLimit(context);

    // Concat the rate limiting headers
    headers.concat("x-upstash-latency").forEach((key) => {
      if (key) res.headers.set(key, h.get(key));
    });

    return res;
  }
  return new Response(null, { headers: h });
}

export const initRateLimit = (fn) =>
  async function isRateLimited(request) {
    const ctx = await fn(request);

    if (ctx instanceof Response) return ctx;

    return rateLimit({
      ...ctx,
      request: ctx.request ?? request,
      headers: getHeaders(ctx.headers),
      onRateLimit: ctx.onRateLimit ?? rateLimited,
    });
  };
