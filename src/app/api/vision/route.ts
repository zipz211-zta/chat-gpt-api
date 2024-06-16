import { Montelo } from 'montelo';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const montelo = new Montelo();

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages, data } = await req.json();

  const initialMessages = messages.slice(0, -1);
  const currentMessage = messages[messages.length - 1];

  const response = await montelo.openai.chat.completions.create({
    name: 'chat-vision',
    model: 'gpt-4-vision-preview',
    stream: true,
    max_tokens: 150,
    messages: [
      ...initialMessages,
      {
        ...currentMessage,
        content: [
          { type: 'text', text: currentMessage.content },

          {
            type: 'image_url',
            image_url: data.imageUrl,
          },
        ],
      },
    ],
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
