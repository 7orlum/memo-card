import { reportHandledErrorOnce } from "../rollbar/rollbar.tsx";

export enum SpeakLanguageEnum {
  USEnglish = "en-US",
  Italian = "it-IT",
  Swedish = "sv-SE",
  Malay = "ms-MY",
  German = "de-DE",
  UKEnglish = "en-GB",
  Hebrew = "he-IL",
  Indonesian = "id-ID",
  French = "fr-FR",
  Bulgarian = "bg-BG",
  Spanish = "es-ES",
  Finnish = "fi-FI",
  Japanese = "ja-JP",
  Romanian = "ro-RO",
  Portuguese = "pt-PT",
  Thai = "th-TH",
  Croatian = "hr-HR",
  Slovak = "sk-SK",
  Hindi = "hi-IN",
  Ukrainian = "uk-UA",
  Chinese = "zh-CN",
  Vietnamese = "vi-VN",
  Arabic = "ar-001",
  Greek = "el-GR",
  Russian = "ru-RU",
  Danish = "da-DK",
  Hungarian = "hu-HU",
  Dutch = "nl-NL",
  Turkish = "tr-TR",
  Korean = "ko-KR",
  Polish = "pl-PL",
  Czech = "cs-CZ",
}

export const languageKeyToHuman = (str: string): string => {
  if (str === "UKEnglish") {
    return "UK English";
  }
  if (str === "USEnglish") {
    return "US English";
  }
  return str.replace(/([A-Z])/g, " $1").trim();
};

export const speak = (text: string, language: SpeakLanguageEnum) => {
  const isSpeechSynthesisSupported =
    "speechSynthesis" in window &&
    typeof SpeechSynthesisUtterance !== "undefined";

  if (!isSpeechSynthesisSupported) {
    reportHandledErrorOnce(
      `Speech synthesis is not supported in this browser. Browser info: ${navigator.userAgent}`,
    );
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;

  window.speechSynthesis.speak(utterance);
};
