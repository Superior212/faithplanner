import * as React from "react";

function Arrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 34 34" fill="none" {...props}>
      <path
        d="M11.137 22.834l11.667-11.668M13.258 11.166h9.546v9.546"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoArrow = React.memo(Arrow);
export default MemoArrow;
