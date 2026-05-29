'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { TESTIMONIALS } from '@/lib/constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 360;
    const newScrollLeft =
      direction === 'left'
        ? scrollRef.current.scrollLeft + scrollAmount
        : scrollRef.current.scrollLeft - scrollAmount;
    scrollRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">ماذا يقول عملاؤنا</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            آراء حقيقية من عملائنا الذين يثقون بنا يومياً
          </p>
        </motion.div>

        {/* Scroll Controls */}
        <div className="flex items-center justify-end gap-2 mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            className="rounded-full border-border/50 hover:bg-purple-500/10 hover:text-purple-400 hover:border-purple-500/30"
          >
            <ChevronRight className="size-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            className="rounded-full border-border/50 hover:bg-purple-500/10 hover:text-purple-400 hover:border-purple-500/30"
          >
            <ChevronLeft className="size-5" />
          </Button>
        </div>

        {/* Horizontal Scrollable Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-purple-500/30"
            style={{
              scrollbarWidth: 'thin',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {TESTIMONIALS.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={cardVariants}
                className="flex-shrink-0 w-[340px]"
                style={{ scrollSnapAlign: 'start' }}
              >
                <Card className="h-full border-border/50 bg-card/50 hover:border-purple-500/20 transition-all duration-300">
                  <CardContent className="p-6 flex flex-col gap-4">
                    {/* Quote icon */}
                    <Quote className="size-8 text-purple-500/20" />

                    {/* Comment */}
                    <p className="text-foreground/90 leading-relaxed text-sm flex-1">
                      &ldquo;{testimonial.comment}&rdquo;
                    </p>

                    {/* Rating Stars */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`size-4 ${
                            i < testimonial.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-muted text-muted'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                      <Avatar className="size-10 ring-2 ring-purple-500/20">
                        <AvatarFallback className="bg-purple-500/10 text-purple-400 font-semibold text-sm">
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.location}
                        </p>
                      </div>
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 font-medium">
                        {testimonial.service}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
