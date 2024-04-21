interface Props {
  title: string;
  icon: React.ReactElement;
  isActive: Boolean;
  clickEvent?: () => void;
}

export default function CNavButton({ title, icon, isActive, clickEvent }: Props) {
  return (
    <>
      <button
        className={`flex h-60 w-120 flex-col items-center justify-center gap-4 ${isActive ? 'bg-white' : 'bg-neutral-bg05'} border-solid ${isActive ? 'border-t-0' : 'border-2'} border-[#ced9db]`}
        onClick={() => {
          if (clickEvent) clickEvent();
        }}
      >
        <div>{icon}</div>
        <p className="text-14">{title}</p>
      </button>
    </>
  );
}
