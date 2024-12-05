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
  _id: string;
  name: string;
  email: string;
  heardFrom: {
    source: string;
    details: string;
  };
  churchSelection?: "listed" | "not-listed";
  addForDonations?: boolean;
  churchDetails?: {
    name: string;
    address?: {
      country: string;
      state?: string;
      postalCode: string;
    };
    phoneNumber?: {
      type: string;
      number: string;
    };
  };
}

const apiUrl = "https://faithplanner-server.vercel.app/api/details";

const fetchUserPurchases = async (): Promise<UserPurchase[]> => {
  const response = await axios.get(apiUrl);
  console.log(response.data.data);
  return response.data.data;
};

function UsersTableContent() {
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
                <TableHead className="w-1/5">Name</TableHead>
                <TableHead className="w-1/5 hidden sm:table-cell">
                  Email
                </TableHead>
                <TableHead className="w-1/5 hidden md:table-cell">
                  Heard From
                </TableHead>
                <TableHead className="w-1/5 hidden lg:table-cell">
                  Church Details
                </TableHead>
                <TableHead className="w-1/5 hidden xl:table-cell">
                  Donations
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.length > 0 ? (
                data.map((purchase) => (
                  <TableRow key={purchase._id}>
                    <TableCell className="font-medium">
                      {purchase.name}
                      <div className="sm:hidden text-sm text-muted-foreground">
                        {purchase.email}
                      </div>
                      <div className="md:hidden text-sm text-muted-foreground">
                        {purchase.heardFrom.source}:{" "}
                        {purchase.heardFrom.details}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {purchase.email}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {purchase.heardFrom.source}: {purchase.heardFrom.details}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {purchase.churchDetails ? (
                        <>
                          {purchase.churchDetails.name}
                          {purchase.churchSelection && (
                            <span className="block text-sm text-muted-foreground">
                              ({purchase.churchSelection})
                            </span>
                          )}
                        </>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      {purchase.addForDonations ? (
                        <>
                          Yes
                          {purchase.churchDetails &&
                            purchase.churchDetails.address && (
                              <span className="block text-sm text-muted-foreground">
                                {purchase.churchDetails.address.country},{" "}
                                {purchase.churchDetails.address.state},{" "}
                                {purchase.churchDetails.address.postalCode}
                              </span>
                            )}
                          {purchase.churchDetails &&
                            purchase.churchDetails.phoneNumber && (
                              <span className="block text-sm text-muted-foreground">
                                {purchase.churchDetails.phoneNumber.type}:{" "}
                                {purchase.churchDetails.phoneNumber.number}
                              </span>
                            )}
                        </>
                      ) : (
                        "No"
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow key="no-purchases">
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

export default function UserPurchaseTable() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <UsersTableContent />
    </QueryClientProvider>
  );
}
