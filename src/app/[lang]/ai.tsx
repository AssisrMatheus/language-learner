'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChat } from 'ai/react';

export default function Ai({ dict }: { dict: any }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.length > 0
        ? messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              {m.role === 'user' ? 'User: ' : 'AI: '}
              {m.content}
            </div>
          ))
        : null}

      <form onSubmit={handleSubmit} className="flex w-full max-w-lg items-center space-x-2">
        <Input value={input} placeholder="Say something..." onChange={handleInputChange} />
        <Button type="submit">{dict.searchAction}</Button>
      </form>
    </div>
  );
}
