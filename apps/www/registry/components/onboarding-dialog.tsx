"use client";

import { motion } from "motion/react";
import Image from "next/image";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/registry/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/ui/dialog";

export function OnboardingDialog() {
  const [open, setOpen] = React.useState(true);
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setActiveIndex(carouselApi.selectedScrollSnap());
    };

    onSelect();
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onSelect);
    };
  }, [carouselApi]);

  const isFirstSlide = activeIndex === 0;
  const isLastSlide = activeIndex === slides.length - 1;
  const currentSlide = slides[activeIndex] ?? slides[0];

  const handleNext = () => {
    if (isLastSlide) {
      setOpen(false);
      return;
    }

    carouselApi?.scrollNext();
  };

  const handlePrevious = () => {
    carouselApi?.scrollPrev();
  };

  const handlePillsKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!carouselApi) return;
      const currentIndex = carouselApi.selectedScrollSnap();
      const lastIndex = slides.length - 1;
      let targetIndex: number | null = null;

      if (event.key === "ArrowLeft") {
        targetIndex = currentIndex <= 0 ? lastIndex : currentIndex - 1;
      } else if (event.key === "ArrowRight") {
        targetIndex = currentIndex >= lastIndex ? 0 : currentIndex + 1;
      } else if (event.key === "Home") {
        targetIndex = 0;
      } else if (event.key === "End") {
        targetIndex = lastIndex;
      }

      if (targetIndex === null) {
        return;
      }

      event.preventDefault();
      carouselApi.scrollTo(targetIndex);

      const targetPill = event.currentTarget.querySelector<HTMLButtonElement>(
        `button[data-pill-index="${targetIndex}"]`,
      );
      targetPill?.focus();
    },
    [carouselApi],
  );

  return (
    <Dialog
      // disable pointer dismissal so that the user cannot close the dialog by clicking outside of it
      disablePointerDismissal={true}
      onOpenChange={setOpen}
      open={open}
    >
      <DialogContent className="p-2 sm:p-4" layout="center">
        <section>
          <Carousel
            className="w-full"
            opts={{ loop: false }}
            setApi={setCarouselApi}
          >
            <CarouselContent className="ml-0 ">
              {slides.map((slide, index) => (
                <CarouselItem className="pl-0" key={slide.id}>
                  <div className="p-1">
                    <Image
                      alt={slide.alt}
                      className="aspect-video size-full rounded-lg  w-full object-cover"
                      height={720}
                      priority={index === 0}
                      sizes="(max-width: 640px) 92vw, 40rem"
                      src={slide.image}
                      unoptimized
                      width={1200}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div
            className="flex items-center justify-center gap-2"
            onKeyDownCapture={handlePillsKeyDown}
          >
            {slides.map((slide, index) => (
              <motion.div
                animate={{
                  opacity: index === activeIndex ? 1 : 0.8,
                  width: index === activeIndex ? 24 : 16,
                }}
                initial={false}
                key={slide.id}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <Button
                  aria-current={index === activeIndex ? "true" : undefined}
                  aria-label={`Go to ${slide.title}`}
                  className={cn(
                    "h-2 w-full rounded-full px-0 cursor-pointer",
                    index !== activeIndex && "hover:opacity-100",
                  )}
                  data-pill-index={index}
                  key={slide.id}
                  onClick={() => carouselApi?.scrollTo(index)}
                  size="sm"
                  variant={index === activeIndex ? "default" : "outline"}
                />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid p-2">
          {slides.map((slide) => {
            return (
              <motion.div
                animate={{
                  opacity: currentSlide.id === slide.id ? 1 : 0,
                }}
                aria-hidden={currentSlide.id !== slide.id}
                className="col-start-1 row-start-1"
                initial={false}
                key={slide.id}
                style={{
                  pointerEvents: currentSlide.id === slide.id ? "auto" : "none",
                }}
                transition={{ duration: 0.24, ease: "easeOut" }}
              >
                <DialogHeader className="text-left gap-4">
                  <DialogTitle>{slide.title}</DialogTitle>
                  <DialogDescription>{slide.description}</DialogDescription>
                </DialogHeader>
              </motion.div>
            );
          })}
        </section>

        <DialogFooter className="p-1 flex-row justify-between sm:justify-between mt-auto">
          {!isFirstSlide && (
            <Button
              className="cursor-pointer"
              onClick={handlePrevious}
              size="sm"
              variant="ghost"
            >
              Back
            </Button>
          )}
          <div className="flex items-center gap-2 ml-auto">
            <Button
              className="cursor-pointer"
              onClick={() => setOpen(false)}
              size="sm"
              variant="ghost"
            >
              Skip
            </Button>
            <Button
              className="cursor-pointer"
              disabled={!carouselApi}
              onClick={handleNext}
              size="sm"
            >
              {isLastSlide ? "Enter" : "Next"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type PlaceholderImageOptions = {
  title: string;
  startColor: string;
  endColor: string;
  accentColor: string;
};

const createPlaceholderImage = ({
  title,
  startColor,
  endColor,
  accentColor,
}: PlaceholderImageOptions) => {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720" fill="none">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="720" gradientUnits="userSpaceOnUse">
      <stop stop-color="${startColor}" />
      <stop offset="1" stop-color="${endColor}" />
    </linearGradient>
  </defs>
  <rect width="1200" height="720" rx="40" fill="url(#bg)" />
  <rect x="96" y="96" width="1008" height="528" rx="30" fill="${accentColor}" fill-opacity="0.18" />
  <circle cx="270" cy="220" r="54" fill="${accentColor}" fill-opacity="0.7" />
  <rect x="352" y="184" width="552" height="72" rx="20" fill="${accentColor}" fill-opacity="0.68" />
  <rect x="196" y="350" width="404" height="36" rx="18" fill="${accentColor}" fill-opacity="0.62" />
  <rect x="196" y="410" width="620" height="30" rx="15" fill="${accentColor}" fill-opacity="0.56" />
  <rect x="196" y="456" width="720" height="30" rx="15" fill="${accentColor}" fill-opacity="0.46" />
  <text x="196" y="565" fill="${accentColor}" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="700">${title}</text>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const slides = [
  {
    alt: "Dashboard preview",
    description:
      "Track tasks, documents, and progress from one focused dashboard built for daily execution. Track tasks, documents, and progress from one focused dashboard built for daily execution.",
    id: "welcome",
    image: createPlaceholderImage({
      accentColor: "#0B1E47",
      endColor: "#CDE2FF",
      startColor: "#EAF2FF",
      title: "Welcome Dashboard",
    }),
    title: "Welcome to your new workspace",
  },
  {
    alt: "Automation workflow preview",
    description:
      "Use smart flows to remove manual busywork and keep your team aligned without extra status meetings.",
    id: "automations",
    image: createPlaceholderImage({
      accentColor: "#0A3D30",
      endColor: "#CAF6E8",
      startColor: "#E8FFF7",
      title: "Automations",
    }),
    title: "Automate repetitive work",
  },
  {
    alt: "Collaboration preview",
    description:
      "Share feedback directly where decisions happen so updates stay clear, timely, and easy to follow.",
    id: "collaboration",
    image: createPlaceholderImage({
      accentColor: "#4A2B00",
      endColor: "#FFE8C2",
      startColor: "#FFF6E8",
      title: "Team Collaboration",
    }),
    title: "Collaborate in context",
  },
  {
    alt: "Insights reporting preview",
    description:
      "Turn activity into insights with reporting views that highlight what is improving and what needs attention. Turn activity into insights with reporting views that highlight what is improving and what needs attention.Turn activity into insights with reporting views that highlight what is improving and what needs attention.",
    id: "insights",
    image: createPlaceholderImage({
      accentColor: "#2D1457",
      endColor: "#E1D4FF",
      startColor: "#F2ECFF",
      title: "Insights Reporting",
    }),
    title: "Measure outcomes",
  },
] as const;
