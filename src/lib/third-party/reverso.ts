import { parsePage } from '../page';

export const availableConjugationLanguages = {
  english: 'english',
  russian: 'russian',
  french: 'french',
  spanish: 'spanish',
  german: 'german',
  italian: 'italian',
  portuguese: 'portuguese',
  hebrew: 'hebrew',
  arabic: 'arabic',
  japanese: 'japanese'
};

export type AvailableConjugationLanguages = keyof typeof availableConjugationLanguages;

export const availableContextLanguages = {
  arabic: 'arabic',
  german: 'german',
  spanish: 'spanish',
  french: 'french',
  hebrew: 'hebrew',
  italian: 'italian',
  japanese: 'japanese',
  dutch: 'dutch',
  polish: 'polish',
  portuguese: 'portuguese',
  romanian: 'romanian',
  russian: 'russian',
  turkish: 'turkish',
  chinese: 'chinese',
  english: 'english'
};

export type AvailableContextLanguages = keyof typeof availableContextLanguages;

// Ref: https://github.com/s0ftik3/reverso-api/blob/master/src/reverso.js

const api = {
  conjugate: async (verb: string, targetLanguage: AvailableConjugationLanguages) => {
    if (!Object.values(availableConjugationLanguages).find((e) => e === targetLanguage)) {
      throw new Error('Invalid target language');
    }

    const url = new URL(
      `conjugation-${targetLanguage}-verb-${encodeURIComponent(verb)}.html`,
      'https://conjugator.reverso.net/'
    );
    const { window } = await parsePage(url.toString());
    const { document } = window;
    const conjugations: {
      url: string;
      verbTense?: string;
      phrase: string[];
      verb?: string;
    }[] = [];

    document.querySelectorAll('div[class="blue-box-wrap"]').forEach((wrapperElement) => {
      const verbTense = wrapperElement.attributes.getNamedItem('mobile-title')?.value.trim();

      wrapperElement.querySelectorAll(`li`).forEach((verbLineElement) => {
        const phrase: string[] = [];

        verbLineElement.childNodes.forEach((textElement) => {
          if (textElement?.textContent) phrase.push(textElement.textContent);
        });

        let verb = verbLineElement.querySelector(`i[class^="verbtxt"]`)?.textContent;

        if (!verb) {
          verb = verbLineElement.querySelector(`i[class^="hglhOver"]`)?.textContent;
        }

        if (!verb) console.warn(`Verb not found for ${verbTense}: ${phrase.join('')}`);

        conjugations.push({
          url: url.toString(),
          verbTense,
          phrase,
          verb: verb || undefined
        });
      });
    });

    window.close();

    return conjugations;
  },
  context: async (
    text: string,
    sourceLanguage: AvailableContextLanguages,
    targetLanguage: AvailableContextLanguages
  ) => {
    if (!Object.values(availableContextLanguages).find((e) => e === targetLanguage)) {
      throw new Error('Invalid target language');
    }

    if (!Object.values(availableContextLanguages).find((e) => e === sourceLanguage)) {
      throw new Error('Invalid source language');
    }

    const url = new URL(
      `translation/${sourceLanguage}-${targetLanguage}/${encodeURIComponent(text).replace(/%20/g, '+')}`,
      'https://context.reverso.net'
    );
    const { window } = await parsePage(url.toString());
    const { document } = window;

    const sourceDirection =
      sourceLanguage === availableContextLanguages.arabic
        ? `rtl ${availableContextLanguages.arabic}`
        : sourceLanguage === availableContextLanguages.hebrew
        ? 'rtl'
        : 'ltr';

    const targetDirection =
      targetLanguage === 'arabic'
        ? `rtl ${availableContextLanguages.arabic}`
        : targetLanguage === availableContextLanguages.hebrew
        ? 'rtl'
        : 'ltr';

    const sourceExamples =
      document.querySelector(`.example > div.src.${sourceDirection} > span.text`)?.textContent?.trim().split('\n') ||
      [];

    const targetExamples =
      document.querySelector(`.example > div.trg.${targetDirection} > span.text`)?.textContent?.trim().split('\n') ||
      [];

    const targetTranslations =
      document.querySelector(`#translations-content > div`)?.textContent?.trim().split('\n') || [];

    const examples = sourceExamples.map((e, i) => ({
      source: e.trim(),
      target: targetExamples[i].trim()
    }));
    const translations = targetTranslations.map((e) => e.trim());

    window.close();

    return { url: url.toString(), text, sourceLanguage, targetLanguage, examples, translations };
  }
};

export default api;
