import Reverso from 'reverso-api';
const reverso = new Reverso();

const api = {
  conjugate: async (verb: string, lang: string) => await reverso.getConjugation(verb, lang)
};

export default api;
