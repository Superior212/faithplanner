"use client";

// import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    id: 1,
    content:
      "Finally, someone has created the perfect blend of faith and organization! This journal of faith planner is exactly what I’ve been looking for—combining a daily planner with a spiritual journal in one beautifully designed space. I love how it allows me to keep track of my goals, to-do lists, and prayer reflections all in one place. It truly helps me stay focused, grounded in faith, and is intentional about both my spiritual and daily journey. Highly recommend it to anyone looking to enrich their faith while staying organized!",
    name: "Shallie B",
    image: "/user1.svg",
  },
  {
    id: 2,
    content:
      "I absolutely adore this faith planner and journal! It’s hands down the best I’ve come across. The weekly Bible scriptures are a huge help in keeping me on track with God’s word. And the prayer request feature is a game-changer! Being able to write down my requests and dates they were answered helps keep my faith alive. Highly recommend it!",
    name: "Mayala G",
    //   image: "/user2.svg",
  },
  {
    id: 3,
    content:
      "I am so excited about this Planner/Journal. I am a church clerk and this offers so many features I can benefit from, personally and professionally.",
    name: "Tiffany A",
    //   image: "/user3.svg",
  },
  // {
  //   id: 4,
  //   content:
  //     "Egestas dui id ornare arcu odio ut sem nulla. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Molestie a iaculis at erat pellentesque adipiscing commodo elit at. Amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus.",
  //   name: "Michael Lee",
  //   image: "/user4.svg",
  // },
  // {
  //   id: 5,
  //   content:
  //     "Feugiat in fermentum posuere urna nec tincidunt praesent semper. Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Eu sem integer vitae justo eget magna fermentum iaculis. Tristique senectus et netus et malesuada fames ac turpis egestas.",
  //   name: "Sophia Chen",
  //   image: "/user5.svg",
  // },
];

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const rotateTestimonials = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(rotateTestimonials, 9000); // Rotate every 5 seconds
    return () => clearInterval(intervalId);
  }, [rotateTestimonials]);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-br from-[#394B5E] to-[#2A313D]  rounded-3xl p-8 relative h-[320px] flex flex-col justify-between">
        <div className="text-white text-lg mb-2 overflow-y-auto">
          {testimonials[activeIndex].content}
        </div>
        <div>
          <div className="flex justify-center items-center space-x-4">
            {/* {testimonials.map((testimonial, index) => (
              // <button
              //   key={testimonial.id}
              //   onClick={() => setActiveIndex(index)}
              //   className={`focus:outline-none transition-all duration-300 ${
              //     index === activeIndex
              //       ? "ring-2 ring-[#394B5E] rounded-[2rem]"
              //       : ""
              //   }`}
              //   aria-label={`View testimonial by ${testimonial.name}`}>
              //   <Image
              //     width={10}
              //     height={10}
              //     src={testimonial.image}
              //     alt={`Profile of ${testimonial.name}`}
              //     className={`rounded-full transition-all duration-300 ${
              //       index === activeIndex ? "w-16 h-16" : "w-12 h-12 opacity-50"
              //     }`}
              //   />
              // </button>
            ))} */}
          </div>
          <div className="text-white text-center">
            {testimonials[activeIndex].name}
          </div>
        </div>
      </div>
    </div>
  );
}
