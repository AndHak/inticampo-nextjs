import clsx from "clsx";

const CustomButton = ({
  id,
  title,
  rightIcon,
  leftIcon,
  containerClass,
  onClick,
  active
}: any) => {

  const activeIcon = <span className="h-1.5 w-1.5 p-1 bg-black rounded-full"/>

  return (
    <div
      id={id}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.(e);
        }
      }}
      className={clsx(
        "group relative z-10 w-full justify-between overflow-hidden rounded-full px-7 py-3 text-black flex items-center border-0",
        active
          ? "font-semibold cursor-default"
          : "cursor-pointer hover:bg-slate-200",
        containerClass
      )}
    >
      {leftIcon}

      <span className="relative inline-flex overflow-hidden font-general text-xl 2xl:text-2xl uppercase">
        <span
          className={clsx(
            "transition duration-500 block",
            active
              ? "translate-y-0 skew-y-0"
              : "translate-y-0 skew-y-0 group-hover:-translate-y-[160%] group-hover:skew-y-12"
          )}
        >
          {title}
        </span>

        {!active && (
          <span className="absolute left-0 top-0 translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0 block">
            {title}
          </span>
        )}
      </span>

      <span
        className={clsx(
          "ml-3 inline-flex items-center transition-all duration-300",
          active
            ? "translate-x-1 animate-pulse"
            : "opacity-0 translate-x-0 group-hover:translate-x-2 group-hover:opacity-100"
        )}
      >
        {active ? activeIcon : rightIcon}
      </span>
    </div>
  );
};

export default CustomButton;
