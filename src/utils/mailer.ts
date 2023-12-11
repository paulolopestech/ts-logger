import 'dotenv/config'
import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";
const sesClient = new SESClient({ region: 'us-east-1' });

const destinationEmail: any = process.env.EMAIL;

export async function sendEmail(applicationName: string, message: string, time: string) {
    const command = new SendEmailCommand({
        Source: destinationEmail,
        Destination: {
            ToAddresses: [
                destinationEmail,
            ],
        },
        Message: {
            Subject: {
                Data: "ALERTA!",
                Charset: "utf-8",
            },
            Body: {
                Text: {
                    Data: "ALERTA!",
                    Charset: "utf-8",
                },
                Html: {
                    Data: `
              <!DOCTYPE html>
      <html lang="pt-br">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Aviso HTML</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  text-align: center;
                  margin: 50px;
              }
      
              .aviso {
                  padding: 20px;
                  background-color: #ffcc00;
                  color: #333;
                  border: 1px solid #ffcc00;
                  border-radius: 5px;
                  margin-bottom: 20px;
              }
          </style>
      </head>
      <body>
      
          <h1>Alerta! Uma de suas aplicações enviou um alerta: ${applicationName}</h1>
      
          <div class="aviso" role="alert">
              <p>${message}</p>
              <p>${time}</p>
          </div>
      
      </body>
      </html>
      `,
                    Charset: "utf-8",
                },
            },
        },

        ReturnPath: destinationEmail,
        Tags: [
            {
                Name: "Teste",
                Value: "Teste",
            },
        ],
        ConfigurationSetName: "my-first-configuration-set",
    });
    const response = await sesClient.send(command);
    console.log(response)
}
