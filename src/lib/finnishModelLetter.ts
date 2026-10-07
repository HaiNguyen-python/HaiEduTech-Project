/** Preserve wording while separating greeting, body, closing, and signature. */
export const formatModelLetter = (text: string) => {
  let out = text.replace(/\r/g, "").trim();
  out = out.replace(/^((?:Hei|Hyvä|Hyvät|Arvoisa|Moi|Terve|Dear|Hello|Hi)[^,.!?\n]{0,40}[,!])\s+/, "$1\n\n");
  out = out.replace(/\s+((?:Ystävällisin terveisin|Parhain terveisin|Terveisin|Kiittäen|Kind regards|Best regards|Best wishes|Regards)[,.]?)(?:[ \t]*\n[ \t]*|[ \t]+)?([^\n.!?]*?)\s*$/, (_, closing: string, signature: string) =>
    `\n\n${closing}${signature.trim() ? `\n${signature.trim()}` : ""}`,
  );
  return out;
};