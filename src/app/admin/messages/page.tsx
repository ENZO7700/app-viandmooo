
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCollection, useFirestore } from "@/firebase";
import { type ContactSubmission } from "@/lib/data";
import { collection } from "firebase/firestore";
import { useMemo } from "react";
import { format } from 'date-fns';

export default function AdminMessagesPage() {
    const firestore = useFirestore();
    const submissionsQuery = useMemo(() => firestore ? collection(firestore, 'submissions') : null, [firestore]);
    const { data: submissions, loading } = useCollection<ContactSubmission>(submissionsQuery);

    const sortedSubmissions = useMemo(() => {
        if (!submissions) return [];
        // @ts-ignore
        return [...submissions].sort((a, b) => b.date?.toDate().getTime() - a.date?.toDate().getTime());
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
                                        {/* @ts-ignore */}
                                        <TableCell>{submission.date ? format(submission.date.toDate(), 'dd.MM.yyyy HH:mm') : ''}</TableCell>
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
