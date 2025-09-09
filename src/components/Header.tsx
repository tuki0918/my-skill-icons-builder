import type React from "react";

const Header: React.FC = () => {
  return (
    <div className="text-center mt-12 mb-16">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
        Skill Icons Builder
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Select icons to showcase your skills. Easily paste them into your
        portfolio.
      </p>
    </div>
  );
};

export default Header;
