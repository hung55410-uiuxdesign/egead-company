'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { CareersVideoData } from '@/lib/services/careers-page-config.service';
import { getYouTubeEmbedInfo } from '@/lib/utils/media';

interface CareerVideoSectionProps {
  config?: CareersVideoData;
}

export default function CareerVideoSection({ config }: CareerVideoSectionProps) {
  const videoUrl = config?.videoUrl?.trim();

  // Nếu trong admin không gắn video (để trống hoặc rỗng) thì client không hiển thị
  if (!config || !videoUrl) {
    return null;
  }

  const ytEmbed = getYouTubeEmbedInfo(videoUrl);

  return (
    <section className="w-full py-10 sm:py-16" id="career-video">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Header tùy chọn (nếu admin có điền tiêu đề hoặc phụ đề) */}
          {(config.title || config.subtitle) && (
            <div className="text-center max-w-3xl mx-auto space-y-2">
              {config.subtitle && (
                <span className="inline-block text-xs sm:text-sm font-semibold text-[#189B8C]">
                  {config.subtitle}
                </span>
              )}
              {config.title && (
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                  {config.title}
                </h2>
              )}
            </div>
          )}

          {/* Khung video bo góc cao cấp tỉ lệ 16:9 */}
          <div className="relative w-full rounded-[24px] sm:rounded-[36px] overflow-hidden bg-slate-950 border border-slate-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.08)] aspect-video">
            {ytEmbed ? (
              <iframe
                src={ytEmbed.previewUrl || ytEmbed.embedUrl}
                title={config.title || 'Video tuyển dụng & văn hóa E-GEAD'}
                className="w-full h-full border-0 absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <video
                src={videoUrl}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              >
                <source src={videoUrl} type={videoUrl.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
                Trình duyệt của bạn không hỗ trợ phát thẻ video này.
              </video>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
