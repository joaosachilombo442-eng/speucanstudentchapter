import { useState, type FormEvent, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  CalendarDays,
  Check,
  Clock3,
  FileText,
  Factory,
  GraduationCap,
  Handshake,
  Images,
  Leaf,
  LayoutDashboard,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Microscope,
  Newspaper,
  Phone,
  Search,
  Settings2,
  ShieldCheck,
  UserRound,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import logoAsset from "@/assets/spe-ucan-logo.png.asset.json";
import offshoreImage from "@/assets/spe-offshore-platform.jpg";

const navItems = [
  { label: "Início", href: "/" },
  { label: "Sobre Nós", href: "/about" },
  { label: "Actividades e Eventos", href: "/activities" },
  { label: "Notícias", href: "/news" },
  { label: "Programas e Projectos", href: "/programs" },
  { label: "Parcerias", href: "/partnerships" },
  { label: "Galeria", href: "/gallery" },
  { label: "Contactos", href: "/contact" },
] as const;

type PageKey =
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

const pageContent: Record<
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

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-8 xl:px-12">
        <Link to="/" aria-label="SPE UCAN — página inicial" className="shrink-0">
          <img
            src={logoAsset.url}
            alt="Universidade Católica de Angola — SPE Student Chapter"
            className="h-[56px] w-auto object-contain sm:h-[62px]"
          />
        </Link>
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Navegação principal">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`whitespace-nowrap text-[12px] font-semibold transition-colors ${pathname === item.href ? "text-primary" : "text-foreground/80 hover:text-primary"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button
          asChild
          className="hidden h-10 shrink-0 px-4 text-[12px] font-semibold sm:inline-flex"
        >
          <Link to="/members">
            Tornar-se Membro <ArrowUpRight aria-hidden="true" />
          </Link>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="xl:hidden"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      {menuOpen && (
        <nav
          className="border-t border-border bg-background px-5 pb-5 pt-2 xl:hidden"
          aria-label="Navegação móvel"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-border py-3 text-sm font-medium text-foreground hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="mt-4 w-full">
            <Link to="/members" onClick={() => setMenuOpen(false)}>
              Tornar-se Membro <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-12 lg:py-16">
        <div>
          <img
            src={logoAsset.url}
            alt="Universidade Católica de Angola — SPE Student Chapter"
            className="mb-5 h-[88px] w-auto bg-background object-contain p-2"
          />
          <p className="max-w-md text-sm leading-7 text-primary-foreground/75">
            Núcleo académico da Society of Petroleum Engineers na Universidade Católica de Angola,
            com ligação ao Instituto de Recursos Minerais, Ambiente e Tecnologias.
          </p>
        </div>
        <div>
          <h2 className="font-display text-sm font-bold">Explorar</h2>
          <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 text-sm text-primary-foreground/75">
            {navItems.slice(1, 7).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="transition-colors hover:text-primary-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-display text-sm font-bold">Contactos institucionais</h2>
          <div className="mt-4 space-y-3 text-sm text-primary-foreground/75">
            <a
              href="mailto:spe.ucan.chapter@gmail.com"
              className="flex items-start gap-2 hover:text-primary-foreground"
            >
              <Mail className="mt-0.5 size-4 shrink-0" /> spe.ucan.chapter@gmail.com
            </a>
            <a
              href="tel:+244943798349"
              className="flex items-start gap-2 hover:text-primary-foreground"
            >
              <Phone className="mt-0.5 size-4 shrink-0" /> +244 943 798 349
            </a>
            <a
              href="https://linkedin.com/company/spe-ucan"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-primary-foreground"
            >
              LinkedIn <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-4 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <span>SPE UCAN Student Chapter · Universidade Católica de Angola</span>
          <span>Conteúdo institucional sujeito a validação oficial.</span>
        </div>
      </div>
    </footer>
  );
}

function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function PageIntro({ page }: { page: Exclude<PageKey, "home" | "admin"> }) {
  const content = pageContent[page];
  return (
    <section className="bg-ice">
      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-24">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
          {content.eyebrow}
        </p>
        <div className="institutional-rule mt-5" />
        <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.12] text-foreground sm:text-5xl lg:text-6xl">
          {content.heading}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {content.lead}
        </p>
      </div>
    </section>
  );
}

function SectionTitle({
  eyebrow,
  title,
  text,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <>
        {eyebrow && (
          <p
            className={`text-xs font-bold uppercase tracking-[0.12em] ${light ? "text-energy" : "text-primary"}`}
          >
            {eyebrow}
          </p>
        )}
        <div className="institutional-rule mt-4" />
        <h2
          className={`mt-5 font-display text-3xl font-bold leading-tight sm:text-4xl ${light ? "text-primary-foreground" : "text-foreground"}`}
        >
          {title}
        </h2>
        {text && (
          <p
            className={`mt-4 leading-7 ${light ? "text-primary-foreground/75" : "text-muted-foreground"}`}
          >
            {text}
          </p>
        )}
      </>
    </div>
  );
}

const activityAreas = [
  {
    title: "Formação e capacitação",
    text: "Aprendizagem técnica e desenvolvimento de competências profissionais.",
    icon: GraduationCap,
  },
  {
    title: "Investigação científica",
    text: "Promoção da investigação e divulgação de conhecimento científico.",
    icon: Microscope,
  },
  {
    title: "Eventos e conferências",
    text: "Palestras, workshops, seminários e encontros académicos.",
    icon: CalendarDays,
  },
  {
    title: "Visitas técnicas",
    text: "Contacto com empresas e instalações do sector energético.",
    icon: Factory,
  },
  {
    title: "Mentoria e carreira",
    text: "Orientação profissional e oportunidades de aprendizagem com profissionais.",
    icon: Users,
  },
  {
    title: "Energia e sustentabilidade",
    text: "Educação energética e diálogo sobre responsabilidade ambiental.",
    icon: Leaf,
  },
];

function ActivityCards() {
  return (
    <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {activityAreas.map(({ title, text, icon: Icon }) => (
        <article key={title} className="bg-background p-6 sm:p-8">
          <Icon className="size-6 text-primary" aria-hidden="true" />
          <h3 className="mt-5 font-display text-lg font-bold text-foreground">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
        </article>
      ))}
    </div>
  );
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="mt-8 border border-dashed border-border bg-background px-5 py-10 text-center sm:py-14">
      <CalendarDays className="mx-auto size-7 text-primary" aria-hidden="true" />
      <h3 className="mt-4 font-display text-lg font-bold text-foreground">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}

function HomePage() {
  return (
    <SiteLayout>
      <section className="relative isolate flex min-h-[680px] items-center overflow-hidden bg-foreground sm:min-h-[690px] lg:min-h-[720px]">
        <img
          src={offshoreImage}
          alt="Instalação de produção de energia offshore no oceano Atlântico"
          width={1792}
          height={1024}
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-foreground/70" />
        <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12">
          <p className="max-w-xl text-xs font-bold uppercase tracking-[0.14em] text-energy sm:text-sm">
            {pageContent.home.eyebrow}
          </p>
          <div className="institutional-rule mt-5" />
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-extrabold leading-[1.05] text-primary-foreground sm:text-6xl lg:text-7xl">
            Conhecimento, engenharia e energia.{" "}
            <span className="text-energy">O futuro começa aqui.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-primary-foreground/85 sm:text-lg sm:leading-8">
            Uma comunidade académica dedicada ao desenvolvimento científico, técnico e profissional
            dos futuros líderes da indústria energética.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/about">
                Conheça a SPE UCAN <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground/60 bg-background/10 text-primary-foreground hover:bg-background hover:text-foreground"
            >
              <Link to="/members">
                Torne-se Membro <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t border-primary-foreground/20 bg-foreground/40">
          <div className="mx-auto grid max-w-[1440px] gap-4 px-5 py-5 text-xs text-primary-foreground/85 sm:grid-cols-3 sm:px-8 lg:px-12">
            <p>Universidade Católica de Angola</p>
            <p>IRMAT · Instituto de Recursos Minerais, Ambiente e Tecnologias</p>
            <p>Luanda · Angola</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-12 lg:py-24">
        <SectionTitle eyebrow="Quem somos" title="Uma ponte entre a universidade e a indústria." />
        <div>
          <p className="text-lg leading-8 text-muted-foreground">
            A SPE UCAN Student Chapter é um núcleo académico estudantil da Society of Petroleum
            Engineers (SPE), estabelecido na Universidade Católica de Angola, com o propósito de
            promover o desenvolvimento científico, académico e profissional dos estudantes,
            particularmente nas áreas de engenharia, geociências, petróleo e energia.
          </p>
          <p className="mt-5 leading-7 text-muted-foreground">
            A organização procura estabelecer uma ponte entre a universidade e a indústria,
            proporcionando oportunidades de aprendizagem, contacto com profissionais,
            desenvolvimento de competências técnicas, participação em projectos de investigação e
            integração no sector energético.
          </p>
          <Button asChild variant="link" className="mt-5 h-auto px-0">
            <Link to="/about">
              Conheça a organização <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="bg-ice">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <SectionTitle
            eyebrow="Áreas de actividade"
            title="Aprendizagem com ligação ao sector."
            text="Uma agenda académica que cruza conhecimento técnico, colaboração e desenvolvimento profissional."
          />
          <ActivityCards />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionTitle
            eyebrow="Agenda"
            title="Próximas actividades"
            text="Palestras, formações e encontros académicos."
          />
          <Button asChild variant="outline">
            <Link to="/activities">
              Ver actividades <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <EmptyState
          title="Não há eventos publicados"
          text="A agenda será actualizada quando houver actividades confirmadas pela organização."
        />
      </section>

      <section className="bg-ice">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-12 lg:py-24">
          <img
            src={offshoreImage}
            alt="Plataforma de produção de energia em alto-mar"
            width={1792}
            height={1024}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
          <div>
            <SectionTitle
              eyebrow="Contexto académico"
              title="Uma comunidade na UCAN."
              text="A SPE UCAN Student Chapter está estabelecida na Universidade Católica de Angola, em ligação ao Instituto de Recursos Minerais, Ambiente e Tecnologias (IRMAT)."
            />
            <p className="mt-6 text-sm leading-7 text-muted-foreground">
              A apresentação de representantes académicos e institucionais será actualizada após
              confirmação oficial das informações.
            </p>
            <Button asChild variant="link" className="mt-4 h-auto px-0">
              <Link to="/about">
                Saiba mais <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle
              eyebrow="Notícias e publicações"
              title="Conhecimento que se partilha."
              text="Comunicados, artigos técnicos e registos das actividades."
            />
            <EmptyState
              title="Ainda sem publicações"
              text="As notícias e publicações institucionais serão apresentadas aqui após validação e publicação."
            />
            <Button asChild variant="link" className="mt-4 h-auto px-0">
              <Link to="/news">
                Explorar publicações <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <SectionTitle
              eyebrow="Comunidade"
              title="Liderança em construção."
              text="Os nomes e cargos do Board serão apresentados após validação oficial."
            />
            <div className="mt-8 flex items-start gap-4 border border-border p-5">
              <UserRound className="mt-1 size-5 shrink-0 text-primary" />
              <div>
                <p className="font-display font-bold">Informação institucional pendente</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Os perfis dos membros do Board e representantes académicos aguardam os dados
                  oficiais da organização.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-foreground">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-energy">Colaboração</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
              Construir relações que aproximam a academia e a indústria.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-primary-foreground/75">
              A organização está aberta ao diálogo com empresas e instituições interessadas em
              colaborar.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-foreground"
          >
            <Link to="/partnerships">
              Saiba como colaborar <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-24">
        <div>
          <SectionTitle
            eyebrow="Faça parte"
            title="Descubra como participar da comunidade SPE UCAN."
            text="Consulte as orientações e manifeste o seu interesse. Os critérios oficiais de adesão serão publicados após confirmação."
          />
        </div>
        <Button asChild size="lg">
          <Link to="/members">
            Descubra como participar <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </section>
    </SiteLayout>
  );
}

function AboutPage() {
  return (
    <SiteLayout>
      <PageIntro page="about" />
      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div>
          <SectionTitle eyebrow="A SPE" title="Conhecimento ao serviço da engenharia." />
          <p className="mt-6 leading-7 text-muted-foreground">
            A Society of Petroleum Engineers (SPE) reúne profissionais e estudantes interessados na
            engenharia de petróleo e áreas relacionadas. A história institucional da SPE e os dados
            sobre a secção local serão acrescentados após verificação e confirmação oficiais.
          </p>
          <div className="mt-6 border-l-2 border-primary p-4 text-sm leading-6 text-muted-foreground">
            A existência e a relação de uma secção local da SPE em Angola ainda não foram
            confirmadas para publicação.
          </div>
        </div>
        <img
          src={offshoreImage}
          alt="Infra-estrutura de produção offshore"
          width={1792}
          height={1024}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover"
        />
      </section>
      <section className="bg-ice">
        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <SectionTitle
            eyebrow="Percurso institucional"
            title="A história da SPE UCAN será contada aqui."
            text="Uma linha do tempo preparada para marcos, descrições e registos fotográficos confirmados pela organização."
          />
          <EmptyState
            title="Marcos institucionais por confirmar"
            text="As datas, os marcos e as fotografias históricas aguardam validação oficial antes de serem publicados."
          />
        </div>
      </section>
      <section className="mx-auto grid max-w-[1440px] gap-px border-x border-border bg-border sm:grid-cols-3">
        <article className="bg-background p-7 sm:p-9">
          <BookOpen className="size-6 text-primary" />
          <h2 className="mt-5 font-display text-xl font-bold">Missão</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Promover e impulsionar o intercâmbio científico-académico no sector petrolífero,
            contribuindo para a formação de profissionais preparados para os desafios presentes e
            futuros da indústria.
          </p>
        </article>
        <article className="bg-background p-7 sm:p-9">
          <ArrowRight className="size-6 text-primary" />
          <h2 className="mt-5 font-display text-xl font-bold">Visão proposta</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Ser uma referência académica estudantil em Angola na promoção do conhecimento, da
            inovação e do desenvolvimento profissional nos sectores do petróleo, gás e energia.
          </p>
          <p className="mt-3 text-xs font-semibold text-primary">
            Proposta sujeita à aprovação institucional.
          </p>
        </article>
        <article className="bg-background p-7 sm:p-9">
          <ShieldCheck className="size-6 text-primary" />
          <h2 className="mt-5 font-display text-xl font-bold">Valores propostos</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
            {[
              "Excelência académica e profissional",
              "Integridade e responsabilidade",
              "Inovação e investigação científica",
              "Colaboração e espírito de equipa",
              "Sustentabilidade ambiental",
              "Liderança e desenvolvimento contínuo",
            ].map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs font-semibold text-primary">
            Propostos para validação institucional.
          </p>
        </article>
      </section>
      <section className="bg-ice">
        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <SectionTitle
            eyebrow="Estrutura"
            title="Apresentação da equipa"
            text="A estrutura organizacional, o Board e os representantes académicos serão publicados depois de confirmação dos nomes, cargos e biografias."
          />
          <div className="mt-8 border border-border bg-background p-7">
            <Users className="size-6 text-primary" />
            <p className="mt-4 font-display font-bold">Perfis aguardam informação oficial</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Nenhum nome ou cargo foi presumido nesta apresentação.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function ActivitiesPage() {
  const [category, setCategory] = useState("Todas");
  const [view, setView] = useState<"agenda" | "calendar">("agenda");
  const categories = [
    "Todas",
    "Conferências",
    "Workshops",
    "Visitas técnicas",
    "Formação",
    "Competições",
    "Seminários",
  ];
  return (
    <SiteLayout>
      <PageIntro page="activities" />
      <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <SectionTitle
          eyebrow="Agenda"
          title="Actividades e eventos"
          text="Consulte a agenda quando novas actividades forem confirmadas."
        />
        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2" aria-label="Filtrar por categoria">
            {categories.map((item) => (
              <Button
                key={item}
                size="sm"
                variant={category === item ? "default" : "outline"}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </Button>
            ))}
          </div>
          <div className="flex gap-2" aria-label="Vista da agenda">
            <Button
              size="sm"
              variant={view === "agenda" ? "secondary" : "outline"}
              onClick={() => setView("agenda")}
              aria-pressed={view === "agenda"}
            >
              Lista
            </Button>
            <Button
              size="sm"
              variant={view === "calendar" ? "secondary" : "outline"}
              onClick={() => setView("calendar")}
              aria-pressed={view === "calendar"}
            >
              Calendário
            </Button>
          </div>
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-bold">
              {view === "calendar" ? "Calendário de actividades" : "Próximas actividades"}
            </h2>
            <EmptyState
              title={
                view === "calendar"
                  ? "Sem eventos confirmados no calendário"
                  : "Não há eventos publicados"
              }
              text="Os detalhes dos eventos aparecerão aqui após confirmação: data, horário, local, categoria e inscrição."
            />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold">Actividades anteriores</h2>
            <EmptyState
              title="Sem registos publicados"
              text="Registos fotográficos, relatórios e documentos serão disponibilizados após validação institucional."
            />
          </div>
        </div>
        <div className="mt-14 border-t border-border pt-10">
          <SectionTitle
            eyebrow="Participação"
            title="Quer receber informações sobre actividades?"
            text="Consulte a página de adesão para conhecer as oportunidades de participação e manifestar o seu interesse."
          />
          <Button asChild className="mt-6">
            <Link to="/members">
              Informações para membros <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}

function NewsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const categories = [
    "Todas",
    "Notícias institucionais",
    "Comunicados",
    "Artigos técnicos",
    "Investigação",
    "Relatórios",
  ];
  return (
    <SiteLayout>
      <PageIntro page="news" />
      <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <SectionTitle
          eyebrow="Arquivo editorial"
          title="Publicações institucionais"
          text="Conteúdos com autoria, data e categoria serão publicados após validação editorial."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-[minmax(220px,1fr)_auto] sm:items-center">
          <label className="relative block max-w-lg">
            <span className="sr-only">Pesquisar publicações</span>
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Pesquisar publicações"
              className="pl-10"
            />
          </label>
          <div className="flex flex-wrap gap-2" aria-label="Filtrar publicações">
            {categories.map((item) => (
              <Button
                key={item}
                size="sm"
                variant={category === item ? "default" : "outline"}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
        <EmptyState
          title="Ainda sem publicações"
          text={
            query
              ? "Não foram encontradas publicações. Os resultados aparecerão aqui quando houver conteúdos publicados."
              : "As notícias institucionais, artigos técnicos, relatórios e comunicados serão apresentados aqui quando estiverem disponíveis."
          }
        />
        <div className="mt-12 border-t border-border pt-10">
          <p className="text-sm leading-7 text-muted-foreground">
            Relatórios e documentos poderão incluir versões para consulta online e ficheiros
            descarregáveis após publicação oficial.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}

const programAreas = [
  {
    icon: GraduationCap,
    title: "Capacitação técnica",
    text: "Formação e desenvolvimento de competências relacionadas com engenharia e energia.",
  },
  {
    icon: Microscope,
    title: "Investigação e divulgação",
    text: "Actividades de investigação e comunicação do conhecimento científico.",
  },
  {
    icon: UserRound,
    title: "Mentoria e carreira",
    text: "Orientação académica e profissional e contacto com profissionais da indústria.",
  },
  {
    icon: Wrench,
    title: "Competições técnicas",
    text: "Participação em iniciativas como o Petrobowl, conforme a agenda da organização.",
  },
  {
    icon: Leaf,
    title: "Energia e ambiente",
    text: "Iniciativas de educação energética e responsabilidade ambiental.",
  },
  {
    icon: Handshake,
    title: "Acção académica e social",
    text: "Projectos de colaboração, participação estudantil e desenvolvimento da comunidade.",
  },
];

function ProgramsPage() {
  return (
    <SiteLayout>
      <PageIntro page="programs" />
      <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <SectionTitle
          eyebrow="Áreas de iniciativa"
          title="Possibilidades para desenvolver ideias."
          text="As áreas abaixo reflectem objectivos e iniciativas possíveis, não projectos activos ou resultados já alcançados."
        />
        <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {programAreas.map(({ icon: Icon, title, text }) => (
            <article key={title} className="bg-background p-7">
              <Icon className="size-6 text-primary" aria-hidden="true" />
              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Área de iniciativa
              </p>
              <h2 className="mt-2 font-display text-lg font-bold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">
          A organização poderá apresentar objectivos, actividades, situação e relatórios de cada
          projecto quando existirem informações oficiais para publicação.
        </div>
      </section>
    </SiteLayout>
  );
}

function PartnershipsPage() {
  return (
    <SiteLayout>
      <PageIntro page="partnerships" />
      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1fr_0.85fr] lg:gap-20 lg:px-12">
        <div>
          <SectionTitle
            eyebrow="Parcerias"
            title="Uma colaboração com propósito."
            text="O diálogo com empresas, universidades e instituições pode criar oportunidades de aprendizagem e aproximar a formação académica dos desafios do sector."
          />
          <div className="mt-7 space-y-4 text-sm leading-7 text-muted-foreground">
            <p>
              As áreas de colaboração podem incluir palestras e seminários, visitas técnicas,
              mentoria, capacitação e actividades de investigação.
            </p>
            <p>
              O formato, a disponibilidade e os termos de cada iniciativa devem ser acordados com a
              organização.
            </p>
          </div>
          <Button asChild className="mt-7">
            <a href="mailto:spe.ucan.chapter@gmail.com?subject=Parceria%20institucional">
              Fale sobre uma parceria <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </div>
        <div className="bg-ice p-7 sm:p-9">
          <Handshake className="size-7 text-primary" />
          <h2 className="mt-5 font-display text-2xl font-bold">Rede institucional</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Não foram fornecidos logótipos ou nomes de parceiros para publicação. Esta área será
            actualizada quando as parcerias forem confirmadas.
          </p>
          <div className="mt-6 border-t border-border pt-5 text-sm text-muted-foreground">
            Empresas, universidades e instituições interessadas podem contactar a equipa.
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function PrivacyNotice({ children }: { children: ReactNode }) {
  return (
    <div className="mt-5 flex items-start gap-3 border border-border bg-ice p-4">
      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
      <p className="text-xs leading-5 text-muted-foreground">{children}</p>
    </div>
  );
}

function InterestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }
  if (submitted)
    return (
      <div role="status" className="border border-primary/30 bg-ice p-5">
        <Check className="size-5 text-primary" />
        <p className="mt-3 font-display font-bold">Formulário validado nesta pré-visualização.</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          A candidatura não foi enviada nem guardada. O envio ficará disponível quando a organização
          ligar um sistema seguro de tratamento de dados.
        </p>
        <Button variant="outline" className="mt-4" onClick={() => setSubmitted(false)}>
          Voltar ao formulário
        </Button>
      </div>
    );
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nome completo">
          <Input name="name" autoComplete="name" required />
        </Field>
        <Field label="E-mail">
          <Input name="email" type="email" autoComplete="email" required />
        </Field>
        <Field label="Número de telefone">
          <Input name="phone" type="tel" autoComplete="tel" />
        </Field>
        <Field label="Curso">
          <Input name="course" required />
        </Field>
        <Field label="Universidade">
          <Input name="university" defaultValue="Universidade Católica de Angola" required />
        </Field>
        <Field label="Ano académico">
          <Input name="year" placeholder="Indique o ano" />
        </Field>
      </div>
      <Field label="Áreas de interesse">
        <Input name="interests" placeholder="Ex.: petróleo, gás, geociências, energia" />
      </Field>
      <Field label="Motivação para integrar a organização">
        <Textarea name="motivation" required className="min-h-28" />
      </Field>
      <label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          required
          className="mt-1 size-4 accent-primary"
        />
        Autorizo o contacto sobre a minha manifestação de interesse. Compreendo que esta
        pré-visualização não guarda nem envia os meus dados.
      </label>
      <Button type="submit" disabled={!consent}>
        Validar formulário <ArrowRight aria-hidden="true" />
      </Button>
      <PrivacyNotice>
        Os dados introduzidos são usados apenas nesta demonstração local. Não são transmitidos nem
        guardados.
      </PrivacyNotice>
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-2 text-sm font-medium text-foreground">
      {label}
      {children}
    </label>
  );
}

function MembersPage() {
  const benefits = [
    "Contacto com profissionais da indústria",
    "Desenvolvimento de competências técnicas",
    "Participação em eventos e workshops",
    "Networking académico e profissional",
    "Oportunidades de mentoria",
    "Participação em competições técnicas",
    "Integração numa comunidade internacional de engenharia",
  ];
  const steps = [
    "Conhecer a organização",
    "Consultar os critérios de adesão",
    "Preencher o formulário de candidatura",
    "Receber orientação da equipa responsável",
    "Acompanhar o processo de inscrição",
  ];
  return (
    <SiteLayout>
      <PageIntro page="members" />
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div>
          <SectionTitle
            eyebrow="Oportunidades"
            title="Faça parte da comunidade."
            text="A participação pode abrir caminhos para aprender, colaborar e conhecer melhor o sector."
          />
          <ul className="mt-7 space-y-4">
            {benefits.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-5 text-muted-foreground">
            As oportunidades dependem das actividades e da disponibilidade da organização; não
            constituem benefícios garantidos.
          </p>
          <div className="mt-10 border-t border-border pt-8">
            <h2 className="font-display text-xl font-bold">Como manifestar interesse</h2>
            <ol className="mt-5 space-y-4">
              {steps.map((item, index) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="flex size-7 shrink-0 items-center justify-center border border-primary text-xs font-bold text-primary">
                    0{index + 1}
                  </span>
                  <span className="pt-1 text-sm leading-5 text-muted-foreground">
                    {item}
                    {index === 1 && (
                      <span className="mt-1 block text-xs">
                        Critérios oficiais aguardam confirmação.
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-8 border border-border p-5">
            <MessageCircle className="size-5 text-primary" />
            <h3 className="mt-3 font-display font-bold">Apoio por WhatsApp</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              O canal oficial de WhatsApp será divulgado quando a organização fornecer o respectivo
              link.
            </p>
          </div>
        </div>
        <div className="bg-ice p-6 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
            Manifestação de interesse
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold">Conheça a equipa SPE UCAN.</h2>
          <p className="mb-7 mt-2 text-sm leading-6 text-muted-foreground">
            Preencha os seus dados para validar o formulário nesta pré-visualização.
          </p>
          <InterestForm />
        </div>
      </section>
    </SiteLayout>
  );
}

function GalleryPage() {
  const [category, setCategory] = useState("Todas");
  const categories = [
    "Todas",
    "Visitas técnicas",
    "Conferências",
    "Workshops",
    "Actividades estudantis",
    "Vídeos",
  ];
  return (
    <SiteLayout>
      <PageIntro page="gallery" />
      <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            eyebrow="Galeria multimédia"
            title="Registos da comunidade."
            text="Fotografias, vídeos e legendas serão publicados com identificação das actividades confirmadas."
          />
          <div className="flex flex-wrap gap-2" aria-label="Filtrar galeria">
            {categories.map((item) => (
              <Button
                key={item}
                size="sm"
                variant={category === item ? "default" : "outline"}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
        <EmptyState
          title="Ainda sem imagens publicadas"
          text="A galeria será actualizada com fotografias autorizadas e registos de actividades oficiais."
        />
      </section>
    </SiteLayout>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }
  if (submitted)
    return (
      <div role="status" className="border border-primary/30 bg-ice p-5">
        <Check className="size-5 text-primary" />
        <p className="mt-3 font-display font-bold">Mensagem validada nesta pré-visualização.</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          A mensagem não foi enviada nem guardada. Para contacto imediato, utilize o e-mail ou
          telefone institucional.
        </p>
        <Button variant="outline" className="mt-4" onClick={() => setSubmitted(false)}>
          Voltar ao formulário
        </Button>
      </div>
    );
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Nome completo">
        <Input name="name" autoComplete="name" required />
      </Field>
      <Field label="E-mail">
        <Input name="email" type="email" autoComplete="email" required />
      </Field>
      <Field label="Assunto">
        <Input name="subject" required />
      </Field>
      <Field label="Mensagem">
        <Textarea name="message" required className="min-h-36" />
      </Field>
      <Button type="submit">
        Validar mensagem <ArrowRight aria-hidden="true" />
      </Button>
      <PrivacyNotice>
        A sua mensagem não é enviada nem guardada nesta pré-visualização. Não inclua informação
        sensível.
      </PrivacyNotice>
    </form>
  );
}

function ContactPage() {
  return (
    <SiteLayout>
      <PageIntro page="contact" />
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-12 lg:py-20">
        <div>
          <SectionTitle
            eyebrow="Contactos institucionais"
            title="Fale directamente com a SPE UCAN."
          />
          <div className="mt-8 space-y-6">
            <a
              href="mailto:spe.ucan.chapter@gmail.com"
              className="flex gap-4 border-b border-border pb-5"
            >
              <Mail className="mt-1 size-5 shrink-0 text-primary" />
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  E-mail institucional
                </span>
                <span className="mt-1 block font-medium">spe.ucan.chapter@gmail.com</span>
              </span>
            </a>
            <a href="tel:+244943798349" className="flex gap-4 border-b border-border pb-5">
              <Phone className="mt-1 size-5 shrink-0 text-primary" />
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Telefone
                </span>
                <span className="mt-1 block font-medium">+244 943 798 349</span>
              </span>
            </a>
            <div className="flex gap-4 border-b border-border pb-5">
              <MapPin className="mt-1 size-5 shrink-0 text-primary" />
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Endereço
                </span>
                <span className="mt-1 block leading-6">
                  Universidade Católica de Angola (UCAN), Instituto de Recursos Minerais, Ambiente e
                  Tecnologias (IRMAT), Luanda, Angola.
                </span>
              </span>
            </div>
            <a
              href="https://linkedin.com/company/spe-ucan"
              target="_blank"
              rel="noreferrer"
              className="flex gap-4"
            >
              <Building2 className="mt-1 size-5 shrink-0 text-primary" />
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  LinkedIn
                </span>
                <span className="mt-1 block font-medium">
                  SPE UCAN <ArrowUpRight className="inline size-4" />
                </span>
              </span>
            </a>
          </div>
          <div className="mt-8 border-t border-border pt-6">
            <h2 className="font-display text-sm font-bold">Outros canais</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
              <li>Instagram — URL oficial aguardando confirmação.</li>
              <li>WhatsApp — canal e grupo oficiais aguardam confirmação.</li>
              <li>Facebook — ainda não disponível.</li>
            </ul>
          </div>
          <div className="mt-8 border border-dashed border-border bg-ice p-5">
            <MapPin className="size-5 text-primary" />
            <p className="mt-3 font-display font-bold">Localização</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              O mapa será configurado quando a localização exacta for confirmada. Endereço
              institucional indicado acima.
            </p>
          </div>
        </div>
        <div className="bg-ice p-6 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
            Formulário de contacto
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold">Envie uma mensagem</h2>
          <p className="mb-7 mt-2 text-sm leading-6 text-muted-foreground">
            Para contacto imediato, utilize os canais institucionais. Este formulário não transmite
            dados nesta pré-visualização.
          </p>
          <ContactForm />
        </div>
      </section>
    </SiteLayout>
  );
}

const adminModules = [
  { label: "Visão geral", icon: LayoutDashboard },
  { label: "Notícias", icon: Newspaper },
  { label: "Eventos", icon: CalendarDays },
  { label: "Programas e projectos", icon: Wrench },
  { label: "Relatórios e documentos", icon: FileText },
  { label: "Galeria multimédia", icon: Images },
  { label: "Candidaturas a membros", icon: GraduationCap },
  { label: "Inscrições em eventos", icon: Users },
  { label: "Board", icon: UserRound },
  { label: "Perfis académicos", icon: BookOpen },
  { label: "Parcerias", icon: Handshake },
  { label: "Mensagens de contacto", icon: Mail },
  { label: "Redes sociais", icon: MessageCircle },
  { label: "Definições do site", icon: Settings2 },
  { label: "Administradores", icon: ShieldCheck },
];

function AdminPage() {
  const [selected, setSelected] = useState("Visão geral");
  const [filter, setFilter] = useState("");
  const filteredModules = adminModules.filter((module) =>
    module.label.toLowerCase().includes(filter.toLowerCase()),
  );
  return (
    <SiteLayout>
      <section className="bg-ice">
        <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
            Pré-visualização de interface
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold">Administração SPE UCAN</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            Esta interface ainda não tem autenticação, armazenamento de conteúdos ou dados ligados.
            Não introduza informações pessoais ou confidenciais.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1440px] gap-0 px-5 py-8 sm:px-8 lg:grid-cols-[280px_1fr] lg:px-12">
        <aside className="border border-border p-4">
          <label className="relative block">
            <span className="sr-only">Pesquisar módulos</span>
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              placeholder="Pesquisar módulos"
              className="pl-10"
            />
          </label>
          <nav className="mt-4 space-y-1" aria-label="Módulos administrativos">
            {filteredModules.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => setSelected(label)}
                className={`flex min-h-10 w-full items-center gap-3 px-3 text-left text-sm ${selected === label ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-ice hover:text-foreground"}`}
              >
                <Icon className="size-4 shrink-0" />
                {label}
              </button>
            ))}
          </nav>
        </aside>
        <div className="min-w-0 border border-t-0 border-border p-5 sm:p-8 lg:border-l-0 lg:border-t">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Painel demonstrativo
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold">{selected}</h2>
            </div>
            <span className="border border-border px-3 py-2 text-xs text-muted-foreground">
              Dados indisponíveis
            </span>
          </div>
          <div className="mt-7 grid gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
            {[
              "Notícias publicadas",
              "Próximos eventos",
              "Projectos",
              "Candidaturas",
              "Inscrições em eventos",
              "Mensagens pendentes",
            ].map((title) => (
              <article key={title} className="bg-background p-5">
                <p className="text-sm text-muted-foreground">{title}</p>
                <p className="mt-3 font-display text-3xl font-bold text-muted-foreground">—</p>
                <p className="mt-2 text-xs text-muted-foreground">Sem dados ligados</p>
              </article>
            ))}
          </div>
          <div className="mt-8 border border-dashed border-border p-8 text-center">
            <LayoutDashboard className="mx-auto size-7 text-primary" />
            <h3 className="mt-4 font-display font-bold">
              A gestão de conteúdos será activada após a configuração segura.
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              Publicações, candidaturas, mensagens e registos só poderão ser apresentados depois de
              ligar armazenamento real e autenticação adequada.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

export function Page({ page }: { page: PageKey }) {
  switch (page) {
    case "home":
      return <HomePage />;
    case "about":
      return <AboutPage />;
    case "activities":
      return <ActivitiesPage />;
    case "news":
      return <NewsPage />;
    case "programs":
      return <ProgramsPage />;
    case "partnerships":
      return <PartnershipsPage />;
    case "members":
      return <MembersPage />;
    case "gallery":
      return <GalleryPage />;
    case "contact":
      return <ContactPage />;
    case "admin":
      return <AdminPage />;
  }
}
