import { ReviewsPage } from "@/components/ReviewsPage";
import React from "react";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Customer Reviews | Faith Planner",
  description: "See what our customers are saying about Faith Planner",
};

export default function Reviews() {
  const howToUseRef = React.createRef<HTMLDivElement>();
  const homeRef = React.createRef<HTMLDivElement>();

  return (
    <>
      <Navbar howToUseRef={howToUseRef} homeRef={homeRef} />
      <ReviewsPage />;
    </>
  );
}
