let data = 
    [
        {
            name : 'Einstellung Verbessern',
            color: 'purple',
            schule: 'Beherrschung  0',
            typus: 'Einstellung',
            schwierigkeit: 'GW',
            kosten: 'K1',
            zauberdauer: '3 T',
            reichweite: 'B',
            wirkungsdauer: 'K',
            wirkung: 'Der Zauberer verbessert die Einstellung des Ziels gegenüber einer von ihm bestimmten Person, Idee oder Sache um 1 Stufe (maximal auf Aufgeschlossen). Dieser Zauber benötigt weder Formel noch Geste.',
            erfolgsgrade: {
                verbesserung: 'Auslösezeit, Verstärken',
                enchanted : '2 EG (Kosten +K1V1): Die Einstellung verbessert sich um insgesamt 2 Stufen (maximal auf Hilfsbereit).',
            }
        },
        {
            name : 'Einstellung Verschlechtern',
            color: 'purple',
            schule: 'Beherrschung 0',
            typus: 'Einstellung',
            schwierigkeit: 'GW',
            kosten: 'K1',
            zauberdauer: '3T',
            reichweite: 'B',
            wirkungsdauer: 'K',
            wirkung: 'Der Zauberer verschlechtert die Einstellung des Ziels gegenüber einer von ihm bestimmten Person, Idee oder Sache um 1 Stufe (maximal auf Ablehnend). Dieser Zauber benötigt weder Formel noch Geste.',
            erfolgsgrade: {
                verbesserung: 'Auslösezeit, Verstärken',
                enchanted : '2 EG (Kosten +K1V1): Die Einstellung verschlechtert sich um insgesamt 2 Stufen (maximal auf Feindlich).',
            }
        },
        {
            name : 'Moral erhöhen',
            color: 'purple',
            schule: 'Beherrschung 1',
            typus: 'Moral',
            schwierigkeit: '18',
            kosten: 'K4V1',
            zauberdauer: '2T',
            reichweite: 'B',
            wirkungsdauer: 'K',
            wirkung: 'Die Moral des Ziels wird einer vom Zauberer benannten Unternehmung gegenüber erhöht. Dadurch wird es immun gegen den Zustand Angsterfüllt, wenn es ihm noch nicht unterliegt.',
            erfolgsgrade: {
                verbesserung: 'Auslösezeit, Kanalisierter Fokus, Verstärken, Verzehrter Fokus',
                enchanted : '1 EG (Kosten +K1V1): Das Ziel wird zusätzlich immun gegen den Zustand Panisch, wenn es ihm noch nicht unterliegt.',
            }
        },
        {
            name : 'Suggestion',
            color: 'purple',
            schule: 'Beherrschung 2',
            typus: 'Halluzination ',
            schwierigkeit: 'GW',
            kosten: 'K8V2',
            zauberdauer: '7T',
            reichweite: 'B',
            wirkungsdauer: 'K',
            wirkung: 'Der Betroffene erhält eine Idee, Vorurteil oder Ähnliches nach Willen des Zauberers. Sofern nichts Offensichtliches oder die Moral der Person dagegen spricht. Keine beschränkung von Kanalisierten Zaubern (S. 195) und benötigt weder Formel noch Geste.',
            erfolgsgrade: {
                verbesserung: 'Auslösezeit, Kanalisierter Fokus, Verstärken, Verzehrter Fokus',
                enchanted : '2 EG (Kosten +K2V2): Auch dann wenn Offensichtliches dagegen spricht, aber seiner eigenen Moral folgen.',
            }
        },
        {
            name : 'Schlaf',
            color: 'purple',
            schule: 'Beherrschung 2',
            typus: 'Mental',
            schwierigkeit: 'GW',
            kosten: '8V2',
            zauberdauer: '6T',
            reichweite: '5m',
            wirkungsdauer: '',
            wirkung: 'Das Ziel erhält den Zustand Benommen 3.',
            erfolgsgrade: {
                verbesserung: 'Auslösezeit, Erschöpfter Fokus, Reichweite, Verstärken, Verzehrter Fokus',
                enchanted : '1 EG (Kosten +2V2): Das Ziel erhält stattdessen den Zustand Schlafend.',
            }
        },
        {
            name : 'Lichtertanz',
            color: 'blue',
            schule: 'Illusion 0, Licht 0',
            typus: 'Leuchten',
            schwierigkeit: '15',
            kosten: '1',
            zauberdauer: '1T',
            reichweite: '10m',
            wirkungsdauer: '1m',
            wirkung: 'Der Zauberer erschafft bunte, flackernde Lichter. Diese können beispielsweise Wesen ablenken oder ihm einen Bonus in Höhe von 2 Punkten auf passende Darbietung-Proben geben.',
            erfolgsgrade: {
                verbesserung: 'Auslösezeit, Reichweite, Verstärken, Wirkungsdauer',
                enchanted : '3 EG (Kosten +1V1): Der Bonus auf Darbietung - Proben erhöht sich auf 3 Punkte.',
            }
        },
        {
            name : 'Geräuschhexerei',
            color: 'blue',
            schule: 'Illusion 0',
            typus: 'Geräusch',
            schwierigkeit: '15',
            kosten: '1',
            zauberdauer: '4T',
            reichweite: '10m',
            wirkungsdauer: '-',
            wirkung: 'Der Zauberer lässt ein kurzes und nicht zu komplexes Geräusch wie etwa ein Türknarren oder ein Bellen entstehen. Dieser Zauber benötigt keine Formel.',
            erfolgsgrade: {
                verbesserung: 'Auslösezeit, Reichweite, Verstärken',
                enchanted : '1 EG (Kosten +1V1): Statt eines einfachen Geräuschs handelt es sich um bis zu fünf Worte  mit der Stimme des Zauberers.',
            }
        },
        {
            name : 'Magische Finte',
            color: 'blue',
            schule: 'Illusion 1',
            typus: 'Tarnung',
            schwierigkeit: '18',
            kosten: '4V1',
            zauberdauer: '1T',
            reichweite: 'B',
            wirkungsdauer: '15T',
            wirkung: 'Die Bewegungen des Ziels werden durch Illusionen überlagert. Während der Wirkungsdauer und dem Fokussieren der Magie für diesen Zauber provoziert das Ziel keinerlei Gelegenheitsangriffe.',
            erfolgsgrade: {
                verbesserung: 'Auslösezeit, Erschöpfter Fokus, Verstärken, Verzehrter Fokus, Wirkungsdauer',
                enchanted : '2 EG (Kosten +1V1): Normale Angriffe gegen den Zauberer erhalten einen Malus in Höhe von 1 Punkt.',
            }
        },
        {
            name : 'Objektillusion',
            color: 'blue',
            schule: 'Illusion 1',
            typus: 'Objekt, Trugbild',
            schwierigkeit: '18',
            kosten: 'K4V1',
            zauberdauer: '2T',
            reichweite: 'B',
            wirkungsdauer: 'K',
            wirkung: 'Der Zauberer kann ein Objekt als ein anderes ähnlicher Größe erscheinen lassen, etwa ein Stück Rinde als Münze oder einen Stock als Schwert. Lediglich die Sicht ist von dem Zauber betroffen. Das Objekt darf maximal eine Last von 4 aufweisen.',
            erfolgsgrade: {
                verbesserung: 'Auslösezeit, Kanalisierter Fokus, Verstärken, Verzehrter Fokus',
                enchanted : '2 EG (Kosten +K1V1): Auch die übrigen Sinne sind betroffen.',
            }
        },
        {
            name : 'Trugbild',
            color: 'blue',
            schule: 'Illusion 2',
            typus: 'Trugbild',
            schwierigkeit: '21',
            kosten: 'K8V2',
            zauberdauer: '6T',
            reichweite: '5m',
            wirkungsdauer: 'K',
            wirkung: 'Der Zauberer erschafft eine statische Illusion bis maximal Größenklasse 6, die Sicht und Gehör betrifft',
            erfolgsgrade: {
                verbesserung: 'Auslösezeit, Kanalisierter Fokus, Reichweite, Verstärken, Verzehrter Fokus',
                enchanted : '2 EG (Kosten +K2V2): Die Illusion kann auch bewegt sein.',
            }
        },
        {
            name : 'Magie Erkennen',
            schule: 'Erkenntnis 0',
            color: 'green',
            typus: 'Hellsicht, Wahrnehmung',
            schwierigkeit: '15',
            kosten: '1',
            zauberdauer: '2T',
            reichweite: '5m',
            wirkungsdauer: '-',
            wirkung: 'Das Ziel erkennt die Stärke der Magie in seinem direkten Sichtbereich. Möchte es anschließend ein Objekt oder einen Ort untersuchen, erhält es einen Bonus in Höhe von 1 Punkt auf eine eventuelle Arkane Kunde-Probe.',
            erfolgsgrade: {
                verbesserung: 'Auslösezeit, Reichweite, Verstärken, Wirkungsdauer',
                enchanted : '1 EG (Kosten +1V1): Der Bonus erhöht sich auf 2 Punkte',
            }
        },
        {
            name : 'Magische Botschaft',
            color: 'green',
            schule: 'Erkenntnis 1',
            typus: 'Botschaft',
            schwierigkeit: '18',
            kosten: '4V1',
            zauberdauer: '5T',
            reichweite: '50m',
            wirkungsdauer: '',
            wirkung: 'Der Zauberer übermittelt dem Ziel eine gedankliche Botschaft aus maximal 5 Worten. Er muss das Ziel entweder kennen oder sehen. Das Ziel hört die Botschaft in der Stimme des Zauberers.',
            erfolgsgrade: {
                verbesserung: 'Auslösezeit, Erschöpfter Fokus, Reichweite, Verstärken, Verzehrter Fokus',
                enchanted : '1 EG (Kosten +1V1): Es können maximal 15 Worte übermittelt werden.',
            }
        },
        {
            name : 'Text verschlüsseln',
            color: 'green',
            schule: 'Erkenntnis 1',
            typus: 'Verständigung',
            schwierigkeit: '18',
            kosten: '4V1',
            zauberdauer: '2T',
            reichweite: 'B',
            wirkungsdauer: '',
            wirkung: 'Der Zauberer macht ein Schriftstück von einer Seite unlesbar, Buchstaben erscheinen verschwommen oder wild durcheinander gewürfelt. Wird ein von ihm bestimmtes Losungswort gesprochen, nimmt der Text wieder seine ursprüngliche Form an.',
            erfolgsgrade: {
                verbesserung: 'Auslösezeit, Erschöpfter Fokus, Verstärken, Verzehrter Fokus',
                enchanted : '2 EG (Kosten +1V1): Es wird ein ganzes Buch unlesbar gemacht.',
            }
        },
        {
            name : 'Wahrer Blick',
            color: 'red',
            schule: 'Bann 0, Erkenntnis 1, Illusion 2',
            typus: 'Hellsicht, Sinne',
            schwierigkeit: '15',
            kosten: 'K1',
            zauberdauer: '1T',
            reichweite: 'Z',
            wirkungsdauer: 'K',
            wirkung: 'Der Zauberer ist in der Lage, mit seinen normalen Sinnen eine Illusion zu durchschauen. Dies erfordert eine Wahrnehmung - Probe gegen die um drei Punkte erhöhte Schwierigkeit des Illusionszaubers.',
            erfolgsgrade: {
                verbesserung: 'Auslösezeit, Verstärken',
                enchanted : '2 EG (Kosten +K1V1): Die Probe geht gegen die normale Schwierigkeit des Illusionszaubers.',
            }
        },
        {
            name : 'Zauberer behindern',
            schule: 'Bann 0',
            color: 'red',
            typus: 'Konter',
            schwierigkeit: 'GW',
            kosten: '1',
            zauberdauer: '2T',
            reichweite: '10m',
            wirkungsdauer: '',
            wirkung: 'Führt das Ziel gerade einen Zaubervorgang durch, wird die Zauberdauer um 4 Ticks verlängert. Bricht es den Vorgang ab, entfällt die Verlängerung.',
            erfolgsgrade: {
                verbesserung: 'Auslösezeit, Reichweite, Verstärken',
                enchanted : '2 EG (Kosten +1V1): Die Zauberdauer des Ziels wird um 5 Ticks verlängert.',
            }
        },
        {
            name : 'Verwandlung bannen',
            color: 'red',
            schule: 'Bann 1, Verwandlung 3',
            typus: 'Zauber brechen',
            schwierigkeit: '24',
            kosten: '12V3',
            zauberdauer: '10T',
            reichweite: 'B',
            wirkungsdauer: '',
            wirkung: 'Alle momentan auf das Ziel wirkenden Verwandlungszauber werden aufgehoben, solange sie maximal Grad 3 aufweisen.',
            erfolgsgrade: {
                verbesserung: 'Auslösezeit, Erschöpfter Fokus, Verstärken, Verzehrter Fokus',
                enchanted : '2 EG (Kosten +3V3): Es werden Zauber bis Grad 5 aufgehoben.',
            }
        },
        ]


export default data