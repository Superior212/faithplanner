"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserData {
  count: number;
}

interface DonationData {
  count: number;
  notifications: { id: string; message: string; timestamp: string }[];
}

const fetchUserData = async (): Promise<UserData> => {
  const response = await axios.get(
    "https://faithplanner-server.vercel.app/api/details"
  );

  return response.data;
};

const fetchDonationData = async (): Promise<DonationData> => {
  const response = await axios.get(
    "https://faithplanner-server.vercel.app/api/donations"
  );
  return response.data;
};

export default function DashMain() {
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useQuery<UserData>({
    queryKey: ["userData"],
    queryFn: fetchUserData,
  });

  const {
    data: donationData,
    isLoading: donationLoading,
    isError: donationError,
  } = useQuery<DonationData>({
    queryKey: ["donationData"],
    queryFn: fetchDonationData,
  });

  if (userError || donationError)
    return (
      <div className="text-center text-red-500">
        Error fetching dashboard data
      </div>
    );

  return (
    <div className="p-4 space-y-4">
      <h1 className="sm:text-2xl font-bold">Content Statistics</h1>
      <main className="max-w-[50rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard
            title="Number Of Users"
            value={userData?.count}
            color="bg-pink-100"
            isLoading={userLoading}
          />
          <StatCard
            title="Number Of Donations"
            value={donationData?.count}
            color="bg-green-100"
            isLoading={donationLoading}
          />
        </div>
      </main>
      <div className="flex justify-between items-center">
        <h2 className="sm:text-xl font-semibold">Website Analytics</h2>
        <Select defaultValue="today">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <NotificationsCard isLoading={donationLoading} />
    </div>
  );
}

function StatCard({
  title,
  value,
  color,
  isLoading,
}: {
  title: string;
  value?: number;
  color: string;
  isLoading: boolean;
}) {
  return (
    <Card className={`${color} text-center sm:w-96 border-none`}>
      <CardHeader className="flex space-y-0 pb-2">
        <CardTitle className="sm:text-xl font-[700]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-8 w-16 bg-gray-300 animate-pulse rounded"></div>
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  );
}

function NotificationsCard({
  notifications,
  isLoading,
}: {
  notifications?: DonationData["notifications"];
  isLoading: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Notifications</CardTitle>
        <button className="text-sm text-violet-600 hover:underline">
          View All
        </button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <ul className="space-y-2">
            {[...Array(3)].map((_, index) => (
              <li key={index} className="bg-gray-50 p-2 rounded animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-2">
            {notifications?.map((notification) => (
              <li key={notification.id} className="bg-gray-50 p-2 rounded">
                <p className="text-sm">{notification.message}</p>
                <p className="text-xs text-gray-500">
                  {notification.timestamp}
                </p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
