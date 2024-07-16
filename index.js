export default {
  async fetch(request, env, ctx) {
    
  if (request.method === 'OPTIONS') {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type'
    };
    return new Response(null, { headers });
  } else if (request.method === 'POST') {

      const requestBody = await request.json();

      console.log(requestBody)

      const { name, message } = requestBody;

      const cardMessage = {
        cards: [
          {
            header: {
              title: 'New Message',
              subtitle: `From: ${name}`
            },
            sections: [
              {
                widgets: [
                  {
                    textParagraph: {
                      text: message
                    }
                  }
                ]
              }
            ]
          }
        ]
      };

      const webhookUrl = 'https://chat.googleapis.com/v1/spaces/AAfffffHvIM/messages?key=AIzaSyDdI0XXXXX7ekJ6WI';

      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardMessage)
      });

      console.log(webhookResponse)
      console.log("webhookResponse. : ", webhookResponse.status,webhookResponse.ok)

      if (webhookResponse.ok) {
        console.log("okay condition")
        const headers = {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type'
        };
        return new Response('Card message sent to Google Chat successfully', { status: 200,headers });
      } else {
        console.log("error condition")
        const errorMessage = `Failed to send card message to Google Chat. Status: ${webhookResponse.status}`;
        console.error(errorMessage);
        return new Response(errorMessage, { status: webhookResponse.status });
      }
  }

  return new Response('Method not allowed', { status: 405 });
  },
};

// submit form via https://r2.zxc.co.in/form.html
