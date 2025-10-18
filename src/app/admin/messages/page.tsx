
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchSubmissions } from "@/app/actions";

export default async function AdminMessagesPage() {
    const submissions = await fetchSubmissions();
    const sortedSubmissions = [...submissions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Prijaté správy</CardTitle>
                    <CardDescription>Zoznam správ odoslaných cez kontaktný formulár.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Dátum</TableHead>
                                <TableHead>Meno</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Telefón</TableHead>
                                <TableHead>Správa</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedSubmissions.length > 0 ? (
                                sortedSubmissions.map((submission) => (
                                    <TableRow key={submission.id}>
                                        <TableCell>{new Date(submission.date).toLocaleString('sk-SK')}</TableCell>
                                        <TableCell>
                                            <div className="font-medium">{submission.name}</div>
                                        </TableCell>
                                        <TableCell>{submission.email}</TableCell>
                                        <TableCell>{submission.phone}</TableCell>
                                        <TableCell>{submission.message}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10">
                                        Zatiaľ ste neprijali žiadne správy.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
