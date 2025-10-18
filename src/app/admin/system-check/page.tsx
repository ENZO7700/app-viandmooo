import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle } from "lucide-react";
import fs from 'fs/promises';
import path from 'path';

type CheckResult = {
    name: string;
    status: 'OK' | 'Error';
    details: string;
};

async function performChecks(): Promise<CheckResult[]> {
    const checks: CheckResult[] = [];
    const publicPath = path.join(process.cwd(), 'public');
    const srcFirebasePath = path.join(process.cwd(), 'src', 'firebase');

    // 1. PWA Files Check
    try {
        await fs.access(path.join(publicPath, 'manifest.json'));
        checks.push({ name: "PWA Manifest (manifest.json)", status: 'OK', details: "Súbor existuje." });
    } catch (error) {
        checks.push({ name: "PWA Manifest (manifest.json)", status: 'Error', details: "Súbor chýba." });
    }
    try {
        await fs.access(path.join(publicPath, 'offline.html'));
        checks.push({ name: "PWA Offline stránka (offline.html)", status: 'OK', details: "Súbor existuje." });
    } catch (error) {
        checks.push({ name: "PWA Offline stránka (offline.html)", status: 'Error', details: "Súbor chýba." });
    }
    try {
        await fs.access(path.join(publicPath, 'viandmo_logo.png'));
        checks.push({ name: "Logo", status: 'OK', details: "Súbor existuje." });
    } catch (error) {
        checks.push({ name: "Logo", status: 'Error', details: "Súbor chýba." });
    }

    // 2. Environment Variables Check
    const checkEnvVar = (name: string): CheckResult => {
        return process.env[name]
            ? { name: `Premenná prostredia: ${name}`, status: 'OK', details: "Nájdená." }
            : { name: `Premenná prostredia: ${name}`, status: 'Error', details: "Chýba! Doplňte ju do .env súboru." };
    };
    checks.push(checkEnvVar('SESSION_SECRET'));
    checks.push(checkEnvVar('NEXT_PUBLIC_FIREBASE_PROJECT_ID'));

    // 3. Core Logic Files Check
    try {
        await fs.access(path.join(srcFirebasePath, 'client-provider.tsx'));
        checks.push({ name: "Firebase Klient Provider", status: 'OK', details: "Súbor existuje." });
    } catch (error) {
        checks.push({ name: "Firebase Klient Provider", status: 'Error', details: "Kľúčový súbor chýba." });
    }
     try {
        await fs.access(path.join(srcFirebasePath, 'config.ts'));
        checks.push({ name: "Firebase Konfigurácia", status: 'OK', details: "Súbor existuje." });
    } catch (error) {
        checks.push({ name: "Firebase Konfigurácia", status: 'Error', details: "Kľúčový súbor chýba." });
    }
     try {
        await fs.access(path.join(process.cwd(), 'src', 'middleware.ts'));
        checks.push({ name: "Middleware (middleware.ts)", status: 'OK', details: "Súbor existuje." });
    } catch (error) {
        checks.push({ name: "Middleware (middleware.ts)", status: 'Error', details: "Kľúčový súbor chýba." });
    }


    return checks;
}


export default async function SystemCheckPage() {
    const results = await performChecks();

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Kontrola systému</CardTitle>
                    <CardDescription>
                        Táto stránka vykonáva automatickú diagnostiku kľúčových súčastí aplikácie, aby sa overila ich správna konfigurácia a existencia.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Stav</TableHead>
                                <TableHead>Komponent</TableHead>
                                <TableHead>Detail</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {results.map((result, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {result.status === 'OK' ? (
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <XCircle className="h-5 w-5 text-destructive" />
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">{result.name}</TableCell>
                                    <TableCell>{result.details}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
