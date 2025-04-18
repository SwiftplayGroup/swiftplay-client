"use client";

import { useEffect, useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import User from "~/api/User";
import Permission from "~/api/Permission";
import { Skeleton } from "~/components/ui/skeleton";

export default function PermissionDialog({user}: {user: User}) {

  const [defaultPermissions, setDefaultPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {

    (async () => {

      try {

        const defaultPermissions = await Permission.find();
        setDefaultPermissions(defaultPermissions);

      } catch (error) {

        console.error(error);

      }

      setIsLoading(false);

    })();

  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <Button type="button">Change permissions</Button>
      </DialogTrigger>
      <DialogContent style={{maxWidth: "1080px"}}>
        <DialogHeader>
          <DialogTitle>{user.username}'s permissions</DialogTitle>
          <DialogDescription>
            You can view or set {user.username}'s website permissions here.
          </DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Permission name</TableHead>
              <TableHead>Permission description</TableHead>
              <TableHead className="text-right">Access level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              isLoading ? <Skeleton className="h-6 w-[300px]" /> : defaultPermissions.map((permission) => (
                <TableRow>
                  <TableCell>{permission.name}</TableCell>
                  <TableCell>{permission.description}</TableCell>
                  <TableCell style={{display: "flex", justifyContent: "right"}}>
                    <Select value={user.permissionOverrides?.[permission._id]?.toString()}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={["Denied", "Granted", "Admin"][permission.defaultAccessLevel] ?? "Unknown"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">Admin</SelectItem>
                        <SelectItem value="1">Granted</SelectItem>
                        <SelectItem value="0">Denied</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" disabled>Save</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

}