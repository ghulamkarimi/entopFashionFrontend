"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Label } from "@radix-ui/react-label"
import { Switch } from "@radix-ui/react-switch"
import { Button } from "../ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Input } from "../ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { useSelector } from "react-redux"
import { RootState } from "@/feature/store"
 

const UserPanel = () => {
    const user = useSelector((state: RootState) => state.users.currentUser);
    return (
        <div className="max-w-3xl mx-auto mt-10">
            <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="profile">Profil</TabsTrigger>
                    <TabsTrigger value="orders">Bestellungen</TabsTrigger>
                    <TabsTrigger value="settings">Einstellungen</TabsTrigger>
                </TabsList>

                {/* Profil */}
                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>Benutzerprofil</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage
                                    className="w-20 h-20 rounded-full"
                                    src="/avatar.png"
                                    alt="User"
                                />

                                <AvatarFallback>
                                    {user?.firstName?.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                {user?.customerNumber && (
                                    <p className="text-sm text-gray-500">
                                        Kundennummer: <span className="font-semibold">{user.customerNumber}</span>
                                    </p>
                                )}
                                <p className="text-sm text-gray-500">
                                    Name:{" "}
                                    <span className="font-semibold">{user?.firstName} {user?.lastName}</span>
                                </p>
                                <p className="text-sm text-gray-500">E-Mail:{" "}
                                    <span className="font-semibold">{user?.email}</span>
                                </p>
                          


                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>


                {/* Bestellungen */}
                <TabsContent value="orders">
                    <Card>
                        <CardHeader>
                            <CardTitle>Meine Bestellungen</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Du hast noch keine Bestellungen.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Einstellungen */}
                <TabsContent value="settings">
                    <Card>
                        <CardHeader>
                            <CardTitle>Einstellungen</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input
                                id="name"
                                placeholder={user?.firstName + " " + user?.lastName}
                                defaultValue={user?.firstName + " " + user?.lastName}
                            />
                            <div className="space-y-2">
                                <Label htmlFor="email">E-Mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder={user?.email}
                                    defaultValue={user?.email}

                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label>Benachrichtigungen aktivieren</Label>
                                <Switch defaultChecked />
                            </div>
                            <Button className="mt-4">Speichern</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default UserPanel