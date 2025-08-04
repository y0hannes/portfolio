const Info = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Let's Work Together
      </h3>
      <p className="text-gray-600 mb-6 max-w-md">
        I'm always interested in new opportunities and exciting projects.
        Whether you have a question or just want to say hi, I'll try my best
        to get back to you!
      </p>

      <ul className="text-gray-700 mb-6 space-y-4">
        <li className="flex items-center gap-3">
          <i className="ri-mail-line text-lg"></i>
          your.email@example.com
        </li>
        <li className="flex items-center gap-3">
          <i className="ri-phone-line text-lg"></i>
          +* (***) ***-****
        </li>
        <li className="flex items-centecenterr gap-3">
          <i className="ri-map-pin-line text-lg"></i>
          Addis Abeba, Ethiopia
        </li>
      </ul>

      <div className="flex gap-3">
        <a
          href="https://github.com/y0hannes/"
          className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md transition"
          aria-label="GitHub"
        >
          <i className="ri-github-line text-xl text-gray-700"></i>
        </a>
        <a
          href="https://linkedin/in/yohannes-muluken/"
          className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md transition"
          aria-label="LinkedIn"
        >
          <i className="ri-linkedin-box-line text-xl text-gray-700"></i>
        </a>
      </div>
    </div>

  )
}

export default Info