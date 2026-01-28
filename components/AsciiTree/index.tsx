"use client";

const treeArt = `
                                        ~~~ ~~~ ~~~
                                    ~~~ ~~~ ~~~ ~~~ ~~~
                                  ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
                                ~~~ ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
                                  ~~~ ~~~ ~~~ ~~~ ~~~ ~~~
                                    ~~~ ~~~ ~~~ ~~~ ~~~
                                                 .
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
                            ;@%. :@%%  %@@%;
                              %@bd%%%bd%%:;
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
                          ...;%@@@@@%%:;;;;,..

              ~~~ ~~~ ~~~                         ~~~ ~~~ ~~~
           ~~~ ~~~ ~~~ ~~~                     ~~~ ~~~ ~~~ ~~~
         ~~~ ~~~ ~~~ ~~~ ~~~                 ~~~ ~~~ ~~~ ~~~ ~~~
           ~~~ ~~~ ~~~ ~~~                     ~~~ ~~~ ~~~ ~~~
              ~~~ ~~~ ~~~                         ~~~ ~~~ ~~~
`;

export default function AsciiTreeBackground() {
  return (
    <div
      className="fixed inset-y-0 left-0 w-1/3 pointer-events-none hidden md:flex items-center justify-center overflow-hidden z-0 will-change-transform -translate-x-[150px]"
      aria-hidden="true"
    >
      <pre
        className="font-mono text-accent/25 text-[12px] leading-[1.1] whitespace-pre select-none animate-branch-sway origin-bottom"
        style={{
          fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
        }}
      >
        {treeArt}
      </pre>
    </div>
  );
}
