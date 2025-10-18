import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Target, Users } from "lucide-react";

export default function MissionPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            Naša Misia a Vízia
          </CardTitle>
          <CardDescription>Strategické ciele a hodnoty, ktoré nás vedú vpred.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-primary mb-2 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Misia
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Našou misiou je poskytovať najspoľahlivejšie, najefektívnejšie a najpríjemnejšie sťahovacie a upratovacie služby v Bratislave a okolí. Každú zákazku vnímame ako osobný záväzok voči našim klientom. Chceme im uľahčiť životné zmeny a priniesť do ich nových priestorov nielen poriadok, ale aj pocit istoty a spokojnosti. Budujeme dlhodobé vzťahy založené na dôvere, transparentnosti a poctivej práci.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2 flex items-center gap-2">
              <Rocket className="h-5 w-5" />
              Vízia
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Našou víziou je stať sa prvou voľbou pre každého, kto hľadá komplexné riešenia pre sťahovanie a čistotu v regióne. Chceme byť lídrom v kvalite služieb, inováciách a prozákazníckom prístupe. Neustále investujeme do nášho tímu a moderných technológií, aby sme prekonávali očakávania a stanovovali nové štandardy v odvetví.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Naše Hodnoty
            </h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong className="text-foreground">Spoľahlivosť:</strong> Naše slovo platí. Vždy dodržíme to, na čom sa dohodneme.</li>
              <li><strong className="text-foreground">Profesionalita:</strong> Náš tím je školený, skúsený a ku každej úlohe pristupuje s maximálnou vážnosťou.</li>
              <li><strong className="text-foreground">Férovosť:</strong> Ceny komunikujeme transparentne a bez skrytých poplatkov.</li>
              <li><strong className="text-foreground">Ľudský prístup:</strong> Rozumieme, že sťahovanie je osobná záležitosť. Sme empatickí a flexibilní.</li>
            </ul>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}
