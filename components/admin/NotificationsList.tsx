"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ImSpinner8 } from "react-icons/im";

interface Notification {
  id: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const NotificationsList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get("/api/admin/notifications");
      setNotifications(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await axios.delete(`/api/admin/notifications/${id}`);
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== id)
      );
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <ImSpinner8 className="animate-spin w-7 h-7 mt-[-50px]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-7 max-h-full overflow-y-auto overflow-x-auto ">
      <h1>Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications available</p>
      ) : (
        <Table>
          <TableCaption>List of notifications.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableCell>Message</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Mark as Read</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {notifications.map((notification) => (
              <TableRow key={notification.id} className="">
                <TableCell className="">{notification.message}</TableCell>
                <TableCell>
                  {new Date(notification.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={notification.read}
                    onCheckedChange={() => handleMarkAsRead(notification.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default NotificationsList;
