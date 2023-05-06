import Link from "next/link";
export const Header = () => {
  return (
    <nav
      className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div className="flex lg:flex-1">TEDxUTsukuba new HP</div>
      <div className="hidden lg:flex lg:gap-x-12">
        <Link
          href="/partners"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          partners
        </Link>
        <Link
          href="/talks"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          talks
        </Link>
      </div>
    </nav>
  );
};
