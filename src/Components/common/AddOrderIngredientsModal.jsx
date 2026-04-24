/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import FormModal from "./FormModal";
import Button from "./Button";

const UNITS = ["kg", "g", "L", "mL", "pcs"];

const emptyRow = () => ({
  ingredient: "",
  quantity: "",
  unit: "g",
  category: "Other",
});

/**
 * Modal for adding (or editing) ingredients that apply only to a specific
 * order/session. Rows returned contain: { ingredient, quantity, unit, category }.
 */
function AddOrderIngredientsModal({
  isOpen,
  onClose,
  dishName,
  sessionLabel,
  initialRows,
  onSave,
  mode = "add",
}) {
  const [rows, setRows] = useState([emptyRow()]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRows(
        initialRows && initialRows.length > 0
          ? initialRows.map((r) => ({ ...r }))
          : [emptyRow()]
      );
      setSaving(false);
    }
  }, [isOpen, initialRows]);

  if (!isOpen) return null;

  const updateRow = (idx, changes) =>
    setRows((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, ...changes } : r))
    );
  const addRow = () => setRows((prev) => [...prev, emptyRow()]);
  const removeRow = (idx) =>
    setRows((prev) => prev.filter((_, i) => i !== idx));

  const handleSave = async () => {
    const valid = rows
      .map((r) => ({
        ingredient: String(r.ingredient || "").trim(),
        quantity: String(r.quantity ?? "").trim(),
        unit: r.unit || "g",
        category: String(r.category || "").trim() || "Other",
      }))
      .filter((r) => r.ingredient && r.quantity);
    if (valid.length === 0) return;
    setSaving(true);
    try {
      await onSave(valid);
    } finally {
      setSaving(false);
    }
  };

  const title =
    mode === "edit"
      ? `Edit Ingredients for "${dishName}"`
      : `Add Ingredients for "${dishName}"`;

  return (
    <FormModal
      isOpen={isOpen}
      onClose={saving ? () => {} : onClose}
      closeDisabled={saving}
      title={title}
      subtitle={
        sessionLabel
          ? `Session: ${sessionLabel} • applies only to this order`
          : "Applies only to this order"
      }
      widthClass="max-w-2xl"
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} loading={saving}>
            {mode === "edit" ? "Save Changes" : "Add Ingredients"}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row gap-2 p-3 border border-gray-100 rounded-lg bg-gray-50/50"
          >
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-1">
                Ingredient
              </label>
              <input
                type="text"
                value={row.ingredient}
                onChange={(e) =>
                  updateRow(idx, { ingredient: e.target.value })
                }
                placeholder="e.g. Turmeric"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
              />
            </div>
            <div className="w-full sm:w-24">
              <label className="block text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-1">
                Qty
              </label>
              <input
                type="number"
                step="any"
                min="0"
                value={row.quantity}
                onChange={(e) =>
                  updateRow(idx, { quantity: e.target.value })
                }
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
              />
            </div>
            <div className="w-full sm:w-24">
              <label className="block text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-1">
                Unit
              </label>
              <select
                value={row.unit}
                onChange={(e) => updateRow(idx, { unit: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[var(--color-primary)]"
              >
                {UNITS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full sm:w-32">
              <label className="block text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-1">
                Category
              </label>
              <input
                type="text"
                value={row.category}
                onChange={(e) =>
                  updateRow(idx, { category: e.target.value })
                }
                placeholder="Other"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
            {rows.length > 1 && (
              <button
                type="button"
                onClick={() => removeRow(idx)}
                className="self-end sm:self-center p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                title="Remove row"
              >
                <FiTrash2 size={16} />
              </button>
            )}
          </div>
        ))}
        <div>
          <Button
            variant="soft"
            size="sm"
            onClick={addRow}
            leftIcon={<FiPlus size={14} />}
          >
            Add another ingredient
          </Button>
        </div>
        <p className="text-[11px] text-gray-400 mt-1">
          These ingredients will be saved only for this order. Your global recipe
          list is not affected.
        </p>
      </div>
    </FormModal>
  );
}

export default AddOrderIngredientsModal;
