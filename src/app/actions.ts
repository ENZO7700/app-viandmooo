
'use server';

import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import type { ContactSubmission } from '@/lib/data';

const dataDir = path.join(process.cwd(), 'data');
const submissionsFilePath = path.join(dataDir, 'submissions.json');

// Helper function to ensure files exist and read them
function readData<T>(filePath: string): T[] {
    try {
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '[]', 'utf8');
        }
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Error reading data from ${filePath}:`, error);
        return [];
    }
}

// Helper function to write data
function writeData<T>(filePath: string, data: T[]): void {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error(`Error writing data to ${filePath}:`, error);
    }
}

const getSubmissions = (): ContactSubmission[] => readData<ContactSubmission>(submissionsFilePath);

const saveSubmission = (submission: ContactSubmission): void => {
    const submissions = getSubmissions();
    submissions.unshift(submission);
    writeData<ContactSubmission>(submissionsFilePath, submissions);
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
        saveSubmission(newSubmission);
        return { message: "Ďakujeme! Vaša správa bola úspešne odoslaná. Ozveme sa vám čo najskôr." };
    } catch (error) {
        return {
             message: "Ľutujeme, pri odosielaní správy nastala chyba. Skúste to prosím neskôr.",
             fields: parsed.data,
        }
    }
}

export async function fetchSubmissions(): Promise<ContactSubmission[]> {
    return getSubmissions();
}
