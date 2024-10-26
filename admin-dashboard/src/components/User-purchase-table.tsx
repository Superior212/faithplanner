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

interface UserPurchase {
  id: string;
  name: string;
  email: string;
  product: string;
  purchaseDate: string;
}

const userPurchases: UserPurchase[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    product: "Smartphone X",
    purchaseDate: "2023-10-01",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    product: "Laptop Z",
    purchaseDate: "2023-09-21",
  },
  {
    id: "3",
    name: "Carol Lee",
    email: "carol.lee@example.com",
    product: "Tablet Y",
    purchaseDate: "2023-09-15",
  },
];

export default function UserPurchaseTable() {
  const handleEdit = (id: string) => {
    console.log(`Edit user with id: ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete user with id: ${id}`);
  };

  const handleAddNewUser = () => {
    console.log("Add new user");
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-2xl font-bold">
          User Purchase Details
        </CardTitle>
        <Button onClick={handleAddNewUser}>Add New User</Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] text-xl">User Name</TableHead>
                <TableHead className="hidden md:table-cell text-xl">
                  Email
                </TableHead>
                <TableHead className="hidden sm:table-cell text-xl">
                  Product
                </TableHead>
                <TableHead className="hidden lg:table-cell text-xl">
                  Purchase Date
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userPurchases.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell className="font-medium text-base">
                    {purchase.name}
                    <div className="md:hidden ">{purchase.email}</div>
                    <div className="sm:hidden text-muted-foreground">
                      {purchase.product}
                    </div>
                    <div className="lg:hidden  text-muted-foreground">
                      {purchase.purchaseDate}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell sm:text-base">
                    {purchase.email}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell sm:text-base">
                    {purchase.product}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell sm:text-base">
                    {purchase.purchaseDate}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(purchase.id)}>
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(purchase.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
