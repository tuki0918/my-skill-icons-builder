// Footer component for the Skill Icons Builder

import type React from "react";
import githubIcon from "../assets/github.svg";

const Footer: React.FC = () => {
  return (
    <>
      {/* Attribution */}
      <div className="text-center mt-12">
        <p className="text-gray-500 text-sm">
          Icons provided by{" "}
          <a
            href="https://github.com/tandpfun/skill-icons"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            skill-icons
          </a>
        </p>
      </div>

      {/* GitHub Link */}
      <div className="flex justify-center items-center mt-6">
        <a
          href="https://github.com/tuki0918/my-skill-icons-builder"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        >
          <img
            src={githubIcon}
            alt="GitHub"
            className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
          />
        </a>
      </div>
    </>
  );
};

export default Footer;
