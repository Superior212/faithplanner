import { DashboardLayout } from "@/components/DashboardLayout";

const Donations = () => {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Donations</h1>
        <p className="mt-2 text-sm text-gray-600">
          List of all donations made by users.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Donations;
