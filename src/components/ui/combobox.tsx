'use client';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';

export function Combobox<
  T extends {
    value: string;
    label: React.ReactNode;
  }
>({
  options,
  placeholder,
  emptyState,
  searchPlaceholder,
  onSelect,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
  ...props
}: {
  options: T[];
  placeholder: React.ReactNode;
  searchPlaceholder: string;
  emptyState: React.ReactNode;
  onSelect?: (value?: T) => void;
} & Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'placeholder'>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value ? options.find((option) => option.value === value)?.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <input {...props} type="hidden" value={value} />
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandEmpty>{emptyState}</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(selectedValue) => {
                  setValue(selectedValue === value ? '' : selectedValue);
                  setOpen(false);

                  const selectedOption = options.find((option) => option.value === selectedValue);
                  if (onSelect) onSelect(selectedOption);
                }}
              >
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
