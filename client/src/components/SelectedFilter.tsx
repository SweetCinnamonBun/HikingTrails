interface SelectedFilterProps {
  label: string;
  onRemove: () => void;
}

const SelectedFilter: React.FC<SelectedFilterProps> = ({ label, onRemove }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 border border-green-300 text-sm">
      <span>{label}</span>
      <button
        type="button"
        onClick={onRemove}
        className="text-gray-600 hover:text-black"
      >
        ✕
      </button>
    </div>
  );
};

export default SelectedFilter;