export type PageKey =
  | "home"
  | "about"
  | "activities"
  | "news"
  | "programs"
  | "partnerships"
  | "members"
  | "gallery"
  | "contact"
  | "admin";

export const pageContent: Record<
  PageKey,
  { title: string; description: string; eyebrow: string; heading: string; lead: string }
> = {
  home: {
    title: "SPE UCAN Student Chapter | Engenharia, Petróleo e Energia em Angola",
    description:
      "Conheça a SPE UCAN Student Chapter, uma comunidade académica dedicada à engenharia, ao desenvolvimento científico e à indústria energética em Angola.",
    eyebrow: "Sociedade de Engenheiros de Petróleo · UCAN · IRMAT",
    heading: "Conhecimento, engenharia e energia. O futuro começa aqui.",
    lead: "Uma comunidade académica dedicada ao desenvolvimento científico, técnico e profissional dos futuros líderes da indústria energética.",
  },
  about: {
    title: "Sobre Nós | SPE UCAN Student Chapter",
    description:
      "Conheça a missão, os valores e a estrutura institucional da SPE UCAN Student Chapter na Universidade Católica de Angola.",
    eyebrow: "A organização",
    heading: "Uma ponte entre a universidade e a indústria.",
    lead: "Um núcleo académico da Society of Petroleum Engineers na Universidade Católica de Angola, dedicado à aprendizagem e ao desenvolvimento profissional.",
  },
  activities: {
    title: "Actividades e Eventos | SPE UCAN Student Chapter",
    description:
      "Palestras, formação, visitas técnicas e outras áreas de actividade da SPE UCAN Student Chapter.",
    eyebrow: "Agenda e participação",
    heading: "Aprender, partilhar, avançar.",
    lead: "Conheça as áreas de actividade do Student Chapter. A agenda será actualizada quando houver eventos oficialmente confirmados.",
  },
  news: {
    title: "Notícias e Publicações | SPE UCAN Student Chapter",
    description:
      "Comunicados, artigos técnicos, investigação e relatórios da SPE UCAN Student Chapter.",
    eyebrow: "Publicações",
    heading: "Ideias e conhecimento em circulação.",
    lead: "Notícias, investigação e comunicados institucionais num espaço de partilha académica.",
  },
  programs: {
    title: "Programas e Projectos | SPE UCAN Student Chapter",
    description:
      "Áreas de iniciativa académica, capacitação, investigação e desenvolvimento profissional da SPE UCAN Student Chapter.",
    eyebrow: "Iniciativas",
    heading: "Conhecimento que ganha forma.",
    lead: "Áreas de iniciativa que ligam aprendizagem, investigação e desenvolvimento profissional no sector da energia.",
  },
  partnerships: {
    title: "Parcerias | SPE UCAN Student Chapter",
    description:
      "Oportunidades de colaboração académica, institucional e empresarial com a SPE UCAN Student Chapter.",
    eyebrow: "Colaboração institucional",
    heading: "Mais fortes quando aprendemos juntos.",
    lead: "Aproximar a universidade e a indústria através do diálogo, da partilha técnica e da colaboração.",
  },
  members: {
    title: "Tornar-se Membro | SPE UCAN Student Chapter",
    description:
      "Descubra oportunidades de participação na SPE UCAN Student Chapter e consulte o formulário de manifestação de interesse.",
    eyebrow: "Comunidade",
    heading: "O próximo passo começa com curiosidade.",
    lead: "Conheça oportunidades de participação e manifeste o seu interesse em integrar a comunidade SPE UCAN.",
  },
  gallery: {
    title: "Galeria | SPE UCAN Student Chapter",
    description:
      "Fotografias e registos audiovisuais das actividades e iniciativas da SPE UCAN Student Chapter.",
    eyebrow: "Registos visuais",
    heading: "Momentos de aprendizagem e partilha.",
    lead: "Um espaço para registar actividades, encontros e experiências do Student Chapter.",
  },
  contact: {
    title: "Contactos | SPE UCAN Student Chapter",
    description:
      "Entre em contacto com a SPE UCAN Student Chapter através dos canais institucionais disponíveis.",
    eyebrow: "Fale connosco",
    heading: "Estamos disponíveis para conversar.",
    lead: "Para questões académicas, colaboração ou informações sobre o Student Chapter, utilize os contactos institucionais abaixo.",
  },
  admin: {
    title: "Administração · Pré-visualização | SPE UCAN",
    description:
      "Pré-visualização da interface administrativa da SPE UCAN Student Chapter. Não ligada a dados ou autenticação.",
    eyebrow: "Gestão do site",
    heading: "Área administrativa",
    lead: "Pré-visualização da interface. A autenticação e os dados ainda não estão ligados.",
  },
};

export function pageHead(page: PageKey) {
  const content = pageContent[page];
  return {
    meta: [
      { title: content.title },
      { name: "description", content: content.description },
      { property: "og:title", content: content.title },
      { property: "og:description", content: content.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
