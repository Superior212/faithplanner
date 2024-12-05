"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContactMessages } from "@/lib/api-service";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  reason: string;
  message: string;
  createdAt: string;
}

export function ContactTable() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await getContactMessages();
      setMessages(data.data.messages);
      setError(null);
    } catch (error) {
      setError("Failed to fetch contact messages. Please try again.");
      console.error("Error fetching contact messages:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/5">Name</TableHead>
                <TableHead className="w-1/5">Email</TableHead>
                <TableHead className="w-1/5">Reason</TableHead>
                <TableHead className="w-1/5">Message</TableHead>
                <TableHead className="w-1/5">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message) => (
                <TableRow key={message._id}>
                  <TableCell>{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>{message.reason}</TableCell>
                  <TableCell>{message.message}</TableCell>
                  <TableCell>
                    {new Date(message.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
