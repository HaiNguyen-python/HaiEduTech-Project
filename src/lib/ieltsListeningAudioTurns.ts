/**
 * Builds natural TTS turns while preserving sentence-level transcript highlighting.
 * Consecutive lines by the same speaker are merged until the safe request limit.
 */

export interface ListeningAudioTurn {
  i: number;
  speaker: string | null;
  text: string;
}

export interface ListeningAudioTurnPlan {
  chunks: string[];
  chunkTurn: number[];
  turnFirstChunk: number[];
  turns: ListeningAudioTurn[];
}

const SPEAKER_RE = /^([A-Z][a-zA-Z]{1,20}):\s*/;
const SENTENCE_RE = /[^.!?]+[.!?]+["')\]]*|[^.!?]+$/g;
export const LISTENING_TTS_MAX_CHARS = 1000;

export const buildListeningAudioTurnPlan = (
  transcript: string,
  maxChars = LISTENING_TTS_MAX_CHARS,
): ListeningAudioTurnPlan => {
  const lines = transcript.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const chunks: string[] = [];
  const chunkTurn: number[] = [];
  const turnFirstChunk: number[] = [];
  const turns: ListeningAudioTurn[] = [];
  let inheritedSpeaker: string | null = null;

  for (const line of lines) {
    const speakerMatch = line.match(SPEAKER_RE);
    if (speakerMatch) inheritedSpeaker = speakerMatch[1];
    const body = line.replace(SPEAKER_RE, "");
    const sentences = (body.match(SENTENCE_RE) ?? [body]).map((part) => part.trim()).filter(Boolean);

    for (let sentenceIndex = 0; sentenceIndex < sentences.length; sentenceIndex++) {
      const sentence = sentences[sentenceIndex];
      const displayChunk = sentenceIndex === 0 && speakerMatch
        ? `${speakerMatch[1]}: ${sentence}`
        : sentence;
      const previous = turns.at(-1);
      const canMerge = previous
        && previous.speaker === inheritedSpeaker
        && previous.text.length + sentence.length + 1 <= maxChars;
      const turnIndex = canMerge ? previous.i : turns.length;

      if (canMerge) previous.text = `${previous.text} ${sentence}`;
      else {
        turnFirstChunk[turnIndex] = chunks.length;
        turns.push({ i: turnIndex, speaker: inheritedSpeaker, text: sentence });
      }

      chunks.push(displayChunk);
      chunkTurn.push(turnIndex);
    }
  }

  return { chunks, chunkTurn, turnFirstChunk, turns };
};