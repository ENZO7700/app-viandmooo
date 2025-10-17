
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSettingsPage() {

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Nastavenia</CardTitle>
                    <CardDescription>Správa nastavení administrátorského rozhrania.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="admin-email">Administrátorský email</Label>
                        <Input id="admin-email" value="admin@admin.com" disabled />
                    </div>
                     <p className="text-sm text-muted-foreground">
                        Toto je ukážková stránka nastavení. V budúcnosti tu môžete meniť konfiguráciu aplikácie.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
