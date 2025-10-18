
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ochrana osobných údajov',
    description: 'Informácie o spracúvaní osobných údajov v spoločnosti VI and MO s. r. o. v súlade s GDPR.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background text-foreground py-16 md:py-24">
        <div className="container max-w-4xl mx-auto">
            <Card className="p-6 md:p-8 shadow-lg rounded-xl">
                <CardHeader>
                    <CardTitle className="text-3xl md:text-4xl font-headline text-primary mb-4">
                        Zásady ochrany osobných údajov
                    </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none text-foreground/90 prose-p:leading-relaxed prose-h2:font-headline prose-h2:text-primary">
                    <p>
                        Tieto zásady ochrany osobných údajov popisujú, ako spoločnosť VI and MO s. r. o., IČO: 56 811 322, so sídlom Karpatské námestie 7770/10A, 831 06 Bratislava - Rača (ďalej len &quot;my&quot;, &quot;nás&quot; alebo &quot;naša spoločnosť&quot;) zhromažďuje, používa a chráni vaše osobné údaje v súlade s Nariadením Európskeho parlamentu a Rady (EÚ) 2016/679 o ochrane fyzických osôb pri spracúvaní osobných údajov a o voľnom pohybe takýchto údajov (ďalej len &quot;GDPR&quot;).
                    </p>

                    <h2>Aké údaje zhromažďujeme?</h2>
                    <p>
                        Pri využívaní našich služieb, najmä prostredníctvom kontaktného formulára na našej webovej stránke, môžeme od vás požadovať nasledujúce osobné údaje:
                    </p>
                    <ul>
                        <li>Meno a priezvisko alebo názov firmy</li>
                        <li>Kontaktný telefón</li>
                        <li>E-mailová adresa</li>
                        <li>Adresa (napr. adresa sťahovania alebo upratovania)</li>
                        <li>Informácie, ktoré nám poskytnete v tele správy</li>
                    </ul>

                    <h2>Na aký účel údaje používame?</h2>
                    <p>
                        Vaše osobné údaje spracúvame na nasledujúce účely:
                    </p>
                    <ul>
                        <li><strong>Komunikácia so zákazníkom:</strong> Aby sme mohli odpovedať na vaše dopyty, otázky a pripraviť vám nezáväznú cenovú ponuku.</li>
                        <li><strong>Poskytovanie služieb:</strong> Na realizáciu objednaných služieb, ako je sťahovanie, vypratávanie alebo upratovanie.</li>
                        <li><strong>Fakturácia a účtovníctvo:</strong> Na vystavenie daňových dokladov a plnenie si zákonných povinností.</li>
                    </ul>

                    <h2>Ako dlho údaje uchovávame?</h2>
                    <p>
                        Osobné údaje uchovávame len po dobu nevyhnutnú na splnenie účelu, na ktorý boli zhromaždené, alebo po dobu vyžadovanú príslušnými právnymi predpismi (napr. zákon o účtovníctve).
                    </p>

                    <h2>Vaše práva</h2>
                    <p>
                        Ako dotknutá osoba máte právo:
                    </p>
                    <ul>
                        <li>Na prístup k svojim osobným údajom.</li>
                        <li>Na opravu nesprávnych alebo neúplných údajov.</li>
                        <li>Na vymazanie údajov (právo &quot;byť zabudnutý&quot;).</li>
                        <li>Na obmedzenie spracúvania.</li>
                        <li>Namietať proti spracúvaniu.</li>
                        <li>Na prenosnosť údajov.</li>
                    </ul>
                    <p>
                        Svoje práva si môžete uplatniť zaslaním žiadosti na našu e-mailovú adresu <a href="mailto:info@viandmo.com">info@viandmo.com</a>.
                    </p>

                    <h2>Zabezpečenie údajov</h2>
                    <p>
                        Prijali sme primerané technické a organizačné opatrenia na ochranu vašich osobných údajov pred stratou, zneužitím alebo neoprávneným prístupom.
                    </p>

                    <h2>Zmeny v zásadách</h2>
                    <p>
                        Vyhradzujeme si právo tieto zásady ochrany osobných údajov kedykoľvek aktualizovať. Aktuálna verzia bude vždy zverejnená na našej webovej stránke.
                    </p>

                     <p className="mt-6">
                        Dátum poslednej aktualizácie: 30.07.2024
                    </p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
