'use client';

import React, { useState, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';
import { Badge, Button } from '@astryxdesign/core';

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
        <input
          type="text"
          value={inputValue}
          disabled={disabled}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        />
        <Button
          label="Thêm"
          variant="secondary"
          size="sm"
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
