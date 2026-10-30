"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { GDTopic } from "@/types/gd";

interface PopularTopicsProps {
  topics: GDTopic[];
}

export default function PopularTopics({ topics }: PopularTopicsProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<GDTopic | null>(null);

  const visibleCount = 4;

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? Math.max(0, topics.length - visibleCount) : prev - 1
    );
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + visibleCount >= topics.length ? 0 : prev + 1
    );
  };

  const displayedTopics = topics.slice(startIndex, startIndex + visibleCount);
  const cardsToRender =
    displayedTopics.length < visibleCount
      ? [
          ...displayedTopics,
          ...topics.slice(0, visibleCount - displayedTopics.length),
        ]
      : displayedTopics;

  return (
    <section
      id="popular-topics"
      aria-labelledby="popular-topics-heading"
      className="pt-4 pb-12 sm:pb-16 px-4 sm:px-6"
    >
      <div className="max-w-[980px] mx-auto">
        {/* Header Row with Centered Heading and Right Navigation Arrows */}
        <div className="relative flex items-center justify-center mb-6 sm:mb-7">
          <h2
            id="popular-topics-heading"
            className="text-center text-xl sm:text-2xl font-extrabold text-[#0A1628] tracking-tight"
          >
            Popular GD Topics
          </h2>

          <div className="absolute right-0 flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous topics"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next topics"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4-Column Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {cardsToRender.map((topic) => (
            <button
              key={topic.id}
              type="button"
              onClick={() => setSelectedTopic(topic)}
              className="group relative h-[130px] sm:h-[138px] w-full rounded-xl overflow-hidden shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue text-center"
            >
              <Image
                src={topic.image_url}
                alt={topic.title.replace("\n", " ")}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#061020]/85 via-[#091932]/60 to-[#091932]/50 group-hover:via-[#091932]/45 transition-colors"
                aria-hidden="true"
              />
              <div className="relative z-10 h-full w-full flex items-center justify-center px-3">
                <span className="text-white font-bold text-base sm:text-[17.5px] leading-snug whitespace-pre-line drop-shadow">
                  {topic.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Topic Preparation Quick-View Modal */}
      {selectedTopic && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="topic-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 backdrop-blur-sm p-4"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue">
                  {selectedTopic.category}
                </span>
                <h3
                  id="topic-modal-title"
                  className="mt-1 text-xl font-bold text-navy-900"
                >
                  {selectedTopic.title.replace("\n", " ")}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTopic(null)}
                aria-label="Close topic details"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Prepare structured arguments covering economic impact, regulatory
              frameworks, ethical considerations, and youth perspectives for{" "}
              <strong className="text-navy-900">
                {selectedTopic.title.replace("\n", " ")}
              </strong>
              .
            </p>

            <div className="mt-5 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedTopic(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium"
              >
                Close
              </button>
              <a
                href="#upcoming-sessions"
                onClick={() => setSelectedTopic(null)}
                className="px-4 py-2 rounded-lg bg-brand-blue hover:bg-brand-blueHover text-white text-sm font-semibold"
              >
                View Upcoming Sessions
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
