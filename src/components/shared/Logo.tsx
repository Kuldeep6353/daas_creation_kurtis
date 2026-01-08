import daasLogo from "@/assets/daas-logo.png";

interface LogoProps {
  showText?: boolean;
  className?: string;
  imageClassName?: string;
  textClassName?: string;
}

export function Logo({ 
  showText = true, 
  className = "",
  imageClassName = "h-12 w-auto",
  textClassName = ""
}: LogoProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <img 
        src={daasLogo} 
        alt="DAAS Creation Kurtis Logo" 
        className={imageClassName}
      />
      {showText && (
        <div className={`flex flex-col items-center ${textClassName}`}>
          <span className="text-xl lg:text-2xl font-heading font-bold text-primary tracking-wide">
            DAAS CREATION
          </span>
          <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
            Kurtis
          </span>
        </div>
      )}
    </div>
  );
}
