import React from "react";

const IdInput = ({ lavel, id, setId }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="userId"
        className="block text-sm font-medium text-gray-700"
      >
        {lavel}
      </label>
      <input
        type="text"
        id="userId"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        placeholder="Enter your ID"
      />
    </div>
  );
};

export default IdInput;
