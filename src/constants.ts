export const APP_NAME = "Transcripter";

export const APP_SLOGAN = "Listen. Read. Remember.";

export const LOCAL_STORAGE_KEYS = {
  VIDEO_LANGUAGE: "video_language",
  FILE_NAME: "file_name",
  VIDEO_URL: "video_url",
  TRANSCRIPT_DATA: "transcript_data",
  VOCABULARY: "transcripter_vocabulary",
  ACTIVE_CUE: "active_cue",
};

export const LANGUAGES = {
  en: {
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    color: "#B8D8F8",
  },
  es: {
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    color: "#F6D68A",
  },
  fr: {
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    color: "#AFC8F8",
  },
  de: {
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    color: "#F2C66D",
  },
  it: {
    name: "Italian",
    nativeName: "Italiano",
    flag: "🇮🇹",
    color: "#B9E7C3",
  },
  pt: {
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇧🇷",
    color: "#BFE6A8",
  },
  ru: {
    name: "Russian",
    nativeName: "Russkij",
    flag: "🇷🇺",
    color: "#B8D4F8",
  },
  zh: {
    name: "Chinese",
    nativeName: "zhongwen",
    flag: "🇨🇳",
    color: "#F6C26B",
  },
  ja: {
    name: "Japanese",
    nativeName: "nihongo",
    flag: "🇯🇵",
    color: "#F7C8D8",
  },
  ko: {
    name: "Korean",
    nativeName: "hangugeo",
    flag: "🇰🇷",
    color: "#C9D6F8",
  },
  ar: {
    name: "Arabic",
    nativeName: "el-arabiyyah",
    flag: "🇸🇦",
    color: "#B7DFC0",
  },
  hi: {
    name: "Hindi",
    nativeName: "hindi",
    flag: "🇮🇳",
    color: "#F6C59B",
  },
  tr: {
    name: "Turkish",
    nativeName: "Türkçe",
    flag: "🇹🇷",
    color: "#F3B4B4",
  },
  //   nl: {
  //     name: "Dutch",
  //     nativeName: "Nederlands",
  //     flag: "🇳🇱",
  //     color: "#F4C39A",
  //   },
  pl: {
    name: "Polish",
    nativeName: "Polski",
    flag: "🇵🇱",
    color: "#F7C7D3",
  },
  //   sv: {
  //     name: "Swedish",
  //     nativeName: "Svenska",
  //     flag: "🇸🇪",
  //     color: "#BFD9F7",
  //   },
  no: {
    name: "Norwegian",
    nativeName: "Norsk",
    flag: "🇳🇴",
    color: "#B8CFF6",
  },
  //   da: {
  //     name: "Danish",
  //     nativeName: "Dansk",
  //     flag: "🇩🇰",
  //     color: "#F2B7B7",
  //   },
  //   fi: {
  //     name: "Finnish",
  //     nativeName: "Suomi",
  //     flag: "🇫🇮",
  //     color: "#C7DBF7",
  //   },
  el: {
    name: "Greek",
    nativeName: "Ellinika",
    flag: "🇬🇷",
    color: "#BDD6F7",
  },
  he: {
    name: "Hebrew",
    nativeName: "ivrit",
    flag: "🇮🇱",
    color: "#C8DCF7",
  },
  cs: {
    name: "Czech",
    nativeName: "Čeština",
    flag: "🇨🇿",
    color: "#BFD5F4",
  },
  //   hu: {
  //     name: "Hungarian",
  //     nativeName: "Magyar",
  //     flag: "🇭🇺",
  //     color: "#C5E3C9",
  //   },
  //   ro: {
  //     name: "Romanian",
  //     nativeName: "Română",
  //     flag: "🇷🇴",
  //     color: "#F4D27A",
  //   },
  uk: {
    name: "Ukrainian",
    nativeName: "Ukrainska",
    flag: "🇺🇦",
    color: "#C9E2FA",
  },
  //   th: {
  //     name: "Thai",
  //     nativeName: "thai",
  //     flag: "🇹🇭",
  //     color: "#C6D5F7",
  //   },
  //   vi: {
  //     name: "Vietnamese",
  //     nativeName: "Tiếng Việt",
  //     flag: "🇻🇳",
  //     color: "#F4D37A",
  //   },
  //   id: {
  //     name: "Indonesian",
  //     nativeName: "Bahasa Indonesia",
  //     flag: "🇮🇩",
  //     color: "#F5B9B9",
  //   },
  fa: {
    name: "Persian",
    nativeName: "farsi",
    flag: "🇮🇷",
    color: "#BFE1C2",
  },
  //   sw: {
  //     name: "Swahili",
  //     nativeName: "Kiswahili",
  //     flag: "🇹🇿",
  //     color: "#B8DFC8",
  //   },
  is: {
    name: "Icelandic",
    nativeName: "Íslenska",
    flag: "🇮🇸",
    color: "#BFD9F7",
  },

  la: {
    name: "Latin",
    nativeName: "Latina",
    flag: "🇻🇦",
    color: "#E6D7B8",
  },
} as const;

export const BTN_STYLE = "border border-white/50 rounded transition hover:bg-[#333] px-4 py-2 font-mono text-sm active:bg-black";
