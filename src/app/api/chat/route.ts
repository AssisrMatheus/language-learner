// ./app/api/chat/route.ts
import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    // Extract the `prompt` from the body of the request
    const { messages } = await req.json();

    console.log('messages', messages);

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        ...messages.map((message: any) => ({
          content: message.content,
          role: message.role
        })),
        {
          role: 'system',
          content:
            'You are a language teacher. The user is requesting you how to conjugate verbs in the language of the given verb. Please return the verb conjugation as flashcards format where the front has the target language conjugation, the back has the name of the tense, with a translation, and as an extra, add an example phrase. The flashcards should follow a json format like: `{ "front": "Je suis", "back": "I am", "extra": "Je suis un homme" }`. Also, on the front side, wrap the verb by prepending {{c1:: and appending }} around the verb'
        }
      ]
    });

    if (response.status !== 200) {
      return response;
    }

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return new Response((error as any).message, { status: 500 });
  }
}
