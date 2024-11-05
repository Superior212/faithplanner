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
              title="God’s Time"
              description="Dedicate daily moments to spiritual growth through prayer, meditation, Bible reading, and fasting, nurturing a deeper relationship with God."
            />
            <Feature
              title="Growth Tracker"
              description="Note areas of personal and spiritual development, allowing you to see progress in your faith journey over time."
            />
            <Feature
              title="To-Do List"
              description="Organize daily tasks across categories like health, household, and personal goals, keeping life in balance with purpose and intention."
            />
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <div className="w-full container max-w-md aspect-square rounded-3xl relative overflow-hidden">
            <Image
              src="/shape.svg"
              alt="Shape"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority
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
