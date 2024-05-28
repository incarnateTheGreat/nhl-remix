export default function Footer() {
  return (
    <footer>
      <span className="flex w-full items-center font-semibold lg:mx-auto lg:w-[1280px]">
        &copy; {new Date().getFullYear()} NHL Scores Inc.
      </span>
    </footer>
  );
}
