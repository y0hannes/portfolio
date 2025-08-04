const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-12 border-b border-gray-200 bg-gray-200 sticky top-0 z-50">
      <div className="font-bold text-xl">Portfolio</div>
      <nav>
        <ul className="flex gap-8 list-none">
          <li>
            <a
              href="#about"
              className="text-gray-800 font-medium no-underline hover:text-black"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="text-gray-800 font-medium no-underline hover:text-black"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#skills"
              className="text-gray-800 font-medium no-underline hover:text-black"
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-gray-800 font-medium no-underline hover:text-black"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
