import React from "react";

interface LogoProps {
  color?: string;
  size?: string;
  className?: string;
}
const Logo = (props: LogoProps) => {
  return (
    <svg
      className={props.className}
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 200.000000 200.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
        fill={props.color}
        stroke="none"
      >
        <path
          d="M859 1564 c-314 -537 -355 -609 -414 -719 -29 -55 -139 -251 -243
   -435 l-189 -335 980 -3 c539 -1 982 0 984 2 3 2 -19 45 -49 95 l-53 91 -189 2
   -190 3 -95 162 c-90 154 -97 163 -126 163 -28 -1 -35 -10 -119 -155 -49 -85
   -92 -155 -95 -155 -4 0 -47 70 -97 155 -83 145 -91 155 -119 155 -28 0 -36 -9
   -125 -163 l-95 -162 -58 -3 c-31 -2 -57 0 -57 4 0 4 53 104 117 221 l118 213
   264 0 265 0 -29 30 -29 30 -251 0 -251 0 -133 -232 c-74 -128 -141 -241 -149
   -250 -11 -13 -30 -18 -69 -18 -29 0 -53 2 -53 5 0 3 30 53 66 112 65 105 235
   391 364 613 181 310 321 545 329 553 6 6 20 -7 36 -34 14 -24 106 -179 203
   -344 l178 -300 107 -3 107 -3 -66 112 c-35 61 -79 137 -96 168 -47 85 -450
   775 -458 784 -3 4 -103 -157 -221 -359z m70 -1149 c45 -80 81 -148 81 -150 0
   -3 -74 -5 -165 -5 -91 0 -165 3 -165 7 0 12 158 293 165 293 2 0 40 -65 84
   -145z m441 -16 c39 -70 70 -129 70 -133 0 -3 -74 -6 -165 -6 -91 0 -165 2
   -165 5 0 2 37 71 82 151 74 133 83 145 95 128 7 -10 45 -75 83 -145z"
        />
        <path
          d="M918 1121 c-71 -121 -128 -222 -128 -225 0 -3 81 -6 180 -6 177 0
   180 0 168 20 -11 17 -26 20 -140 22 l-127 3 106 190 c58 105 108 196 110 203
   3 7 -4 12 -18 12 -21 0 -43 -32 -151 -219z"
        />
      </g>
    </svg>
  );
};

export default Logo;
