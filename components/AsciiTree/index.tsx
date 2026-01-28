"use client";

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

export default function AsciiTreeBackground() {
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

        {/* Branches - animated sway from bottom */}
        <pre
          className="font-mono text-accent/25 text-[12px] leading-[1.1] whitespace-pre select-none animate-branch-sway origin-bottom"
          style={fontStyle}
        >
          {branches}
        </pre>

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
