const handler = async (event) => {
  const VERIFY_TOKEN = "hLdddUClWwE5iE10";

  if (event.httpMethod === "GET") {
    const params = event.queryStringParameters;
    if (params['hub.mode'] === 'subscribe' && params['hub.verify_token'] === VERIFY_TOKEN) {
      return {
        statusCode: 200,
        body: params['hub.challenge']
      };
    } else {
      return { statusCode: 403, body: "Forbidden" };
    }
  }

  if (event.httpMethod === "POST") {
    console.log("Webhook event received:", event.body);
    return { statusCode: 200, body: "EVENT_RECEIVED" };
  }

  return { statusCode: 405, body: "Method Not Allowed" };
};

module.exports = { handler };
