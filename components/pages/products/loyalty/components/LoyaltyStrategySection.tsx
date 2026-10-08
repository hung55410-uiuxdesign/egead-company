'use client';

import { motion, type Variants } from 'framer-motion';

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function LoyaltyStrategySection() {
  return (
    <section className="relative w-full py-20 sm:py-28 lg:py-32 bg-[#000000] text-white overflow-hidden">
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
        {/* Header Block */}
        <motion.div
          className="w-full text-center max-w-4xl mx-auto mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm sm:text-base font-medium text-[#6CE8C3] mb-3 font-montserrat tracking-wider uppercase">
            Step into the future of O2O with SmartLoyalty
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-semibold text-white font-montserrat leading-[1.25] tracking-tight">
            <span>Our omnichannel solution leverages social interactions </span>
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
              to keep customers engaged, ensuring your brand thrives at every touchpoint.
            </span>
          </h2>
        </motion.div>

        {/* Strategy Card 1: Enterprise-Class Loyalty */}
        <motion.div
          className="w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-[#12131C] border border-white/[0.08] p-7 sm:p-10 lg:p-12 xl:p-16 mb-8 sm:mb-12 shadow-2xl relative overflow-hidden transition-all duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15, margin: '0px 0px -50px 0px' }}
          variants={cardVariant}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            {/* Left Column: Heading, description, bullet points */}
            <div className="lg:col-span-5 xl:col-span-5 text-left">
              <h3 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-bold text-white font-montserrat leading-[1.25] tracking-tight mb-4 sm:mb-5">
                Enterprise-Class Loyalty.
              </h3>
              <p className="text-sm sm:text-base lg:text-[17px] text-[#A1A1AA] font-normal leading-[1.65] mb-7 sm:mb-8 font-montserrat">
                If you’re looking to boost your enterprise-class business’ Omnichannel marketing strategy on another level, you won’t risk missing this intelligent, data-driven Loyalty technology that offers:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3.5">
                  <svg
                    className="w-4 h-4 text-[#3B82F6] shrink-0 mt-1 fill-[#3B82F6] drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" />
                  </svg>
                  <span className="text-sm sm:text-[15px] lg:text-[16px] text-[#E2E8F0] font-light leading-relaxed font-montserrat">
                    Versatility through an API-first approach, catering to a spectrum of accrual types, ensuring a loyalty solution finely tuned to your distinct business needs.
                  </span>
                </li>
                <li className="flex items-start gap-3.5">
                  <svg
                    className="w-4 h-4 text-[#3B82F6] shrink-0 mt-1 fill-[#3B82F6] drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" />
                  </svg>
                  <span className="text-sm sm:text-[15px] lg:text-[16px] text-[#E2E8F0] font-light leading-relaxed font-montserrat">
                    Scalable infrastructure with cloud-native architecture, which seamlessly scales with your business growth, providing a robust and scalable loyalty infrastructure.
                  </span>
                </li>
              </ul>
            </div>

            {/* Right Column: Img1 Mockup */}
            <div className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-end">
              <img
                src="/assets/loyalty/img1.png"
                alt="Enterprise-Class Loyalty"
                className="w-full h-auto max-w-[720px] lg:max-w-[840px] xl:max-w-[940px] object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        {/* Strategy Card 2: Intelligent and Evolving */}
        <motion.div
          className="w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-[#12131C] border border-white/[0.08] p-7 sm:p-10 lg:p-12 xl:p-16 mb-8 sm:mb-12 shadow-2xl relative overflow-hidden transition-all duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15, margin: '0px 0px -50px 0px' }}
          variants={cardVariant}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            {/* Left Column: Heading, description, bullet points */}
            <div className="lg:col-span-5 xl:col-span-5 text-left">
              <h3 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-bold text-white font-montserrat leading-[1.25] tracking-tight mb-4 sm:mb-5">
                Intelligent and Evolving.
              </h3>
              <p className="text-sm sm:text-base lg:text-[17px] text-[#A1A1AA] font-normal leading-[1.65] mb-7 sm:mb-8 font-montserrat">
                Traditional, manual Loyalty programs no longer cut it in the digital-first era. You need an ever-evolving intelligent Loyalty solution that delivers:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3.5">
                  <svg
                    className="w-4 h-4 text-[#3B82F6] shrink-0 mt-1 fill-[#3B82F6] drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" />
                  </svg>
                  <span className="text-sm sm:text-[15px] lg:text-[16px] text-[#E2E8F0] font-light leading-relaxed font-montserrat">
                    Cutting-edge AI/ML enhancement, which collects and analyzes vast amounts of customer data, then provides profound insights into individual preferences, behaviors, and purchasing habits.
                  </span>
                </li>
                <li className="flex items-start gap-3.5">
                  <svg
                    className="w-4 h-4 text-[#3B82F6] shrink-0 mt-1 fill-[#3B82F6] drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" />
                  </svg>
                  <span className="text-sm sm:text-[15px] lg:text-[16px] text-[#E2E8F0] font-light leading-relaxed font-montserrat">
                    Seamless customer engagement using AI-driven recommendation engines, giving each customer targeted offers, rewards, and highly personalized incentives.
                  </span>
                </li>
              </ul>
            </div>

            {/* Right Column: Img2 Mockup */}
            <div className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-end">
              <img
                src="/assets/loyalty/img2.png"
                alt="Intelligent and Evolving"
                className="w-full h-auto max-w-[720px] lg:max-w-[840px] xl:max-w-[940px] object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        {/* Strategy Card 3: Social Sharing of Reward Points */}
        <motion.div
          className="w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-[#12131C] border border-white/[0.08] p-7 sm:p-10 lg:p-12 xl:p-16 relative overflow-hidden shadow-2xl transition-all duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15, margin: '0px 0px -50px 0px' }}
          variants={cardVariant}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            {/* Left Column: Heading, description, paragraph */}
            <div className="lg:col-span-5 xl:col-span-5 text-left">
              <h3 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-bold text-white font-montserrat leading-[1.25] tracking-tight mb-4 sm:mb-5">
                Social Sharing of Reward Points.
              </h3>
              <p className="text-sm sm:text-base lg:text-[17px] text-[#A1A1AA] font-normal leading-[1.65] mb-5 font-montserrat">
                It’s more than just keeping your customers coming back; it’s building a sustainable community around your brand.
              </p>
              <p className="text-sm sm:text-base lg:text-[16px] text-[#CBD5E1] font-light leading-[1.7] font-montserrat">
                Make it happen with Loyalty’s social sharing feature that allows your customers to share their reward points with friends and family, thus leading to enhanced customer satisfaction and retention and organic brand reach extension. Let them build their community, then yours.
              </p>
            </div>

            {/* Right Column: Img3 Mockup */}
            <div className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-end">
              <img
                src="/assets/loyalty/img3.png"
                alt="Social Sharing of Reward Points"
                className="w-full h-auto max-w-[720px] lg:max-w-[840px] xl:max-w-[940px] object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
