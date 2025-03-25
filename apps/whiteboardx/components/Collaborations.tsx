"use client";
import React, { useEffect, useRef } from "react";
import { Button } from "@repo/ui/button";
// import { Check, Users } from "lucide-react";
// import { cn } from "@/lib/utils";

const collaborationPoints = [
  {
    title: "Work together in real-time",
    description:
      "See your team's cursors and edits as they happen, making remote collaboration as effective as being in the same room.",
  },
  {
    title: "Comment and discuss directly on the board",
    description:
      "Leave contextual comments on any element, start threads, and resolve discussions without switching tools.",
  },
  {
    title: "Share with anyone",
    description:
      "Generate view-only or edit links to share with teammates, clients, or stakeholders—with or without an account.",
  },
  {
    title: "Assign tasks visually",
    description:
      "Convert ideas into actionable tasks and assign them to team members right from the whiteboard.",
  },
];

const Collaboration = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add animation classes to child elements with staggered delay
          const elements = entry.target.querySelectorAll("[data-animate]");
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add("animate-fade-in");
              el.classList.remove("opacity-0");
            }, 100 * index);
          });

          if (imageRef.current) {
            imageRef.current.classList.add("animate-fade-in");
            imageRef.current.classList.remove("opacity-0");
          }
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id='collaboration'
      className='section-padding relative'
      ref={sectionRef}>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
          <div>
            <div
              className='inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 opacity-0'
              data-animate>
              {/* <Users className='w-4 h-4' /> */}
              <span className='text-sm font-medium'>Team Collaboration</span>
            </div>
            <h2
              className='text-3xl md:text-4xl font-bold mb-6 opacity-0'
              data-animate>
              Designed for seamless collaboration
            </h2>
            <p
              className='text-foreground/70 text-lg mb-8 opacity-0'
              data-animate>
              Foster creativity and productivity with a platform built from the
              ground up for modern teams to work together effortlessly.
            </p>

            <div className='space-y-6 mb-8'>
              {collaborationPoints.map((point, index) => (
                <div key={index} className='flex opacity-0' data-animate>
                  <div className='flex-shrink-0 mt-1'>
                    <div className='w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary'>
                      {/* <Check className='w-3 h-3' /> */}
                    </div>
                  </div>
                  <div className='ml-4'>
                    <h3 className='font-medium mb-1'>{point.title}</h3>
                    <p className='text-foreground/70 text-sm'>
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant='primary'
              title='Start Collaborating'
              data-animate
            />
          </div>

          <div
            ref={imageRef}
            className='relative rounded-xl overflow-hidden shadow-elevated border border-border/40 opacity-0 transition-all duration-700'>
            <div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-0'></div>

            <div className='relative z-10'>
              {/* Collaboration Demo */}
              <div className='bg-white p-4 border-b border-border/20'>
                <div className='flex items-center space-x-2 mb-4'>
                  <div className='w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-medium text-indigo-600 border border-white'>
                    AL
                  </div>
                  <div>
                    <div className='text-sm font-medium'>Alex Lee</div>
                    <div className='text-xs text-muted-foreground'>
                      Working on "Product Roadmap"
                    </div>
                  </div>
                </div>

                <div className='relative h-72 p-4 bg-gray-50 rounded border border-border/30 overflow-hidden'>
                  {/* Whiteboard content */}
                  <div className='absolute left-1/4 top-1/4 w-40 h-24 bg-blue-50 rounded-lg border border-blue-200 flex items-center justify-center text-sm text-center p-2'>
                    Product Research Phase
                  </div>

                  <div className='absolute right-1/4 top-1/2 w-40 h-24 bg-green-50 rounded-lg border border-green-200 flex items-center justify-center text-sm text-center p-2'>
                    Development Sprint
                  </div>

                  <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 w-px h-16 bg-gray-300 dashed'></div>

                  <div className='absolute left-1/2 top-1/4 w-32 h-10 bg-yellow-50 rounded border border-yellow-200 flex items-center justify-center text-xs text-center'>
                    Q3 Launch
                  </div>

                  {/* Cursors */}
                  <div className='absolute left-1/3 top-1/3 flex flex-col items-start'>
                    <div className='w-5 h-5 transform rotate-[100deg] text-red-500'>
                      <svg viewBox='0 0 24 24' height='100%' width='100%'>
                        <path
                          fill='currentColor'
                          d='M13,1 L13,1 L1,13 L8,13 L8,23 L13,23 L13,1'></path>
                      </svg>
                    </div>
                    <span className='text-xs bg-red-500 text-white rounded px-1.5 py-0.5 -mt-1'>
                      Sarah
                    </span>
                  </div>

                  <div className='absolute right-1/3 bottom-1/3 flex flex-col items-start'>
                    <div className='w-5 h-5 transform rotate-[100deg] text-blue-500'>
                      <svg viewBox='0 0 24 24' height='100%' width='100%'>
                        <path
                          fill='currentColor'
                          d='M13,1 L13,1 L1,13 L8,13 L8,23 L13,23 L13,1'></path>
                      </svg>
                    </div>
                    <span className='text-xs bg-blue-500 text-white rounded px-1.5 py-0.5 -mt-1'>
                      Miguel
                    </span>
                  </div>

                  {/* Comment tooltip */}
                  <div className='absolute right-10 top-10 max-w-xs bg-white rounded-lg shadow-elevated border border-border/30 p-3 text-xs'>
                    <div className='flex items-start mb-2'>
                      <div className='w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-[10px] font-medium text-purple-600 border border-white mr-2'>
                        KT
                      </div>
                      <div>
                        <div className='font-medium'>Kate Thompson</div>
                        <div className='text-muted-foreground text-[10px]'>
                          Just now
                        </div>
                      </div>
                    </div>
                    <p className='text-foreground/80'>
                      Should we add an intermediary step between research and
                      development?
                    </p>
                  </div>
                </div>
              </div>

              <div className='bg-white p-4 flex items-center justify-between'>
                <div className='flex space-x-1.5'>
                  <div className='w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-[10px] font-medium text-red-600 border border-white'>
                    JS
                  </div>
                  <div className='w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-medium text-blue-600 border border-white'>
                    MT
                  </div>
                  <div className='w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-[10px] font-medium text-green-600 border border-white'>
                    KT
                  </div>
                  <div className='w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-[10px] font-medium text-purple-600 border border-white'>
                    AL
                  </div>
                </div>
                <div className='text-xs text-foreground/60'>
                  4 collaborators online
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10' />
      <div className='absolute bottom-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10' />
    </section>
  );
};

export default Collaboration;
