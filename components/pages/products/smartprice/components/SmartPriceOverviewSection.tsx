'use client';

import { motion, type Variants } from 'framer-motion';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function SmartPriceOverviewSection() {
  return (
    <motion.div
      className="product-overview__intro"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -40px 0px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15, delayChildren: 0.05 },
        },
      }}
    >
      <motion.p className="product-overview__intro-title" variants={fadeInUp}>
        Don&apos;t let your profits be lost in the guessing game
      </motion.p>
      <motion.h2 className="product-overview__intro-subtitle" variants={fadeInUp}>
        <span>
          Finding the sweet spot for pre-owned product pricing is <br />
        </span>
        <span>
          more art than science... until now.
        </span>
      </motion.h2>
      <motion.div
        className="product-overview__intro-content"
        variants={{
          hidden: { opacity: 0, y: 30, scale: 0.98 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      >
        <div className="video-block" title="SmartPrice Overview">
          <img src="/assets/smartprice/SmartPrice.jpg" alt="SmartPrice Overview" />
          <div className="video-block__icon">
            <span role="img" aria-label="play" className="anticon">
              <svg width="80" height="80" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="0.7"
                  y="0.7"
                  width="93.6"
                  height="93.6"
                  rx="46.8"
                  stroke="white"
                  strokeOpacity="0.32"
                  strokeWidth="1.4"
                />
                <rect x="16" y="16" width="63" height="63" rx="31.5" fill="white" />
                <rect
                  x="16.7"
                  y="16.7"
                  width="61.6"
                  height="61.6"
                  rx="30.8"
                  stroke="white"
                  strokeOpacity="0.2"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M42.8085 34.1436C40.2953 32.6983 38.2578 33.8823 38.2578 36.786V58.214C38.2578 61.1206 40.2953 62.303 42.8085 60.8591L61.4896 50.1181C64.0036 48.6723 64.0036 46.3299 61.4896 44.8844L42.8085 34.1436Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="video-text">
          <div className="video-text__inner">
            <p>Discover SmartPrice</p>
            <div className="btn-block">
              <a
                className="ant-btn ant-btn-default ant-btn-default--white"
                download="CASmartPrice_OnePager_EN_231018.pdf"
                target="_blank"
                rel="noopener noreferrer"
                href="/assets/smartprice/OnePager.pdf"
              >
                <span role="img" aria-label="download" className="anticon">
                  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="file_download">
                      <path
                        id="Vector"
                        d="M12.0013 10.5013V12.5013H4.0013V10.5013H2.66797V12.5013C2.66797 13.2346 3.26797 13.8346 4.0013 13.8346H12.0013C12.7346 13.8346 13.3346 13.2346 13.3346 12.5013V10.5013H12.0013ZM11.3346 7.83464L10.3946 6.89464L8.66797 8.61463V3.16797H7.33464V8.61463L5.60797 6.89464L4.66797 7.83464L8.0013 11.168L11.3346 7.83464Z"
                        fill="currentColor"
                      />
                    </g>
                  </svg>
                </span>
                One pager
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
