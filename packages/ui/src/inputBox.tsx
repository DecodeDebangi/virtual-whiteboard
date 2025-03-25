import { type JSX } from "react";

export const InputBox = ({
  type,
  placeholder,
  labelText,
  reference,
  options = [],
}: {
  placeholder?: string;
  labelText: string;
  type?: string;
  reference: any;
  options?: { value: string; label: string }[];
}): JSX.Element => {
  return (
    <div className='flex flex-col gap-1'>
      <label className='text-sm font-medium text-gray-700'>{labelText}</label>
      {(type === "text" || type === "password") && (
        <input
          ref={reference}
          type={type}
          placeholder={placeholder}
          className='px-4 py-2 outline-slate-500 rounded-lg border border-gray-300 focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 text-sm'></input>
      )}
      {type === "textarea" && (
        <textarea
          ref={reference}
          placeholder={placeholder}
          className='px-4 py-2 outline-slate-500 rounded-lg border border-gray-300 focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 text-sm'
          rows={4}
          cols={50}></textarea>
      )}
      {type === "select" && (
        <select
          ref={reference}
          className='px-4 py-2 outline-slate-500 rounded-lg border border-gray-300 focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 text-sm'>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
