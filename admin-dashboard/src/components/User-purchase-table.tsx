"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

interface UserPurchase {
  id: string;
  name: string;
  email: string;
  phone: string;
  heardFrom: string;
}

const apiUrl = "https://faithplanner-server.vercel.app/api/details";

const fetchUserPurchases = async (): Promise<UserPurchase[]> => {
  const response = await axios.get(apiUrl);
  return response.data.data;
};

function DonationsTableContent() {
  const { data, isLoading, isError } = useQuery<UserPurchase[]>({
    queryKey: ["purchase"],
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
        <CardTitle className="text-2xl font-bold">
          User Purchase Details
        </CardTitle>
        <Button>Export</Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Name</TableHead>
                <TableHead className="hidden sm:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead className="hidden lg:table-cell">
                  Heard From
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length > 0 ? (
                data.map((purchase) => (
                  <TableRow key={purchase.id}>
                    <TableCell className="font-medium">
                      {purchase.name}
                      <div className="sm:hidden text-sm text-muted-foreground">
                        {purchase.email}
                      </div>
                      <div className="md:hidden text-sm text-muted-foreground">
                        {purchase.phone}
                      </div>
                      <div className="lg:hidden text-sm text-muted-foreground">
                        {purchase.heardFrom}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {purchase.email}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {purchase.phone}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {purchase.heardFrom}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
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

export default function UserPurchaseTable() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <DonationsTableContent />
    </QueryClientProvider>
  );
}
