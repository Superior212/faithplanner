import Image from "next/image";

export default function CoreFeatures() {
  return (
    <section className="hsection py-16  bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 mb-12 lg:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            CORE FEATURES
          </h2>
          <div className="space-y-8">
            <Feature
              title="Interactive Calendar"
              description="An embedded interactive calendar allowing you to view and subscribe to upcoming events and programs"
            />
            <Feature
              title="Event Filters"
              description="Filter events by categories like Services, Group, Outreach, Study, and more"
            />
            <Feature
              title="Event Details Pop-up"
              description="you can view details about the event, including time, location, and a brief description"
            />
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <div className="w-full max-w-md aspect-square rounded-3xl relative overflow-hidden">
            <Image
              src="/shape.svg"
              alt="Shape"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
