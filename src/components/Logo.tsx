import { WrenchIcon } from '@heroicons/react/24/outline';

export default function Logo() {
  return (
    <div className="font-extrabold">
      <span className="font-cal-sanss text-primary text-3xl me-1">
        Pesatools
      </span>
      <span className=" bg-primary inline-flex items-center justify-center size-8 text-white rounded-lg">
        <WrenchIcon className="size-5" />
      </span>
    </div>
  );
}
