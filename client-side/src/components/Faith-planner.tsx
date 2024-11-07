import {

  CardContent,

  CardHeader,

} from "@/components/ui/card";

export default function FaithPlanner() {
  return (
    <div className="max-w-2xl mx-auto">
      <CardHeader>
        <h1 className="text-[#1A1E23] text-3xl sm:text-4xl md:text-[3rem] font-bold sm:leading-tight ">
          What is the Faith Planner?
        </h1>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          The Faith Planner is a schedule planner and journal tool that gives
          you features to assist with a faith-based life that has many different
          obligations. The Faith planner is based on a fundamental question. How
          do I keep God involved in my life with so many things that consume my
          time?
        </p>
        <div>
          <p className="font-[700] text-xl">Look no further for this answer!</p>
        </div>
      </CardContent>
    </div>
  );
}
