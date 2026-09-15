'use client';

import React, { useState } from 'react';
import { Cpu, Check, Sparkles, Zap } from 'lucide-react';

export interface BusinessRulesBuilderProps {
  id?: string;
  className?: string;
}

interface AutomationRule {
  id: string;
  title: string;
  category: string;
  active: boolean;
  trigger: string;
  condition: string;
  action: string;
  monthlyExecutions: number;
  businessImpact: string;
}

const initialRules: AutomationRule[] = [
  {
    id: 'rule-vip',
    title: 'High-Value VIP Order Acceleration',
    category: 'Carrier Routing',
    active: true,
    trigger: 'New Order Ingestion',
    condition: 'Cart Gross Value > $100.00',
    action: 'Auto-upgrade to USPS Priority Mail & insert custom branded unboxing card',
    monthlyExecutions: 842,
    businessImpact: '+18% Repeat Purchase Rate on TikTok Shop & Shopify',
  },
  {
    id: 'rule-remote',
    title: 'Non-Contiguous Surcharge Shield',
    category: 'Cost Optimization',
    active: true,
    trigger: 'Address Validation Check',
    condition: 'State IN (Alaska, Hawaii, Puerto Rico, Guam)',
    action: 'Route through regional USPS consolidation hub to bypass $6.50 commercial carrier surcharges',
    monthlyExecutions: 314,
    businessImpact: '$2,041 Saved in Unexpected Domestic Freight Penalties',
  },
  {
    id: 'rule-rto',
    title: 'Automated CASS Address Intercept',
    category: 'Risk Mitigation',
    active: true,
    trigger: 'USPS DPV Validation Failure',
    condition: 'Secondary Unit (Apt/Suite) missing OR Zip mismatch',
    action: 'Trigger automated SMS verification link to buyer with 6-hour response window before printing',
    monthlyExecutions: 529,
    businessImpact: '-84% RTO (Return to Sender) Packages Across US Hubs',
  },
];

export default function BusinessRulesBuilder({
  id = 'rules-engine',
  className = '',
}: BusinessRulesBuilderProps) {
  const [rules, setRules] = useState<AutomationRule[]>(initialRules);
  const [selectedRuleId, setSelectedRuleId] = useState<string>('rule-vip');

  const toggleRule = (ruleId: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === ruleId ? { ...r, active: !r.active } : r))
    );
  };

  const activeRule = rules.find((r) => r.id === selectedRuleId) || rules[0];
  const totalExecutions = rules.reduce((acc, r) => acc + (r.active ? r.monthlyExecutions : 0), 0);

  return (
    <section
      id={id}
      className={`relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white overflow-hidden ${className}`}
    >
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141718] border border-white/10 text-[#d3f9f5] text-xs sm:text-sm font-normal tracking-wider uppercase mb-4 font-montserrat">
            <Cpu className="w-3.5 h-3.5 text-[#7ceee0]" aria-hidden="true" />
            No-Code Automation Builder
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#d3f9f5] font-montserrat leading-[1.2]">
            Intelligent Business Rules &amp; <span className="text-[#7ceee0] font-medium">Exception Handling</span> Engine
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-2xl mx-auto">
            Build custom fulfillment workflows in plain English. Automate carrier upgrades, intercept flawed addresses, and protect margins without writing a single line of code.
          </p>
        </div>

        {/* Builder Container */}
        <div className="rounded-[32px] bg-[#141718]/90 border border-[#262C30] p-6 sm:p-10 lg:p-12 backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Rules List */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#262C30]">
                <span className="text-xs uppercase font-bold tracking-wider text-[#8C8C8C] font-montserrat">
                  Configured Workflow Rules
                </span>
                <span className="text-xs font-mono text-[#25E2CC] font-bold">
                  {totalExecutions.toLocaleString()} executions/mo
                </span>
              </div>

              {rules.map((rule) => {
                const isSelected = rule.id === activeRule.id;
                return (
                  <div
                    key={rule.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedRuleId(rule.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedRuleId(rule.id);
                      }
                    }}
                    className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25E2CC] ${
                      isSelected
                        ? 'bg-[#1D2224] border-[#25E2CC]/50 shadow-[0_0_15px_rgba(37,226,204,0.15)]'
                        : 'bg-[#0A0D0E]/80 border-[#262C30] hover:border-[#8C8C8C]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#141718] text-[#25E2CC] border border-[#25E2CC]/20">
                        {rule.category}
                      </span>

                      {/* Accessible Switch */}
                      <button
                        type="button"
                        role="switch"
                        aria-checked={rule.active}
                        aria-label={`Toggle ${rule.title}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRule(rule.id);
                        }}
                        className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25E2CC] ${
                          rule.active ? 'bg-[#25E2CC]' : 'bg-[#262C30]'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out ${
                            rule.active ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <h4 className="text-sm font-medium text-[#d3f9f5] font-montserrat leading-snug">
                      {rule.title}
                    </h4>

                    <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-[#8C8C8C]">
                      <span>{rule.active ? 'Active Rule' : 'Paused'}</span>
                      <span className="text-emerald-400">
                        {rule.active ? `${rule.monthlyExecutions} runs` : 'Inactive'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Logic Flow Visualizer */}
            <div
              className="lg:col-span-7 bg-[#0A0D0E]/90 border border-[#262C30] rounded-[28px] p-6 sm:p-8 space-y-6"
              aria-live="polite"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#262C30]">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#8C8C8C] font-semibold font-montserrat">
                    Visual Automation Logic
                  </span>
                  <h3 className="text-lg font-medium text-[#d3f9f5] font-montserrat mt-0.5">
                    {activeRule.title}
                  </h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                    activeRule.active
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-[#262C30] text-[#8C8C8C]'
                  }`}
                >
                  {activeRule.active ? 'LIVE TRIGGER' : 'DISABLED'}
                </span>
              </div>

              {/* Step 1: TRIGGER */}
              <div className="p-4 rounded-2xl bg-[#141718] border border-[#262C30]">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#25E2CC] block mb-1">
                  Step 1: Ingestion Trigger
                </span>
                <div className="flex items-center gap-2 text-white font-bold font-montserrat text-sm">
                  <Zap className="w-4 h-4 text-[#25E2CC]" aria-hidden="true" />
                  <span>{activeRule.trigger}</span>
                </div>
              </div>

              {/* Step 2: CONDITION (IF) */}
              <div className="p-4 rounded-2xl bg-[#1D2224]/70 border border-[#25E2CC]/30 relative">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  Step 2: Conditional Evaluation (IF)
                </span>
                <div className="text-white font-mono text-xs sm:text-sm font-semibold bg-[#0A0D0E] p-3 rounded-xl border border-[#262C30]">
                  <code>IF ({activeRule.condition})</code>
                </div>
              </div>

              {/* Step 3: ACTION (THEN) */}
              <div className="p-4 rounded-2xl bg-[#141718] border border-[#262C30]">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  Step 3: Automated Action (THEN)
                </span>
                <div className="flex items-start gap-2 text-white font-montserrat text-xs sm:text-sm leading-relaxed">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{activeRule.action}</span>
                </div>
              </div>

              {/* Business Impact Metric */}
              <div className="p-4 rounded-2xl bg-[#25E2CC]/10 border border-[#25E2CC]/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C8C8C] font-montserrat block">
                    Proven Merchant ROI Impact
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-[#7ceee0] font-montserrat block mt-0.5">
                    {activeRule.businessImpact}
                  </span>
                </div>
                <Sparkles className="w-5 h-5 text-[#25E2CC] flex-shrink-0" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
