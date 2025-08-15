import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "~/trpc/react";
import toast from "react-hot-toast";
import { AgeInputForm } from "~/components/AgeInputForm";
import { LifeCountdownDisplay } from "~/components/LifeCountdownDisplay";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [age, setAge] = useState<number | null>(null);
  const trpc = useTRPC();

  const lifeMetricsQuery = useQuery(
    trpc.calculateLifeMetrics.queryOptions(
      { age: age! },
      {
        enabled: age !== null,
        retry: false,
      }
    )
  );

  useEffect(() => {
    if (age !== null) {
      if (lifeMetricsQuery.isLoading) {
        toast.loading("Calculating your life metrics...", { id: 'life-metrics' });
      } else if (lifeMetricsQuery.isSuccess) {
        toast.success("Calculation complete!", { id: 'life-metrics' });
      } else if (lifeMetricsQuery.isError) {
        toast.error(lifeMetricsQuery.error?.message || "Failed to calculate metrics", { id: 'life-metrics' });
      }
    }
  }, [age, lifeMetricsQuery.isLoading, lifeMetricsQuery.isSuccess, lifeMetricsQuery.isError, lifeMetricsQuery.error]);

  const handleAgeSubmit = async (submittedAge: number) => {
    setAge(submittedAge);
  };

  const handleReset = () => {
    setAge(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Life Countdown ⏰
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how many heartbeats and breaths you have left based on your age. 
            A gentle reminder to make every moment count.
          </p>
        </div>

        {!age && (
          <AgeInputForm 
            onSubmit={handleAgeSubmit} 
            isLoading={lifeMetricsQuery.isLoading}
          />
        )}

        {age && lifeMetricsQuery.isLoading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Calculating your life metrics...</p>
          </div>
        )}

        {age && lifeMetricsQuery.isError && (
          <div className="text-center max-w-md mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-800 mb-4">
                {lifeMetricsQuery.error?.message || "An error occurred while calculating your metrics."}
              </p>
              <button
                onClick={handleReset}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {age && lifeMetricsQuery.isSuccess && (
          <div className="space-y-8">
            <LifeCountdownDisplay metrics={lifeMetricsQuery.data} />
            <div className="text-center">
              <button
                onClick={handleReset}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Calculate for Different Age
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
