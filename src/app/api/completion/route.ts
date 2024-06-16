import { Montelo } from 'montelo';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const montelo = new Montelo();

export const runtime = 'edge';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await montelo.openai.completions.create({

    model: 'gpt-3.5-turbo-instruct',
    max_tokens: 2000,
    stream: true,
    prompt,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
