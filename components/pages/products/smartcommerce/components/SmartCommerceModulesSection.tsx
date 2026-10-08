"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CATEGORIES,
  type CategoryKey,
} from "../data/smartcommerce-categories.data";
import { MODULES_DATA } from "../data/smartcommerce-modules.data";

export default function SmartCommerceModulesSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  const filteredModules = MODULES_DATA.filter((module) => {
    if (activeCategory === "all") return true;
    return module.categories.includes(activeCategory);
  });

  return (
    <section className="smart-main-container w-full px-4 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-20 pb-16 sm:pb-24">
      <motion.div
        className="smart-main-toolbar"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <ul className="smart-main-toolbar-inner">
          {CATEGORIES.map((cat) => (
            <li
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`filter-text ${activeCategory === cat.id ? "active" : ""}`}
            >
              {cat.label}
            </li>
          ))}
        </ul>
      </motion.div>

      <div className="smart-main-list">
        {filteredModules.map((module) => (
          <motion.div
            key={module.id}
            className="sml-element active"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sml-element-inner">
              <div className="sml-top">
                <div className="sml-title">{module.title}</div>
                <div
                  className="sml-desc"
                  dangerouslySetInnerHTML={{ __html: module.descHtml }}
                />
              </div>
              <div
                className={`sml-media media-type-${module.useVideo && module.video ? "video" : "image"}`}
              >
                <div className="sml-img">
                  <img
                    className="sml-img-front"
                    src={module.imageFront}
                    alt={module.title}
                    loading="lazy"
                  />
                  <img
                    className="sml-img-hover"
                    src={module.imageHover}
                    alt={`${module.title} preview`}
                    loading="lazy"
                  />
                </div>
                {module.useVideo && module.video && (
                  <div className="sml-video">
                    <video src={module.video} autoPlay muted loop playsInline />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
