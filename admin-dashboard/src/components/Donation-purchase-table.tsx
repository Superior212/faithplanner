"use client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Donations {
  _id: string;
  name: string;
  email: string;
  notes: string;
  organization: string;
}

const apiUrl = "https://faithplanner-server.vercel.app/api/donations";

const fetchUserPurchases = async (): Promise<Donations[]> => {
  const response = await axios.get(apiUrl);
  return response.data.data;
};

function DonationsTableContent() {
  const { data, isLoading, isError } = useQuery<Donations[]>({
    queryKey: ["donations"],
    queryFn: fetchUserPurchases,
  });

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-8 w-[200px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card className="w-full">
        <CardContent>
          <p className="text-center text-red-500">
            Error loading user purchases. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-2xl font-bold">Donations Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Organization
                </TableHead>
                <TableHead className="hidden lg:table-cell">Note</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length > 0 ? (
                data.map((donation) => (
                  <TableRow key={donation._id}>
                    <TableCell className="font-medium">
                      {donation.name}
                      <div className="md:hidden text-sm text-muted-foreground">
                        {donation.email}
                      </div>
                      <div className="sm:hidden text-sm text-muted-foreground">
                        {donation.organization}
                      </div>
                      <div className="lg:hidden text-sm text-muted-foreground">
                        {donation.notes}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {donation.email}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {donation.organization}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {donation.notes}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No user purchases found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

const queryClient = new QueryClient();

export default function UserPurchaseTable() {
  return (
    <QueryClientProvider client={queryClient}>
      <DonationsTableContent />
    </QueryClientProvider>
  );
}
