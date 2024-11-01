export default function SiteFooter() {
  return (
    <footer className="border-none bg-black">
      <span className="flex w-full items-center text-xs font-semibold text-white lg:mx-auto">
        &copy; {new Date().getFullYear()} NHL Scores Inc.
      </span>
    </footer>
  );
}
