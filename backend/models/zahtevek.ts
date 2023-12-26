interface Zahtevek {
    id: string;
    spol: boolean;
    datum_rojstva: string;
    opis_simptomov: string;
    zdravila: string[];
    alergije: string[];
    bolezni_v_druzini: string[];
    dodatni_kontekst: string;
    zivljenjski_slog: string;
}

export default Zahtevek