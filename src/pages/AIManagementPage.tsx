import React from 'react';

const AIManagementPage: React.FC = () => {
  return (
    <div className="-m-8 h-[calc(100vh-72px)] overflow-hidden bg-slate-50">
      <iframe
        src="/ai-management/index.html"
        title="AI Management System"
        className="w-full h-full border-none"
      />
    </div>
  );
};

export default AIManagementPage;
