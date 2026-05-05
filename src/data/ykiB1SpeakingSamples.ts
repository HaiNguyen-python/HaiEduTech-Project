/**
 * @file ykiB1SpeakingSamples.ts
 * @description AI-generated B1 sample monologues (Finnish + Vietnamese) for each speaking scenario.
 */
import samplesJson from "./ykiB1SpeakingSamples.json";

export interface B1SpeakingSample {
  id: string;
  sampleFi: string;
  sampleVi: string;
}

export const B1_SPEAKING_SAMPLES: B1SpeakingSample[] = samplesJson as B1SpeakingSample[];

const map = new Map(B1_SPEAKING_SAMPLES.map((s) => [s.id, s]));
export const getSpeakingSample = (id: string): B1SpeakingSample | undefined => map.get(id);
