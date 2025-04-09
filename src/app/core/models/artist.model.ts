export interface Artist {
  id:        string;
  name:      string;
  bornCity:  string;
  birthdate: string;
  img?:       string | null;
  rating:    number;
  songs:     number[];
}
