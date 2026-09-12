import { ReactNode } from "react"

interface ToolShellprops{
    icon:ReactNode;
    title:string;
    subtitle:string
}
export function ToolShell ({icon , title , subtitle}:ToolShellprops){
    return(
        <header className="mt-7 flex items-start gap-3">
            <div className="mt-0.5 text-black">
              {icon}
            </div>
            <div className="min-w-0">
              <h1 className="font-fraunces text-lg text-black font-medium leading-tight text-text-primary tracking-tight">
                {title}
              </h1>
              <p className="font-mono text-black  mt-2 max-w-2xl text-xs leading-5 text-text-secondary">
                {subtitle}
              </p>
            </div>
        </header>
    )
}