export const links = {
  whatsapp:
    "https://api.whatsapp.com/message/WKUAE2TTJXNWD1?autoload=1&app_absent=0",
  email: "mailto:contato@agenciadyzzi.com.br",
  instagram: "https://www.instagram.com/agenciadyzzi",
  linkedin:
    "https://www.linkedin.com/company/ag%C3%AAnciadyzzi/",
  portfolio: "https://portfolio.agenciadyzzi.com.br/",
  careers: "https://linktr.ee/agenciadyzzi",
} as const;

export const siteContent = {
  navigation: [
    { label: "Página Inicial", href: "#home" },
    { label: "Sobre a DYZZI", href: "#sobre" },
    { label: "Nossos Serviços", href: "#servicos" },
    { label: "Nosso Portfólio", href: links.portfolio, external: true },
    { label: "Contatos", href: "#contatos" },
  ],
  hero: {
    eyebrow: "Agência DYZZI",
    title: "Marketing Digital descomplicado, estratégico & criativo",
    cta: "Solicitar Orçamento",
  },
  about: {
    eyebrow: "Quem é a DYZZI?",
    title:
      "Marketing digital descomplicado, estratégico e criativo para fortalecer sua presença online.",
    body:
      "A DYZZI é uma agência de marketing digital embarcada no Porto Digital, formada por um time multidisciplinar que une estratégia, criatividade e tecnologia para impulsionar negócios no ambiente online. Nosso propósito é tornar o marketing mais acessível e inteligente para profissionais, marcas e empresas.",
    cta: "Solicitar Orçamento",
  },
  services: {
    eyebrow: "Nossos Serviços",
    title: "Como a DYZZI facilita?",
    items: [
      {
        title: "Gestão de marca",
        body:
          "Desenvolvemos estratégias de branding que fortalecem a identidade da sua marca, criando uma conexão emocional com seu público e aumentando o reconhecimento e a lealdade à marca.",
        icon: "/media/brand-icon.png",
      },
      {
        title: "Sistemas e automações",
        body:
          "Implementamos soluções tecnológicas personalizadas para otimizar processos, aumentar a eficiência e melhorar a experiência do usuário, garantindo que sua marca esteja sempre à frente.",
        icon: "/media/automa-icon.png",
      },
      {
        title: "Produção de conteúdo",
        body:
          "Criamos conteúdo relevante e envolvente que ressoe com seu público-alvo, aumentando o engajamento e a lealdade à sua marca, seja em blogs, redes sociais ou outras plataformas digitais.",
        icon: "/media/content-icon.png",
      },
      {
        title: "Design gráfico",
        body:
          "Criamos designs impactantes e memoráveis que refletem a essência da sua marca, atraindo e engajando seu público-alvo de forma eficaz.",
        icon: "/media/design-icon.png",
      },
      {
        title: "Gestão de redes sociais",
        body:
          "Gerenciamos suas redes sociais de forma estratégica, criando conteúdo relevante e interagindo com seu público para aumentar o engajamento e a visibilidade da sua marca.",
        icon: "/media/social-icon.png",
      },
      {
        title: "Tráfego pago",
        body:
          "Utilizamos estratégias de tráfego pago para aumentar a visibilidade da sua marca, direcionando tráfego qualificado para suas páginas e aumentando as conversões.",
        icon: "/media/trafego-icon.png",
      },
    ],
    cta: "Solicitar Orçamento",
  },
  projects: {
    eyebrow: "Nossos projetos",
    title: "Conheça os trabalhos\nque a DYZZI realizou",
    portfolioCta: "Ver portfolio completo",
    budgetCta: "Solicitar Orçamento",
    items: [
      {
        mp4: "/projects/project-1.mp4",
        poster: "/projects/project-1-poster.jpg",
      },
      {
        mp4: "/projects/project-2.mp4",
        poster: "/projects/project-2-poster.jpg",
      },
      {
        mp4: "/projects/project-3.mp4",
        poster: "/projects/project-3-poster.jpg",
      },
    ],
  },
  clients: {
    eyebrow: "Nossos Clientes",
    title: "Conheça algumas marcas que já se conectaram com a DYZZI",
    items: [
      { file: "bb-no-controle.png", alt: "BB no Controle" },
      { file: "IgaraLOL.png", alt: "IgaraLOL" },
      { file: "Kabum!.png", alt: "Kabum!" },
      { file: "arena-gamer.png", alt: "Arena Gamer" },
      { file: "panela-uazz.png", alt: "Panela Uazz" },
      { file: "fidellis-logo.png", alt: "Fidellis" },
      { file: "gustavo-henrique.png", alt: "Gustavo Henrique" },
      { file: "infinity-logo.png", alt: "Infinity" },
      { file: "apost-store.png", alt: "Apost Store" },
      { file: "urso-logo.png", alt: "Urso" },
      { file: "flor-logo.png", alt: "Flor" },
      { file: "Uana.png", alt: "Uana" },
      { file: "real-tec.jpg", alt: "Real Tec" },
      { file: "DocKit.png", alt: "DocKit" },
      { file: "atl-engenharia-logo.png", alt: "ATL Engenharia" },
    ],
    cta: "Solicitar Orçamento",
  },
  testimonials: {
    eyebrow: "Nossos Feedbacks",
    title: "O que os clientes falam\nsobre a DYZZI",
    items: [
      {
        quote:
          '"DYZZI, gostamos muito da consultoria! Conseguimos analisar e enxergar nosso negócio com outra visão mais moderna e realista. Participamos do Megafashion e foi uma experiência bastante enriquecedora, já vamos nos organizar pra participar de mais outras feiras. Estamos animadas com essa nova etapa cheia de desafios 💜"',
        author: "Cláudia Teles, A Maravilhosa",
      },
      {
        quote:
          '"Na minha percepção de empresária e trabalhando no ramo de gestão há mais de 15 anos. Hoje, nenhum negócio anda sem uma base consolidada nas mídias sociais. As pessoas buscam agilidade, informações rápidas pela internet, seja em Instagram, Google, site… o mundo evoluiu, e as mídias sociais também. Por isso, resolvi contratar os serviços da DYZZI, que desde o início vem trabalhando comigo desde o rebranding da marca, como gerenciamento das redes. DYZZI tem sido essencial nesse caminho, sempre disponível e disposta a mudar o que for necessário, trabalhando sempre dentro dos objetivos e com o que temos! DYZZI, obrigada pelo seu trabalho!"',
        author: "Talita Xavier, Duo Fast Beauty",
      },
      {
        quote:
          '"Trabalho incrível da DYZZI! A estratégia de marketing e redes sociais tem dado ótimo resultado, com mais alcance e engajamento. Muito profissionalismo e criatividade no dia a dia!"',
        author: "Caio Falcão, Fotógrafo",
      },
      {
        quote:
          '"Já conhecia o trabalho da DYZZI quando estivemos juntos no REC\'n Play, e quando veio a oportunidade de fazer um evento em Recife novamente, não pensei 2x em entrar em contrato e fechar esse pacote com a agencia para o Ponto BB no Controle. A equipe é maravilhosa, e só tenho a agradecer pela entrega maravilhosa e apoio que deram ❤️"',
        author: "Tiago Copello | Play Fest Gamer/Mity Produções Culturais",
      },
      {
        quote:
          '"Queria deixar registrado o quanto tenho gostado de trabalhar com vocês. O que mais me deixa feliz é o comprometimento, é algo que realmente se destaca — dá pra ver que vocês vestem a camisa em cada projeto. As ideias que vocês trazem são criativas, bem pensadas. O resultado final dos trabalhos sempre supera as expectativas. Dá pra notar o cuidado com os detalhes, a preocupação com o que realmente gera impacto, e isso faz toda a diferença. Além disso, o atendimento é muito descontraído, torando tudo mais leve sem perder o tom profissional. É fácil conversar, alinhar, ajustar — e isso torna o processo muito mais fluido e prazeroso. Parabéns pelo trabalho que vêm fazendo. É muito bom contar com uma agência que entrega com qualidade, visão estratégica e que ainda tem uma vibe boa de parceria."',
        author:
          "Marcílio Moura - Sócio Diretor - Coordenado Geral - Festival Panela do Jazz",
      },
    ],
    cta: "Solicitar Orçamento",
  },
  contactCta: {
    title: "Entre em contato e descubra como\nte ajudamos a crescer.",
    body:
      "Transforme ideias em impacto com a DYZZI. Do design estratégico à\ntecnologia inteligente, criamos soluções que conectam marcas e pessoas de forma memorável.",
    cta: "Solicitar Orçamento",
  },
  careers: {
    title: "Trabalhe conosco",
    body:
      "Quer fazer parte de um time criativo, estratégico e conectado com marcas que querem crescer? A DYZZI abre novas oportunidades de acordo com as demandas dos projetos e reúne nossas vagas ativas em um só lugar.",
    cta: "Ver vagas",
  },
  social: {
    title: "Conheça nossas redes",
    items: [
      {
        label: "Solicite Orçamento:",
        value: "contato@agenciadyzzi.com.br",
        href: links.email,
      },
      {
        label: "Nos encontre:",
        value: "Rua Bom Jesus - 125, Recife - PE - CEP 50030-170",
      },
      {
        label: "Instagram:",
        value: "@agenciadyzzi",
        href: links.instagram,
      },
      {
        label: "LinkedIn:",
        value: "@agenciadyzzi",
        href: links.linkedin,
      },
      {
        label: "Whatsapp:",
        value: "+55 (81) 9 9677-5499",
        href: links.whatsapp,
      },
    ],
  },
  footer: {
    identification: "Agência DYZZI - Comunicação Digital",
    slogan: "Let's make this easy!",
    cta: "Solicitar Orçamento",
    navigationTitle: "Navegação",
    navigation: [
      { label: "Página Inicial", href: "#home" },
      { label: "Sobre a DYZZI", href: "#sobre" },
      { label: "Nossos Serviços", href: "#servicos" },
      { label: "Portfólio", href: links.portfolio, external: true },
      { label: "Contatos", href: "#contatos" },
    ],
    socialTitle: "Social",
    social: [
      { label: "Instagram", href: links.instagram },
      { label: "Whatsapp", href: links.whatsapp },
      { label: "Linkedin", href: links.linkedin },
    ],
    contactTitle: "Contato",
    contact: [
      { label: "(81) 9 9677-5499", href: links.whatsapp },
      { label: "contato@agenciadyzzi.com.br", href: links.email },
      { label: "@agenciadyzzi", href: links.instagram },
    ],
    copyright: "Agência DYZZI © 2025 - Todos os direitos reservados",
    portoDigital: "Empresa embarcada no porto digital",
  },
} as const;

export type SiteContent = typeof siteContent;
