'use client';

import React, { useState, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';
import { Badge, Button, TextInput } from '@astryxdesign/core';

interface SkillTagInputProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function SkillTagInput({
  skills = [],
  onChange,
  placeholder = 'Nhập kỹ năng và bấm Enter...',
  disabled = false,
}: SkillTagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const addSkill = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return;
    if (skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setInputValue('');
      return;
    }
    onChange([...skills, trimmed]);
    setInputValue('');
  };

  const removeSkill = (indexToRemove: number) => {
    if (disabled) return;
    onChange(skills.filter((_, idx) => idx !== indexToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(inputValue);
    } else if (e.key === ',' || e.key === ';') {
      e.preventDefault();
      addSkill(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && skills.length > 0) {
      removeSkill(skills.length - 1);
    }
  };

  return (
    <div className="space-y-2.5">
      {/* Input container */}
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <TextInput
            label="Kỹ năng"
            isLabelHidden
            value={inputValue}
            isDisabled={disabled}
            onChange={setInputValue}
            onKeyDown={handleKeyDown}
            onEnter={() => addSkill(inputValue)}
            placeholder={placeholder}
            width="100%"
            className='h-10 border'
          />
        </div>
        <Button
          label="Thêm"
          variant="secondary"
          className="px-4 h-10"
          type="button"
          isDisabled={disabled || !inputValue.trim()}
          onClick={() => addSkill(inputValue)}
        />
      </div>

      {/* Rendered Skill Badges */}
      {skills.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {skills.map((skill, index) => (
            <div
              key={`${skill}-${index}`}
              className="inline-flex items-center gap-1.5 bg-slate-100/90 text-slate-800 border border-slate-200/80 rounded-lg px-2.5 py-1 text-xs font-medium"
            >
              <span>{skill}</span>
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-slate-400 hover:text-rose-600 transition-colors rounded p-0.5"
                  title={`Xóa kỹ năng ${skill}`}
                  aria-label={`Xóa kỹ năng ${skill}`}
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
