import {
  Play,
  SkipBack,
  SkipForward,
  Maximize,
  MessageCircle,
  MoreVertical,
} from "lucide-react";
import Image from "next/image";

export default function HowToUseSection() {
  return (
    <section className="bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          HOW TO USE
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Get a hands-on look on how to use the planner, make donations, and
          browse our shop—all in a few easy steps!
        </p>
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-800">
          <Image
            width={20}
            height={20}
            src="/video.svg"
            alt="Video thumbnail of aircraft in the sky"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-white text-lg font-semibold mb-1">
              How to use Faith Planner
            </h3>
            <p className="text-gray-300 text-sm">Illustrative Guide</p>
            <div className="w-full bg-gray-600 rounded-full h-1 mt-2">
              <div
                className="bg-blue-500 h-1 rounded-full"
                style={{ width: "30%" }}></div>
            </div>
            <div className="text-gray-300 text-xs mt-1">09:28 / 0:30:21</div>
          </div>
          <div className="absolute top-4 right-4 flex space-x-2">
            <button className="p-2 bg-gray-800 bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition">
              <Maximize size={20} />
            </button>
            <button className="p-2 bg-gray-800 bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition">
              <MessageCircle size={20} />
            </button>
            <button className="p-2 bg-gray-800 bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition">
              <MoreVertical size={20} />
            </button>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-4">
            <button className="p-4 bg-gray-800 bg-opacity-50 rounded-full text-[#CCFF00] hover:bg-opacity-75 transition">
              <SkipBack size={24} />
            </button>
            <button className="p-6 bg-[#CCFF00] rounded-full text-gray-800 hover:bg-opacity-90 transition">
              <Play size={32} fill="currentColor" />
            </button>
            <button className="p-4 bg-gray-800 bg-opacity-50 rounded-full text-[#CCFF00] hover:bg-opacity-75 transition">
              <SkipForward size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
