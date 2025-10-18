
'use server';

import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import type { ContactSubmission } from '@/lib/data';

const dataDir = path.join(process.cwd(), 'data');
const submissionsFilePath = path.join(dataDir, 'submissions.json');

// Helper function to ensure directory and files exist, then read them
async function readData<T>(filePath: string): Promise<T[]> {
    try {
        await fs.mkdir(dataDir, { recursive: true });
        await fs.access(filePath);
    } catch {
        // If file doesn't exist, create it with an empty array
        await fs.writeFile(filePath, '[]', 'utf8');
    }

    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Error reading or parsing data from ${filePath}:`, error);
        // Return an empty array if parsing fails to prevent crashes
        return [];
    }
}

// Helper function to write data
async function writeData<T>(filePath: string, data: T[]): Promise<void> {
    try {
        await fs.mkdir(dataDir, { recursive: true });
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error(`Error writing data to ${filePath}:`, error);
        // We re-throw here to let the caller know the write failed.
        throw new Error(`Could not write data to ${filePath}.`);
    }
}

const getSubmissions = async (): Promise<ContactSubmission[]> => await readData<ContactSubmission>(submissionsFilePath);

const saveSubmission = async (submission: ContactSubmission): Promise<void> => {
    const submissions = await getSubmissions();
    submissions.unshift(submission);
    await writeData<ContactSubmission>(submissionsFilePath, submissions);
};

const contactFormSchema = z.object({
    name: z.string().min(1, { message: "Meno je povinné." }),
    phone: z.string().min(1, { message: "Telefón je povinný." }),
    email: z.string().email({ message: "Neplatná emailová adresa." }),
    address: z.string().optional(),
    message: z.string().min(1, { message: "Správa je povinná." }),
});

export type ContactFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
}

export async function submitContactForm(
  prevState: ContactFormState,
  data: FormData
): Promise<ContactFormState> {
    const formData = Object.fromEntries(data);
    const parsed = contactFormSchema.safeParse(formData);

    if (!parsed.success) {
        const fields: Record<string, string> = {};
        for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            fields[key] = formData[key].toString();
        }
        }
        return {
            message: "Formulár obsahuje chyby. Skontrolujte zadané údaje.",
            fields,
            issues: parsed.error.issues.map((issue) => `${issue.path.join('.')} a ${issue.message}`),
        };
    }

    try {
        const newSubmission: ContactSubmission = {
            id: new Date().getTime().toString(),
            date: new Date().toISOString(),
            ...parsed.data,
        };
        await saveSubmission(newSubmission);
        return { message: "Ďakujeme! Vaša správa bola úspešne odoslaná. Ozveme sa vám čo najskôr." };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Neznáma chyba.";
        return {
             message: `Ľutujeme, pri odosielaní správy nastala chyba: ${errorMessage}. Skúste to prosím neskôr.`,
             fields: parsed.data,
        }
    }
}

export async function fetchSubmissions(): Promise<ContactSubmission[]> {
    return await getSubmissions();
}
