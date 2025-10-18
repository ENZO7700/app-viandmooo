'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCollection, useFirebase } from "@/firebase";
import { type ContactSubmission } from "@/lib/data";
import { collection } from "firebase/firestore/lite";
import { useMemo } from "react";

export default function AdminMessagesPage() {
    const { firestore } = useFirebase();
    const submissionsQuery = firestore ? collection(firestore, 'submissions') : null;
    const { data: submissions, loading } = useCollection<ContactSubmission>(submissionsQuery);

    const sortedSubmissions = useMemo(() => {
        if (!submissions) return [];
        return [...submissions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [submissions]);

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
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10">
                                        Načítavam správy...
                                    </TableCell>
                                </TableRow>
                            ) : sortedSubmissions.length > 0 ? (
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
