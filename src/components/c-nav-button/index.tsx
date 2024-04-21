import { cn } from "@/utils/styles.utils";
import { cva } from "class-variance-authority";

interface Props {
  title: string;
  icon: React.ReactElement;
  isActive: Boolean;
  clickEvent?: () => void;
}



export default function CNavButton({ title, icon, isActive, clickEvent }: Props) {
  const state = isActive ? "isActive": "default"

  return (
      <button
        className={cn(navButtonVariants({background: state, border: state}))}
        onClick={() => {
          if (clickEvent) clickEvent();
        }}
      >
        <div>{icon}</div>
        <p className="text-14">{title}</p>
      </button>
    
  );
}

const navButtonVariants = cva(
  "flex h-60 w-120 flex-col items-center justify-center gap-4 border-solid border-[#ced9db]", {
    variants: {
      background: {
        default: "bg-neutral-bg05",
        isActive: "bg-white",
      },
      border: {
        default: "border-2",
        isActive: "border-t-0"
      }
    }
  }
)