'use server';

import { z } from 'zod';
import type { ContactSubmission } from '@/lib/data';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

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
        const { firestore } = initializeFirebase();
        const submissionsCollection = collection(firestore, 'submissions');
        
        const newSubmission: Omit<ContactSubmission, 'id'> = {
            date: new Date().toISOString(),
            ...parsed.data,
        };

        await addDoc(submissionsCollection, newSubmission);

        return { message: "Ďakujeme! Vaša správa bola úspešne odoslaná. Ozveme sa vám čo najskôr." };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Neznáma chyba.";
        return {
             message: `Ľutujeme, pri odosielaní správy nastala chyba: ${errorMessage}. Skúste to prosím neskôr.`,
             fields: parsed.data,
        }
    }
}

export async function fetchSubmissions(db: any): Promise<ContactSubmission[]> {
    const submissionsCollection = collection(db, 'submissions');
    const snapshot = await getDocs(submissionsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactSubmission));
}
