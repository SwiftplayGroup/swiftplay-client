"use client";

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import User, { NewPermissionOverrides } from "~/api/User";
import Permission, { PermissionAccessLevel } from "~/api/Permission";
import { Skeleton } from "~/components/ui/skeleton";
import Client from "~/api/Client";
import styles from "./PermissionDialog.module.css"

export default function PermissionDialog({user, setUser}: {user: User, setUser: (user: User) => void}) {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [defaultPermissions, setDefaultPermissions] = useState<Permission[]>([]);
  const [newPermissionOverrides, setNewPermissionOverrides] = useState<NewPermissionOverrides>({})
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

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

  useEffect(() => {

    (async () => {

      if (isProcessing) {

        try {

          const combinedPermissionOverrides: NewPermissionOverrides = {...user.permissionOverrides};
          for (const key of Object.keys(newPermissionOverrides)) {

            combinedPermissionOverrides[key] = newPermissionOverrides[key];

          }

          const newUser = await user.edit({
            permissionOverrides: combinedPermissionOverrides
          });

          setIsProcessing(false);
          setIsOpen(false);
          setNewPermissionOverrides({});
          setUser(newUser);

        } catch (error) {

          console.error(error);

        }

        setIsProcessing(false);

      }

    })();

  }, [isProcessing, newPermissionOverrides, user, setUser]);

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogTrigger asChild>
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

                const currentOverrideValue = user.permissionOverrides?.[permission._id];
                const newOverrideValue = newPermissionOverrides[permission._id];
                const shownOverrideValue = newOverrideValue !== undefined ? newOverrideValue : currentOverrideValue;
                const isDisabled = (Client.session?.user?.permissionOverrides?.[permission._id] ?? permission.defaultAccessLevel) < PermissionAccessLevel.ADMIN;

                function setAccessLevel(newAccessLevel: number | null) {

                  const newOverrides = {
                    ...newPermissionOverrides,
                    [permission._id]: newAccessLevel
                  };

                  if (currentOverrideValue === newAccessLevel || (newAccessLevel === null && currentOverrideValue === undefined)) {

                    delete newOverrides[permission._id];

                  }

                  setNewPermissionOverrides(newOverrides);

                }

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
                          <SelectValue placeholder={["No access", "User", "Admin"][permission.defaultAccessLevel] ?? "Unknown"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">Admin</SelectItem>
                          <SelectItem value="1">User</SelectItem>
                          <SelectItem value="0">No access</SelectItem>
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
          <Button type="button" disabled={isProcessing || !Object.keys(newPermissionOverrides)[0]} onClick={() => setIsProcessing(true)}>Save</Button>
          <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

}