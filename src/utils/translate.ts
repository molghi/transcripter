export async function translate(query: string, sourceLang: string, targetLang: string = "en") {
  //   const API_URL = `https://translate.argosopentech.com/translate`;
  const API_URL = `https://translate.terraprint.co/translate`;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: query,
      source: sourceLang,
      target: targetLang,
      format: "text",
    }),
  });

  if (!res.ok) {
    throw new Error("Translation failed");
  }

  const data = await res.json();

  console.log(data.translatedText);
  return data.translatedText;
}

// ============================================================================

export async function translate2(query: string, sourceLang: string, targetLang: string = "en"): Promise<string[]> {
  const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(query)}&langpair=${sourceLang}|${targetLang}`);

  const data = await res.json();

  const translations = [data.responseData.translatedText, ...(data.matches?.map((item: any) => item.translation) ?? [])];

  const uniqueTranslations = [...new Set(translations)];

  // console.log(uniqueTranslations);

  return uniqueTranslations;
}
