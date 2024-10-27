"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface User {
  email: string;
  password: string;
  accessLevel: "Super Admin" | "Admin" | "Content Manager";
}

const initialUsers: User[] = [
  {
    email: "jaysmith@gmail.com",
    password: "************",
    accessLevel: "Super Admin",
  },
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<User>({
    email: "",
    password: "",
    accessLevel: "Content Manager",
  });

  const togglePasswordVisibility = (email: string) => {
    setShowPassword((prev) => ({ ...prev, [email]: !prev[email] }));
  };

  const handleAccessLevelChange = (
    email: string,
    newLevel: User["accessLevel"]
  ) => {
    setUsers(
      users.map((user) =>
        user.email === email ? { ...user, accessLevel: newLevel } : user
      )
    );
  };

  const handleAddNewUser = () => {
    setUsers([...users, newUser]);
    setNewUser({ email: "", password: "", accessLevel: "Content Manager" });
    setIsAddUserModalOpen(false);
  };

  return (
    <Card className="w-full max-w-[70rem] mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-2xl font-bold">User Management</CardTitle>
        <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
          <DialogTrigger asChild>
            <Button>Add New User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Access Level</Label>
                <RadioGroup
                  defaultValue={newUser.accessLevel}
                  onValueChange={(value) =>
                    setNewUser({
                      ...newUser,
                      accessLevel: value as User["accessLevel"],
                    })
                  }
                  className="col-span-3">
                  {["Super Admin", "Admin", "Content Manager"].map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <RadioGroupItem value={level} id={`new-user-${level}`} />
                      <Label htmlFor={`new-user-${level}`}>{level}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
            <Button onClick={handleAddNewUser}>Add User</Button>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">User Email</TableHead>
                <TableHead className="w-[150px]">Password</TableHead>
                <TableHead>Access level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.email}>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono">
                        {showPassword[user.email]
                          ? user.password
                          : "•".repeat(12)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => togglePasswordVisibility(user.email)}>
                        {showPassword[user.email] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          Toggle password visibility
                        </span>
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <RadioGroup
                      defaultValue={user.accessLevel}
                      onValueChange={(value) =>
                        handleAccessLevelChange(
                          user.email,
                          value as User["accessLevel"]
                        )
                      }
                      className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4">
                      {["Super Admin", "Admin", "Content Manager"].map(
                        (level) => (
                          <div
                            key={level}
                            className="flex items-center space-x-2">
                            <RadioGroupItem
                              value={level}
                              id={`${user.email}-${level}`}
                            />
                            <Label htmlFor={`${user.email}-${level}`}>
                              {level}
                            </Label>
                          </div>
                        )
                      )}
                    </RadioGroup>
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
