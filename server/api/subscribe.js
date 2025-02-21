export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  const API_KEY = config.mailChimpKey;
  const LIST_ID = config.audienceId;
  const DATACENTER = API_KEY.split("-")[1]; // Extract datacenter from API key

  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `apikey ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: body.email,
      status: "subscribed",
      merge_fields: {
        FNAME: body.name,
      },
    }),
  });

  return await response.json();
});
