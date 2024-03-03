import { APIGatewayEvent } from "aws-lambda";
import OpenAI from "openai";

type RequestBody = {
    subject: string
};

export async function main(event: APIGatewayEvent) {
    const body = <RequestBody>JSON.parse(event.body!);

    const openai = new OpenAI({ apiKey: process.env['OPENAI_KEY'] });

    const prompt = `Create a cartoon image of ${body.subject}`;

    const gptResponse = await openai.images.generate({
        prompt,
        model: "dall-e-3",
        response_format: "url"
    });
    const result = gptResponse.data[0].url;

    return {
        statusCode: 200,
        body: result
    };
}
