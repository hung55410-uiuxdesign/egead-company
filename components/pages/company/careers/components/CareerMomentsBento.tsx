"use client";

import { motion } from "framer-motion";
import { Trophy, Plane, Heart, Lightbulb } from "lucide-react";

export default function CareerMomentsBento() {
  return (
    <section className="w-full">
      {/* Top Header Block */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-widest text-[#10E774] font-semibold block mb-2.5 font-montserrat"
          >
            Culture In Action
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl lg:text-[46px] font-semibold font-montserrat leading-[1.2] tracking-tight"
          >
            <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
              E-GEAD Moments
            </span>
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm sm:text-base text-gray-400 max-w-md font-light leading-relaxed font-montserrat"
        >
          We believe in creating a world with kindness and paying it forward to
          future generations. Empathy, vitality, and technical curiosity power
          our community.
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        {/* ROW 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -6, scale: 1.015 }}
            className="relative aspect-square overflow-hidden bg-[#181d1f] border border-white/10 hover:border-[#6CE8C3]/50 rounded-xl group transition-all duration-300 shadow-lg cursor-pointer"
          >
            <img
              src="/assets/banner111.png"
              alt="E-GEAD Football Cup & Sports League"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#10E774]">
              <Trophy className="w-4 h-4" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
              <span className="text-[11px] font-semibold text-[#10E774] uppercase tracking-wider block font-montserrat">
                Wellness &amp; Team Spirit
              </span>
              <p className="text-sm font-semibold text-white font-montserrat leading-snug mt-0.5">
                Football Cup &amp; Sports
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{
              y: -6,
              scale: 1.015,
              borderColor: "rgba(108, 232, 195, 0.5)",
            }}
            className="flex flex-col justify-between p-6 sm:p-7 xl:p-8 bg-[#141718] border border-white/10 transition-all duration-300 aspect-square rounded-xl shadow-lg group cursor-pointer"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="border border-white/40 px-2 py-0.5 inline-flex items-center shrink-0 rounded-sm group-hover:border-[#6CE8C3]"
              >
                <span className="text-[11px] sm:text-xs font-bold tracking-widest text-white group-hover:text-[#6CE8C3] font-mono transition-colors">
                  EGEAD CUP
                </span>
              </motion.div>
              <div className="w-[1px] h-10 bg-white/20 shrink-0" />
              <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#b3b3b3] leading-[1.45]">
                ANNUAL SPORTS CHAMPIONSHIP
                <br />
                VITALITY &amp; TEAMWORK
                <br />
                OUTSIDE SPRINTS
              </p>
            </div>

            <div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-5xl sm:text-6xl lg:text-[76px] xl:text-[84px] font-light text-white group-hover:text-[#6CE8C3] tracking-tighter leading-none font-montserrat transition-colors"
              >
                12+
              </motion.div>
              <p className="text-[11px] sm:text-xs text-[#5EFC8D] font-mono uppercase tracking-wider mt-2.5 font-medium">
                Annual Inter-Hub Tournaments
              </p>
            </div>
          </motion.div>
        </div>

        {/* Row 1 Right */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -6, scale: 1.015 }}
          className="relative w-full h-[280px] sm:h-[320px] lg:h-full min-h-[260px] overflow-hidden bg-[#181d1f] border border-white/10 hover:border-[#6CE8C3]/50 rounded-xl group transition-all duration-300 shadow-lg cursor-pointer"
        >
          <img
            src="/assets/company.png"
            alt="Annual Company Retreats & Summits in Da Lat and Coastal Summits"
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
          <div className="absolute top-5 left-5 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#10E774]">
            <Plane className="w-4 h-4" />
          </div>
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
            <span className="text-xs font-mono uppercase tracking-wider text-[#6CE8C3] mb-2 inline-block">
              Culture &amp; Celebration • Da Lat &amp; Coastal Summits
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-[26px] font-semibold text-white font-montserrat leading-snug group-hover:text-[#D4FAE6] transition-colors">
              Annual Company Retreats &amp; Summits
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-light mt-2 max-w-xl leading-relaxed">
              Bringing our engineering, operations, and creative teams together
              across hubs to align vision, celebrate milestones, and cultivate
              deep bonds.
            </p>
          </div>
        </motion.div>

        {/* ROW 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          whileHover={{
            y: -6,
            scale: 1.015,
            borderColor: "rgba(108, 232, 195, 0.5)",
          }}
          className="flex flex-col justify-between p-7 sm:p-9 lg:p-10 bg-[#141718] border border-white/10 transition-all duration-300 min-h-[300px] lg:min-h-full rounded-xl shadow-lg group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#10E774]/20 border border-[#10E774]/30 flex items-center justify-center text-[#10E774]">
                <Heart className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#6CE8C3]">
                Diversity &amp; Inclusivity
              </span>
            </div>
            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">
              March 08 Annual Celebration
            </span>
          </div>

          <p className="text-lg sm:text-xl lg:text-[22px] font-normal text-white font-montserrat leading-[1.55] tracking-tight my-6">
            &ldquo;At E-GEAD, empathy and technical excellence go hand-in-hand.
            Over 45% of our engineering, product, and operational leadership
            positions are held by brilliant women innovating the future of
            cross-border commerce.&rdquo;
          </p>

          <div className="flex items-end justify-between pt-6 border-t border-white/10">
            <div>
              <h4 className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-white font-mono">
                E-GEAD DIVERSITY ALLIANCE
              </h4>
              <p className="text-[11px] sm:text-xs text-[#a3a3a3] font-mono uppercase tracking-wider mt-1">
                EMPOWERING INCLUSIVE INNOVATION ACROSS HUBS
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.08 }} className="shrink-0">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-white/90 group-hover:text-[#6CE8C3] font-mono uppercase border border-white/30 group-hover:border-[#6CE8C3] px-2.5 py-1 rounded bg-white/5 transition-colors">
                WOMEN IN TECH
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Row 2 Right */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            whileHover={{ y: -6, scale: 1.015 }}
            className="relative aspect-square overflow-hidden bg-[#181d1f] border border-white/10 hover:border-[#6CE8C3]/50 rounded-xl group transition-all duration-300 shadow-lg cursor-pointer"
          >
            <img
              src="/assets/millennial-asia-businessmen-businesswomen-meeting-brainstorming-ideas-about-new-paperwork-project-colleagues-working-together-planning-success-strategy-enjoy-teamwork-small-modern-night-office__1_.jpg"
              alt="Engineering Hackathons & Tech Hub collaboration"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#10E774]">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
              <span className="text-[11px] font-semibold text-[#10E774] uppercase tracking-wider block font-montserrat">
                Innovation &amp; Open Source
              </span>
              <p className="text-sm font-semibold text-white font-montserrat leading-snug mt-0.5">
                Tech Hub &amp; Hackathons
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{
              y: -6,
              scale: 1.015,
              borderColor: "rgba(108, 232, 195, 0.5)",
            }}
            className="flex flex-col justify-between p-6 sm:p-7 xl:p-8 bg-[#141718] border border-white/10 transition-all duration-300 aspect-square rounded-xl shadow-lg group cursor-pointer"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="border border-white/40 px-2 py-0.5 inline-flex items-center shrink-0 rounded-sm group-hover:border-[#6CE8C3]"
              >
                <span className="text-[11px] sm:text-xs font-bold tracking-widest text-white group-hover:text-[#6CE8C3] font-mono transition-colors">
                  TECH HUB
                </span>
              </motion.div>
              <div className="w-[1px] h-10 bg-white/20 shrink-0" />
              <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#b3b3b3] leading-[1.45]">
                QUARTERLY HACKDAYS
                <br />
                AUTONOMOUS WMS &amp;
                <br />
                AI PARSER MARATHONS
              </p>
            </div>

            <div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-5xl sm:text-6xl lg:text-[76px] xl:text-[84px] font-light text-white group-hover:text-[#6CE8C3] tracking-tighter leading-none font-montserrat transition-colors"
              >
                48H
              </motion.div>
              <p className="text-[11px] sm:text-xs text-[#5EFC8D] font-mono uppercase tracking-wider mt-2.5 font-medium">
                Continuous Innovation Sprints
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
