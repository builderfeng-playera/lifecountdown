import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const ageSchema = z.object({
  age: z.number().min(0, "Age must be positive").max(120, "Age must be realistic"),
});

type AgeFormData = z.infer<typeof ageSchema>;

interface AgeInputFormProps {
  onSubmit: (age: number) => void;
  isLoading?: boolean;
}

export function AgeInputForm({ onSubmit, isLoading = false }: AgeInputFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AgeFormData>({
    resolver: zodResolver(ageSchema),
  });

  const handleFormSubmit = (data: AgeFormData) => {
    onSubmit(data.age);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your Age
          </label>
          <input
            id="age"
            type="number"
            min="0"
            max="120"
            step="1"
            {...register("age", { valueAsNumber: true })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your age"
          />
          {errors.age && (
            <p className="mt-2 text-sm text-red-600">{errors.age.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-blue-600 py-3 text-lg font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Calculating..." : "Calculate Life Countdown"}
        </button>
      </form>
    </div>
  );
}
