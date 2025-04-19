"use client";

import { useEffect, useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import User from "~/api/User";
import Permission, { PermissionAccessLevel } from "~/api/Permission";
import { Skeleton } from "~/components/ui/skeleton";
import Client from "~/api/Client";
import styles from "./PermissionDialog.module.css"

export default function PermissionDialog({user}: {user: User}) {

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [defaultPermissions, setDefaultPermissions] = useState<Permission[]>([]);
  const [newPermissionOverrides, setNewPermissionOverrides] = useState<{
    [permissionID: string]: PermissionAccessLevel | null;
  }>({})
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
    <Dialog open={isOpen}>
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
              isLoading ? <Skeleton className="h-6 w-[300px]" /> : defaultPermissions.map((permission) => {

                const currentOverrideValue = Client.authenticatedUser?.permissionOverrides?.[permission._id];
                const newOverrideValue = newPermissionOverrides[permission._id];
                const shownOverrideValue = newOverrideValue !== undefined ? newOverrideValue : currentOverrideValue;
                const isDisabled = (currentOverrideValue ?? permission.defaultAccessLevel) < PermissionAccessLevel.ADMIN;

                function setAccessLevel(newAccessLevel: number | null) {

                  const newOverrides = {
                    ...newPermissionOverrides,
                    [permission._id]: newAccessLevel
                  };

                  if (currentOverrideValue === newAccessLevel || (newAccessLevel === null && !currentOverrideValue)) {

                    delete newOverrides[permission._id];

                  }

                  setNewPermissionOverrides(newOverrides);

                }

                console.log(shownOverrideValue);

                return (
                  <TableRow key={permission._id}>
                    <TableCell>{permission.name}</TableCell>
                    <TableCell>{permission.description}</TableCell>
                    <TableCell className={styles.accessCell}>
                      <Button className={styles.defaultButton} disabled={isDisabled || shownOverrideValue === undefined || shownOverrideValue === null} onClick={() => setAccessLevel(null)}>
                        <span className="material-symbols-outlined">
                          close
                        </span>
                      </Button>
                      <Select value={shownOverrideValue?.toString() ?? ""} disabled={isDisabled} onValueChange={(value) => setAccessLevel(parseInt(value, 10))}>
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
                )
              })
            }
          </TableBody>
        </Table>
        <DialogFooter>
          <Button type="button" disabled={!Object.keys(newPermissionOverrides)[0]}>Save</Button>
          <Button type="button" variant="secondary">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

}