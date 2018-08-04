const MakeTestCard = function(){
  return {
    name: 'TestCard',
    color: 'purple',
    schwierigkeit: 'GW',
    kosten: 'K1',
    zauberdauer: '3 T',
    reichweite: 'B',
    wirkungsdauer: 'K',
    wirkung: 'Der Zauberer verbessert die Einstellung des Ziels gegenüber einer von ihm bestimmten Person, Idee oder Sache um 1 Stufe (maximal auf Aufgeschlossen). Dieser Zauber benötigt weder Formel noch Geste.',
    erfolgsgrade: {
      verbesserung: ['Auslösezeit', 'Verstärken (s.u.)'],
      enchanted : '2 EG (Kosten +K1V1): Die Einstellung verbessert sich um insgesamt 2 Stufen (maximal auf Hilfsbereit).',
    }
  }
}

export default MakeTestCard
