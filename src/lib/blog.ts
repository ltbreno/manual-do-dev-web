export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: number;
  imageUrl: string;
  featured?: boolean;
  views?: number;
  content: string;
}

export const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Imigração":   { bg: "bg-[#002776]",           text: "text-white",                    border: "border-[#002776]" },
  "Negócios":    { bg: "bg-[var(--brand-verde-escuro)]", text: "text-white",             border: "border-[var(--brand-verde-escuro)]" },
  "Finanças":    { bg: "bg-[#b8860b]",            text: "text-white",                    border: "border-[#b8860b]" },
  "Vistos":      { bg: "bg-[var(--brand-verde)]", text: "text-white",                    border: "border-[var(--brand-verde)]" },
  "Vida nos EUA":{ bg: "bg-[#c2410c]",            text: "text-white",                    border: "border-[#c2410c]" },
  "Trabalho":    { bg: "bg-[#009c3b]",            text: "text-white",                    border: "border-[#009c3b]" },
  "Educação":    { bg: "bg-[#7c3aed]",            text: "text-white",                    border: "border-[#7c3aed]" },
  "Planejamento":{ bg: "bg-[#0e7490]",            text: "text-white",                    border: "border-[#0e7490]" },
};

export const ALL_CATEGORIES = Object.keys(CATEGORY_COLORS);

export const articles: Article[] = [
  {
    slug: "como-abrir-empresa-nos-eua",
    title: "Como Abrir uma Empresa nos EUA: Guia Completo para Brasileiros",
    excerpt: "Passo a passo detalhado para brasileiros que querem constituir uma LLC ou C-Corp nos Estados Unidos, com tudo sobre impostos, banking e compliance.",
    category: "Negócios",
    author: "Manual do Brasileiro",
    authorRole: "Redação",
    date: "2025-06-10",
    readTime: 12,
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    featured: true,
    views: 4820,
    content: `
      <h2>Por que abrir uma empresa nos EUA?</h2>
      <p>Ter uma empresa americana abre portas que muitos brasileiros nem imaginam: acesso a capital internacional, credibilidade global, possibilidade de vistos de negócios e uma estrutura tributária que pode ser altamente favorável dependendo do seu modelo de negócio.</p>

      <h2>LLC ou C-Corp: qual escolher?</h2>
      <p>A <strong>LLC (Limited Liability Company)</strong> é a escolha mais comum para pequenos empresários e nômades digitais. Ela oferece proteção patrimonial, flexibilidade tributária e baixo custo de manutenção.</p>
      <p>Já a <strong>C-Corp</strong> é ideal se você planeja captar investimento de VCs ou investidores-anjo americanos, pois é a estrutura preferida do ecossistema de startups do Vale do Silício.</p>

      <h2>Passo a passo para abrir sua LLC</h2>
      <ol>
        <li><strong>Escolha o estado:</strong> Delaware, Wyoming e Florida são os favoritos dos brasileiros. Delaware tem o sistema jurídico mais maduro para negócios.</li>
        <li><strong>Defina o nome:</strong> Verifique a disponibilidade no site do estado escolhido.</li>
        <li><strong>Contrate um Registered Agent:</strong> Obrigatório em todos os estados. Custo médio: $50–$300/ano.</li>
        <li><strong>Registre os Articles of Organization:</strong> Taxa varia de $50 (Wyoming) a $90 (Delaware).</li>
        <li><strong>Obtenha o EIN:</strong> O CNPJ americano. Brasileiros sem SSN precisam solicitar via formulário SS-4 por fax ou correio.</li>
        <li><strong>Abra a conta bancária:</strong> Mercury, Relay e Novo são as opções mais acessíveis para não-residentes.</li>
      </ol>

      <h2>Impostos: o que você precisa saber</h2>
      <p>Uma LLC de único membro pertencente a estrangeiro não-residente <strong>não paga imposto federal</strong> sobre lucros gerados fora dos EUA. Porém, se você tiver clientes americanos, é preciso analisar caso a caso.</p>
      <p>Consulte sempre um CPA (contador americano) antes de tomar qualquer decisão tributária.</p>

      <h2>Conclusão</h2>
      <p>Abrir uma empresa nos EUA é mais simples do que parece e pode ser feito 100% online, sem precisar viajar. O custo inicial pode ser inferior a $500. A pergunta real não é "se" você deve abrir, mas "quando".</p>
    `,
  },
  {
    slug: "visto-eb2-niw-guia-completo",
    title: "Visto EB-2 NIW: A Via Verde para o Green Card sem Patrocinador",
    excerpt: "Entenda como o National Interest Waiver permite que profissionais altamente qualificados obtenham o Green Card sem precisar de um empregador americano.",
    category: "Vistos",
    author: "Manual do Brasileiro",
    authorRole: "Redação",
    date: "2025-05-28",
    readTime: 15,
    imageUrl: "https://images.unsplash.com/photo-1555861496-0666c8981751?w=800&q=80",
    views: 6210,
    content: `
      <h2>O que é o EB-2 NIW?</h2>
      <p>O EB-2 NIW (National Interest Waiver) é uma categoria de visto de imigrante que permite dispensar o requisito de oferta de emprego e a certificação trabalhista (PERM) — desde que você comprove que seu trabalho é de interesse nacional para os Estados Unidos.</p>

      <h2>Quem pode se qualificar?</h2>
      <p>Para o NIW, você precisa atender a dois critérios principais:</p>
      <ul>
        <li>Possuir um grau avançado (mestrado ou doutorado) ou habilidade excepcional na sua área</li>
        <li>Demonstrar que sua atuação beneficia o interesse nacional dos EUA</li>
      </ul>

      <h2>O teste Dhanasar: os 3 pilares</h2>
      <p>Desde 2016, o USCIS avalia petições NIW com base em três critérios:</p>
      <ol>
        <li>O empreendimento proposto tem mérito substancial e importância nacional</li>
        <li>Você está bem posicionado para avançar esse empreendimento</li>
        <li>É benéfico para os EUA dispensar os requisitos de oferta de emprego</li>
      </ol>

      <h2>Documentação necessária</h2>
      <p>Uma petição NIW forte inclui: cartas de recomendação de especialistas renomados, publicações e citações, prêmios e reconhecimentos, evidências de impacto do seu trabalho e um business plan detalhado se for empreendedor.</p>
    `,
  },
  {
    slug: "conta-bancaria-nos-eua-para-brasileiros",
    title: "Como Abrir Conta Bancária nos EUA sem Visto Permanente",
    excerpt: "Guia prático sobre as melhores opções de conta bancária americana para brasileiros: Mercury, Wise, Relay e os bancos tradicionais.",
    category: "Finanças",
    author: "Manual do Brasileiro",
    authorRole: "Redação",
    date: "2025-05-15",
    readTime: 8,
    imageUrl: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&q=80",
    views: 3890,
    content: `
      <h2>Preciso estar nos EUA para abrir conta?</h2>
      <p>Não necessariamente. Existem opções excelentes que permitem abrir contas bancárias americanas de forma totalmente remota, sem precisar de SSN ou visto de residência.</p>

      <h2>Mercury Bank: o favorito dos empreendedores</h2>
      <p>O Mercury é ideal para quem tem uma empresa americana (LLC ou C-Corp). Não cobra tarifas mensais, oferece cartão de débito/crédito e tem uma interface moderna. Não requer SSN — apenas os documentos da sua empresa.</p>

      <h2>Wise (ex-TransferWise)</h2>
      <p>A Wise oferece uma conta com número de routing e conta americanos reais, permitindo receber pagamentos como se fosse uma conta local. Perfeita para freelancers e quem ainda não tem empresa aberta.</p>

      <h2>Bancos tradicionais</h2>
      <p>Chase, Bank of America e Wells Fargo aceitam abrir contas para não-residentes, mas geralmente exigem presença física em uma agência com passaporte e comprovante de endereço americano.</p>
    `,
  },
  {
    slug: "mercado-de-trabalho-eua-para-brasileiros",
    title: "Mercado de Trabalho nos EUA: O Que Todo Brasileiro Precisa Saber",
    excerpt: "Como funciona a busca por emprego nos Estados Unidos, quais vistos permitem trabalhar e as diferenças culturais que podem fazer você se destacar.",
    category: "Trabalho",
    author: "Manual do Brasileiro",
    authorRole: "Redação",
    date: "2025-04-22",
    readTime: 10,
    imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    views: 5120,
    content: `
      <h2>Vistos que autorizam trabalho nos EUA</h2>
      <p>Nem todo visto permite que você trabalhe nos EUA. Os principais são: H-1B (trabalho especializado), L-1 (transferência intraempresarial), O-1 (habilidade extraordinária) e o Green Card em suas diversas categorias.</p>

      <h2>O mercado americano vs. o brasileiro</h2>
      <p>A cultura de trabalho americana é mais direta e orientada a resultados. O networking é fundamental — estima-se que 70-80% das vagas nos EUA são preenchidas por indicação, sem nunca serem publicadas.</p>

      <h2>LinkedIn: sua vitrine global</h2>
      <p>Ter um perfil otimizado no LinkedIn é essencial. Inclua um headline atrativo, experiências quantificadas em inglês e peça recomendações de ex-colegas e chefes.</p>
    `,
  },
  {
    slug: "viver-nos-eua-o-que-ninguem-te-conta",
    title: "Viver nos EUA: O Que Ninguém Te Conta Antes de Você ir",
    excerpt: "As realidades da vida americana que os guias turísticos omitem: saúde, educação, custo de vida real e o choque cultural que todo brasileiro enfrenta.",
    category: "Vida nos EUA",
    author: "Manual do Brasileiro",
    authorRole: "Redação",
    date: "2025-04-10",
    readTime: 14,
    imageUrl: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80",
    views: 7830,
    content: `
      <h2>O plano de saúde: seu maior desafio</h2>
      <p>O sistema de saúde americano é o maior choque para brasileiros. Sem seguro, uma consulta simples pode custar $300, uma internação pode chegar a dezenas de milhares de dólares. O plano de saúde é, literalmente, uma questão de sobrevivência financeira.</p>

      <h2>O custo real de vida por cidade</h2>
      <p>New York e San Francisco são as mais caras, mas cidades como Austin, Nashville, Raleigh e Charlotte oferecem qualidade de vida alta com custo significativamente menor. O aluguel é o maior item do orçamento na maioria das cidades.</p>

      <h2>Carro: uma necessidade, não um luxo</h2>
      <p>Fora de New York, Boston e Chicago, o transporte público é precário. Um carro é praticamente obrigatório. E com isso vem: seguro, manutenção, gasolina e, nas cidades maiores, estacionamento.</p>

      <h2>A saudade que ninguém prevê</h2>
      <p>Brasileiros são reconhecidos mundialmente pela sociabilidade. A cultura americana é mais individualista. Criar uma rede social sólida leva tempo. Invista nisso desde o primeiro dia: igrejas brasileiras, clubes esportivos, grupos de expatriados.</p>
    `,
  },
  {
    slug: "planejamento-financeiro-antes-de-emigrar",
    title: "Planejamento Financeiro: O Que Fazer nos 12 Meses Antes de Emigrar",
    excerpt: "Um checklist financeiro completo para brasileiros que planejam se mudar para os EUA: reserva de emergência, remessas, câmbio e muito mais.",
    category: "Planejamento",
    author: "Manual do Brasileiro",
    authorRole: "Redação",
    date: "2025-03-18",
    readTime: 11,
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    views: 3240,
    content: `
      <h2>A regra dos 6 meses de reserva</h2>
      <p>Antes de emigrar, o ideal é ter pelo menos 6 meses de despesas nos EUA guardados em dólar. Nos primeiros meses, você terá gastos extraordinários: depósito de aluguel, montagem do apartamento, compra de carro, entre outros.</p>

      <h2>Como enviar dinheiro do Brasil para os EUA</h2>
      <p>Evite os bancos tradicionais brasileiros para remessas. As melhores opções são Wise, Remessa Online e Nomad — todas com taxas muito menores e câmbio próximo ao comercial.</p>

      <h2>Declare seus bens ao Banco Central</h2>
      <p>Brasileiros com mais de $1 milhão em bens no exterior são obrigados a declarar ao Banco Central (CBE). Não negligencie a burocracia fiscal dos dois países.</p>
    `,
  },
  {
    slug: "visto-h1b-como-funciona",
    title: "Visto H-1B: Como Funciona o Processo de Loteria e o Que Fazer se Perder",
    excerpt: "Entenda o processo do H-1B, como aumentar suas chances no sorteio e quais alternativas existem para profissionais de TI e engenharia.",
    category: "Vistos",
    author: "Manual do Brasileiro",
    authorRole: "Redação",
    date: "2025-03-05",
    readTime: 9,
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    views: 4560,
    content: `
      <h2>O que é o H-1B?</h2>
      <p>O H-1B é o visto de trabalho mais comum para profissionais altamente qualificados nos EUA. É patrocinado pelo empregador e tem validade inicial de 3 anos, renovável por mais 3.</p>

      <h2>A loteria anual</h2>
      <p>Há apenas 85.000 vistos disponíveis por ano (65.000 regulares + 20.000 para mestres americanos) para centenas de milhares de candidatos. O sorteio acontece em março/abril para início em outubro.</p>

      <h2>Alternativas ao H-1B</h2>
      <ul>
        <li><strong>O-1:</strong> Para quem tem habilidade extraordinária comprovada</li>
        <li><strong>L-1:</strong> Para transferência dentro da mesma empresa multinacional</li>
        <li><strong>EB-2 NIW:</strong> Green Card direto sem patrocinador (para qualificados)</li>
        <li><strong>Canadá como stepping stone:</strong> Obter o PR canadense e então buscar vagas nos EUA</li>
      </ul>
    `,
  },
  {
    slug: "educacao-filhos-nos-eua",
    title: "Educação dos Filhos nos EUA: Public School, Private e Homeschooling",
    excerpt: "Como funciona o sistema educacional americano, como escolher a melhor escola para seus filhos e o que esperar da adaptação linguística.",
    category: "Educação",
    author: "Manual do Brasileiro",
    authorRole: "Redação",
    date: "2025-02-20",
    readTime: 10,
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
    views: 2890,
    content: `
      <h2>Public Schools: gratuitas e obrigatórias</h2>
      <p>As escolas públicas americanas são gratuitas para todos os residentes, independentemente do status migratório. A qualidade varia enormemente por distrito — e a escolha do bairro onde morar impacta diretamente a escola disponível.</p>

      <h2>A adaptação linguística das crianças</h2>
      <p>Crianças até 12 anos tipicamente aprendem inglês em 6-12 meses de imersão. Adolescentes podem levar mais tempo. Muitas escolas têm programas ESL (English as a Second Language) para auxiliar na transição.</p>

      <h2>Private Schools e Homeschooling</h2>
      <p>As escolas particulares nos EUA custam em média $10.000-$40.000 por ano. O homeschooling é legal em todos os estados e tem crescido muito, especialmente entre famílias imigrantes que querem manter a língua e cultura de origem.</p>
    `,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getFeaturedArticle(): Article {
  return articles.find((a) => a.featured) ?? articles[0];
}

export function getArticlesByCategory(category: string): Article[] {
  if (category === "Todos") return articles;
  return articles.filter((a) => a.category === category);
}

export function getMostRead(limit = 4): Article[] {
  return [...articles].sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, limit);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
}
