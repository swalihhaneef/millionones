import * as React from "react";
import Select from "react-select";
import { cn } from "@/lib/utils";

const ReactSelect = React.forwardRef(({ className, error, ...props }, ref) => {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: "36px",
      fontSize: "0.875rem",
      backgroundColor: "transparent",
      borderColor: error ? "#f87171" : "#d1d5db", // red-500 or gray-300
      boxShadow: state.isFocused ? `0 0 0 1px ${error ? "#f87171" : "#3b82f6"}` : "none",
      "&:hover": {
        borderColor: error ? "#f87171" : "#3b82f6",
      },
    }),
    menu: (base) => ({
      ...base,
      fontSize: "0.875rem",
      zIndex: 20,
    }),
  };

  return (
    <div className="w-full">
      <Select ref={ref} className={cn("react-select-container", className)} classNamePrefix="react-select" styles={customStyles} {...props} />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});

ReactSelect.displayName = "ReactSelect";

export { ReactSelect };
