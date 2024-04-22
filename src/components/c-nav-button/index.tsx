import { cn } from '@/utils/styles.utils';
import * as S from './style';

interface Props {
  title: string;
  icon: React.ReactElement;
  isActive: Boolean;
  clickEvent?: () => void;
}

export default function CNavButton({ title, icon, isActive, clickEvent }: Props) {
  const state = isActive ? 'isActive' : 'default';

  return (
    <button
      className={cn(S.navButtonVariants({ background: state, border: state }))}
      onClick={() => {
        if (clickEvent) clickEvent();
      }}
    >
      <div>{icon}</div>
      <p className="text-14">{title}</p>
    </button>
  );
}
