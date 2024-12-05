import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import React from "react";
import Footer from "@/components/Footer";

export default function AboutAuthor() {
  const howToUseRef = React.createRef<HTMLDivElement>();
  const homeRef = React.createRef<HTMLDivElement>();
  return (
    <>
      <Navbar howToUseRef={howToUseRef} homeRef={homeRef} />
      <main className="mt-[0.1rem] sm:mt-4">
        <div className="min-h-screen bg-white py-4 px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto border border-gray-200 bg-white text-gray-800 shadow-lg">
            <CardContent className="p-6 sm:p-8 md:p-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-[#1A1E23]">
                About the Author
              </h1>
              <div className="grid gap-8 md:grid-cols-[300px,1fr] items-start">
                <div className="mx-auto md:mx-0">
                  <div className="relative w-[280px] h-[340px] rounded-lg overflow-hidden shadow-md">
                    <Image
                      src="/authour.jpeg"
                      alt="Joel Bowden - Author of The Faith Planner Journal"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                <div className="space-y-4 text-base sm:text-lg leading-relaxed">
                  <p>
                    Joel Bowden is a Servant Visionary Entrepreneur who created
                    by inspiration, &quot;The Faith Planner Journal&quot;. He
                    was inspired because of his busy schedule to create a tool
                    to assist with a faith-based life that has many different
                    obligations. The Faith planner is based on a fundamental
                    question. How do I keep God involved in my life with so many
                    things that consume my time?
                  </p>
                  <p>
                    Joel is from the greater Baltimore region. His religious
                    studies are from Lancaster University/Washington School of
                    the Bible, and Baltimore City Community College, he is a
                    real estate investor and owns several small businesses to
                    include,
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4 text-base sm:text-lg leading-relaxed">
                <p>
                  The Financial Learning Foundation Inc., an economic
                  development nonprofit organization assisting consumers with
                  all things credit and finances. He has over 25 years of
                  financial working experience in the areas of banking and
                  finance, credit counseling, debt negotiation, personal and
                  commercial loan structuring, corporate business setup and
                  creative financing.
                </p>
                <p>
                  Powerhouse Contractors (a home improvement company), Highest
                  Refund (a tax brokerage firm), The United National Investments
                  Training (a real estate investment school), Easy Money
                  Brokers(An alternative to hard money lending) and a few
                  others.
                </p>
                <p>
                  In his spare time (little as it is) Joel loves to read books
                  on self-development. He loves Problem-solving, traveling,
                  chess, cooking and fashion.
                </p>
                <p>
                  Joel has two daughters Trinity and Grace and he is currently
                  writing his first book.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
