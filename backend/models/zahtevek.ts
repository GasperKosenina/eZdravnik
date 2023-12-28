interface Zahtevek {
    id: string | null;
    spol: boolean;
    datum_rojstva: string;
    opis_simptomov: string;
    zdravila: string | null;
    alergije: string | null;
    bolezni_v_druzini: string | null;
    dodatni_kontekst: string | null;
    zivljenjski_slog: string | null;
}

export default Zahtevek