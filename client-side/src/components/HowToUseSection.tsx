

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

        {/* Video Container */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-800">
          <video
            src="/planner.mp4"
            controls
            className="w-full h-full object-cover rounded-2xl">
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
