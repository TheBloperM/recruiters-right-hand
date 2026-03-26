export interface JobLocation {
  country?: string;
  city?: string;
  address?: string;
  publicTransportationNearby?: PublicTransport[];
}

export type PublicTransport =
  | "Train"
  | "Metro"
  | "Light-Rail"
  | "Bus"
  | "Metronit";
