import React from 'react';

const CoreMemoryDisplay = ({ coreMemory }) => {
  const { user_core, assistant_core } = coreMemory;

  const renderCoreMemory = core => {
    return Object.entries(core).map(([key, value]) => (
      <div key={key} className="flex gap-2 text-sm md:text-base">
        <strong className="text-gray-600">{key.replace('_', ' ').toUpperCase()}:</strong>
        <span className="text-gray-800">{value}</span>
      </div>
    ));
  };

  return (
    <div className="my-10 w-full lg:w-[60%]">
      <h2 className="md:text-lg font-semibold mb-4">Core Memory</h2>

      <div className="mb-4 flex flex-col md:flex-row items-start justify-between">
        <h3 className="text-sm md:text-lg font-semibold text-primary">User:</h3>
        <div className="w-full md:w-[50%]">{renderCoreMemory(user_core)}</div>
      </div>

      <div className="mb-4 flex flex-col md:flex-row items-start justify-between">
        <h3 className="text-sm md:text-lg font-semibold text-primary">Assistant:</h3>
        <div className="w-full md:w-[50%]">{renderCoreMemory(assistant_core)}</div>
      </div>
    </div>
  );
};

export default CoreMemoryDisplay;
