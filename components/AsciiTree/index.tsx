"use client";

import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

// Top clouds - static
const topClouds = `                                        ~~~ ~~~ ~~~
                                    ~~~ ~~~ ~~~ ~~~ ~~~
                                  ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
                                ~~~ ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
                                  ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
                                    ~~~ ~~~ ~~~ ~~~ ~~~`;

// Branches and foliage - animated sway
const branches = `                                                 .
                                              .         ;
                 .              .              ;%     ;;
                   ,           ,                :;%  %;
                    :         ;                   :;%;'     .,
           ,.        %;     %;            ;        %;'    ,;
             ;       ;%;  %%;        ,     %;    ;%;    ,%'
              %;       %;%;      ,  ;       %;  ;%;   ,%;'
               ;%;      %;        ;%;        % ;%;  ,%;'
                \`%;.     ;%;     %;'         \`;%%;.%;'
                 \`:;%.    ;%%. %@;        %; ;@%;%'
                    \`:%;.  :;bd%;          %;@%;'
                      \`@%:.  :;%.         ;@@%;'
                        \`@%.  \`;@%.      ;@@%;
                          \`@%%. \`@%%    ;@@%;
                            ;@%. :@%%  %@@%;`;

// Trunk base - static
const trunkBase = `                              %@bd%%%bd%%:;
                                #@%%%%%:;;
                                %@@%%%::;
                                %@@@%(o);  . '
                                %@@@o%;:(.,'
                            \`.. %@@@o%::;
                               \`)@@@o%::;
                                %@@(o)::;
                               .%@@@@%::;
                               ;%@@@@%::;.
                              ;%@@@@%%:;;;.
                          ...;%@@@@@%%:;;;;,..`;

// Bottom puddles - static
const bottomPuddles = `
              ~~~ ~~~ ~~~                         ~~~ ~~~ ~~~
           ~~~ ~~~ ~~~ ~~~                     ~~~ ~~~ ~~~ ~~~
         ~~~ ~~~ ~~~ ~~~ ~~~                 ~~~ ~~~ ~~~ ~~~ ~~~
           ~~~ ~~~ ~~~ ~~~                     ~~~ ~~~ ~~~ ~~~
              ~~~ ~~~ ~~~                         ~~~ ~~~ ~~~`;

const fontStyle = {
  fontFamily:
    'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
};

// Generate random wind gust parameters
const getRandomWind = () => ({
  rotate: (Math.random() - 0.5) * 6, // -3 to 3 degrees
  skewX: (Math.random() - 0.5) * 4,  // -2 to 2 degrees
  x: (Math.random() - 0.5) * 8,      // -4 to 4 pixels
  duration: 2 + Math.random() * 3,   // 2-5 seconds
});

export default function AsciiTreeBackground() {
  const controls = useAnimationControls();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const animateWind = async () => {
      while (true) {
        const wind = getRandomWind();

        await controls.start({
          rotate: wind.rotate,
          skewX: wind.skewX,
          x: wind.x,
          transition: {
            duration: wind.duration,
            ease: "easeInOut",
          },
        });

        // Sometimes pause briefly (like a lull in the wind)
        if (Math.random() > 0.7) {
          await new Promise((resolve) =>
            setTimeout(resolve, 500 + Math.random() * 1000)
          );
        }
      }
    };

    animateWind();
  }, [controls, isClient]);

  return (
    <div
      className="fixed inset-y-0 left-0 w-1/3 pointer-events-none hidden md:flex items-center justify-center overflow-hidden z-0 will-change-transform -translate-x-[150px]"
      aria-hidden="true"
    >
      <div className="flex flex-col">
        {/* Top clouds - static */}
        <pre
          className="font-mono text-accent/25 text-[12px] leading-[1.1] whitespace-pre select-none"
          style={fontStyle}
        >
          {topClouds}
        </pre>

        {/* Branches - animated wind sway from bottom */}
        <motion.pre
          className="font-mono text-accent/25 text-[12px] leading-[1.1] whitespace-pre select-none"
          style={{
            ...fontStyle,
            transformOrigin: "bottom center",
          }}
          animate={controls}
          initial={{ rotate: 0, skewX: 0, x: 0 }}
        >
          {branches}
        </motion.pre>

        {/* Trunk base - static */}
        <pre
          className="font-mono text-accent/25 text-[12px] leading-[1.1] whitespace-pre select-none"
          style={fontStyle}
        >
          {trunkBase}
        </pre>

        {/* Bottom puddles - static */}
        <pre
          className="font-mono text-accent/25 text-[12px] leading-[1.1] whitespace-pre select-none"
          style={fontStyle}
        >
          {bottomPuddles}
        </pre>
      </div>
    </div>
  );
}
