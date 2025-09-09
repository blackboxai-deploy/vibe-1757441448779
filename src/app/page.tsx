import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Calculator
          </h1>
          <p className="text-gray-600">
            Simple arithmetic calculator with basic operations
          </p>
        </div>
        <Calculator />
      </div>
    </div>
  );
}