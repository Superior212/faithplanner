import { DashboardLayout } from "@/components/DashboardLayout";
import UserPurchaseTable from "@/components/User-purchase-table";

const page = () => {
  return (
    <DashboardLayout>
      <UserPurchaseTable />
    </DashboardLayout>
  );
};

export default page;
