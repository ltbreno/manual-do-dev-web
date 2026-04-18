export interface AssessmentOption {
    value: string;
    label: string;
    points: number;
}

export interface AssessmentQuestion {
    id: string;
    label: string;
    options: AssessmentOption[];
}

export interface AssessmentModule {
    id: string;
    title: string;
    description: string;
    weight: number;
    questions: AssessmentQuestion[];
}

export const businessAssessmentModules: AssessmentModule[] = [
    {
        id: "ifi",
        title: "MÓDULO IFI™ — Índice de Força do Fundador e Intenção",
        description: "Alinhamento e visão do fundador para a expansão (Peso: 20%).",
        weight: 0.20,
        questions: [
            {
                id: "q1",
                label: "Q1 — Alinhamento Societário",
                options: [
                    { value: "q1_1", label: "Sócios discordam sobre a expansão.", points: 1 },
                    { value: "q1_3", label: "Sócios concordam verbalmente, mas sem orçamento definido.", points: 3 },
                    { value: "q1_5", label: "Acordo formal assinado com orçamento de guerra e papéis definidos.", points: 5 },
                ],
            },
            {
                id: "q2",
                label: "Q2 — Dependência do Fundador (Operação)",
                options: [
                    { value: "q2_1", label: "Se eu ficar 15 dias fora, a empresa para.", points: 1 },
                    { value: "q2_3", label: "A equipe toca o dia a dia, mas eu aprovo pagamentos e vendas grandes.", points: 3 },
                    { value: "q2_5", label: "A empresa cresce e opera 100% sem a minha presença física.", points: 5 },
                ],
            },
            {
                id: "q3",
                label: "Q3 — Due Diligence Familiar",
                options: [
                    { value: "q3_1", label: "Minha família não quer ir ou não sabe dos desafios reais.", points: 1 },
                    { value: "q3_3", label: "Estão dispostos a ir, mas acham que será “férias na Disney”.", points: 3 },
                    { value: "q3_5", label: "Alinhamento total, com orçamento de adaptação e expectativas reais.", points: 5 },
                ],
            },
            {
                id: "q4",
                label: "Q4 — Fluência Cultural e Idioma",
                options: [
                    { value: "q4_1", label: "Não falo inglês e não conheço a cultura de negócios dos EUA.", points: 1 },
                    { value: "q4_3", label: "Falo inglês intermediário, mas nunca negociei com americanos.", points: 3 },
                    { value: "q4_5", label: "Fluência total e experiência prévia em negociações no mercado americano.", points: 5 },
                ],
            },
            {
                id: "q5",
                label: "Q5 — Motivação da Expansão",
                options: [
                    { value: "q5_1", label: "Fuga do Brasil (política/economia) ou status social.", points: 1 },
                    { value: "q5_3", label: "Diversificação de receita e proteção cambial.", points: 3 },
                    { value: "q5_5", label: "Domínio de mercado e escala global estratégica.", points: 5 },
                ],
            },
            {
                id: "q6",
                label: "Q6 — Resiliência Emocional",
                options: [
                    { value: "q6_1", label: "Desisto fácil quando os planos dão errado.", points: 1 },
                    { value: "q6_3", label: "Consigo pivotar, mas sofro muito desgaste emocional.", points: 3 },
                    { value: "q6_5", label: "Alta tolerância à frustração e capacidade de recomeçar do zero.", points: 5 },
                ],
            },
            {
                id: "q7",
                label: "Q7 — Visão de Longo Prazo",
                options: [
                    { value: "q7_1", label: "Quero resultados e lucro nos primeiros 6 meses.", points: 1 },
                    { value: "q7_3", label: "Entendo que pode levar de 1 a 2 anos para empatar.", points: 3 },
                    { value: "q7_5", label: "Tenho fôlego e visão para um projeto de 3 a 5 anos.", points: 5 },
                ],
            },
            {
                id: "q8",
                label: "Q8 — Networking de Alto Nível",
                options: [
                    { value: "q8_1", label: "Não conheço ninguém no meu setor nos EUA.", points: 1 },
                    { value: "q8_3", label: "Tenho alguns contatos brasileiros que moram lá.", points: 3 },
                    { value: "q8_5", label: "Tenho acesso a decision makers americanos no meu nicho.", points: 5 },
                ],
            },
        ],
    },
    {
        id: "iee",
        title: "MÓDULO IEE™ — Índice de Estrutura Empresarial",
        description: "Estrutura interna da empresa e capacidade de gestão (Peso: 30%).",
        weight: 0.30,
        questions: [
            {
                id: "q9",
                label: "Q9 — Documentação de Processos (SOPs)",
                options: [
                    { value: "q9_1", label: "Tudo está na cabeça das pessoas.", points: 1 },
                    { value: "q9_3", label: "Temos manuais básicos, mas poucos usam.", points: 3 },
                    { value: "q9_5", label: "SOPs documentados, atualizados e seguidos rigorosamente.", points: 5 },
                ],
            },
            {
                id: "q10",
                label: "Q10 — Liderança de Segunda Camada",
                options: [
                    { value: "q10_1", label: "Não tenho gerentes ou diretores confiáveis.", points: 1 },
                    { value: "q10_3", label: "Tenho gerentes, mas eles ainda dependem de mim para decisões difíceis.", points: 3 },
                    { value: "q10_5", label: "Diretoria autônoma que toma decisões estratégicas sem mim.", points: 5 },
                ],
            },
            {
                id: "q11",
                label: "Q11 — Cultura de Accountability",
                options: [
                    { value: "q11_1", label: "A culpa é sempre do outro; foco em desculpas.", points: 1 },
                    { value: "q11_3", label: "As pessoas assumem erros, mas os processos não mudam.", points: 3 },
                    { value: "q11_5", label: "Cultura de SLA, métricas claras e responsabilidade extrema.", points: 5 },
                ],
            },
            {
                id: "q12",
                label: "Q12 — Tecnologia e Sistemas",
                options: [
                    { value: "q12_1", label: "Usamos planilhas soltas e WhatsApp para gestão.", points: 1 },
                    { value: "q12_3", label: "Temos ERP/CRM, mas subutilizados.", points: 3 },
                    { value: "q12_5", label: "Sistemas integrados que fornecem dados em tempo real.", points: 5 },
                ],
            },
            {
                id: "q13",
                label: "Q13 — Capacidade de Contratação",
                options: [
                    { value: "q13_1", label: "Contratamos por indicação e urgência.", points: 1 },
                    { value: "q13_3", label: "Temos um RH básico, mas erramos muito nas contratações.", points: 3 },
                    { value: "q13_5", label: "Máquina de atração e retenção de talentos validada.", points: 5 },
                ],
            },
            {
                id: "q14",
                label: "Q14 — Treinamento (Onboarding)",
                options: [
                    { value: "q14_1", label: "O funcionário novo aprende “na marra”.", points: 1 },
                    { value: "q14_3", label: "Temos uma semana de integração básica.", points: 3 },
                    { value: "q14_5", label: "Universidade corporativa interna com ramp-up previsível.", points: 5 },
                ],
            },
            {
                id: "q15",
                label: "Q15 — Gestão de Qualidade",
                options: [
                    { value: "q15_1", label: "A qualidade varia dependendo de quem faz o serviço.", points: 1 },
                    { value: "q15_3", label: "Temos controle de qualidade, mas falha em picos de demanda.", points: 3 },
                    { value: "q15_5", label: "Qualidade padronizada e auditada constantemente.", points: 5 },
                ],
            },
            {
                id: "q16",
                label: "Q16 — Escalabilidade do Modelo",
                options: [
                    { value: "q16_1", label: "Para crescer 2x, preciso dobrar a equipe e o esforço.", points: 1 },
                    { value: "q16_3", label: "Consigo crescer com algum ganho de margem.", points: 3 },
                    { value: "q16_5", label: "Modelo altamente escalável (tecnologia/processos) com custo marginal decrescente.", points: 5 },
                ],
            },
        ],
    },
    {
        id: "ivg",
        title: "MÓDULO IVG™ — Índice de Validação de Go-toMarket",
        description: "Validação de mercado, produto e canais de distribuição (Peso: 30%).",
        weight: 0.30,
        questions: [
            {
                id: "q17",
                label: "Q17 — Validação de Demanda (Go-toMarket)",
                options: [
                    { value: "q17_1", label: "Acho que vão comprar porque é sucesso no Brasil.", points: 1 },
                    { value: "q17_3", label: "Fizemos pesquisas de mercado e entrevistas.", points: 3 },
                    { value: "q17_5", label: "Já temos clientes pagantes ou cartas de intenção nos EUA.", points: 5 },
                ],
            },
            {
                id: "q18",
                label: "Q18 — Diferenciação Competitiva",
                options: [
                    { value: "q18_1", label: "Somos mais baratos que os americanos.", points: 1 },
                    { value: "q18_3", label: "Temos um produto similar com atendimento melhor.", points: 3 },
                    { value: "q18_5", label: "Temos tecnologia proprietária ou diferencial único difícil de copiar.", points: 5 },
                ],
            },
            {
                id: "q19",
                label: "Q19 — Adaptação Regulatória (Compliance)",
                options: [
                    { value: "q19_1", label: "Não sei quais são as leis do meu setor nos EUA.", points: 1 },
                    { value: "q19_3", label: "Fizemos uma pesquisa básica no Google.", points: 3 },
                    { value: "q19_5", label: "Auditoria jurídica completa realizada por advogados americanos.", points: 5 },
                ],
            },
            {
                id: "q20",
                label: "Q20 — Inteligência Geográfica (Ecossistema)",
                options: [
                    { value: "q20_1", label: "Vou para a Flórida porque gosto do clima.", points: 1 },
                    { value: "q20_3", label: "Escolhi o estado com base em impostos menores.", points: 3 },
                    { value: "q20_5", label: "Escolha baseada em matriz de talentos, logística, incentivos e clientes.", points: 5 },
                ],
            },
            {
                id: "q21",
                label: "Q21 — Custo de Aquisição de Clientes (CAC)",
                options: [
                    { value: "q21_1", label: "Não sei quanto custa adquirir um cliente nos EUA.", points: 1 },
                    { value: "q21_3", label: "Tenho uma estimativa baseada no CAC do Brasil convertido em dólar.", points: 3 },
                    { value: "q21_5", label: "CAC validado através de campanhas de teste no mercado americano.", points: 5 },
                ],
            },
            {
                id: "q22",
                label: "Q22 — Adaptação de Produto/Serviço",
                options: [
                    { value: "q22_1", label: "Vou vender exatamente o mesmo produto do Brasil, só traduzido.", points: 1 },
                    { value: "q22_3", label: "Fizemos pequenas adaptações de embalagem/formato.", points: 3 },
                    { value: "q22_5", label: "Produto totalmente reengenheirado para o padrão de consumo americano.", points: 5 },
                ],
            },
            {
                id: "q23",
                label: "Q23 — Canais de Distribuição",
                options: [
                    { value: "q23_1", label: "Vou tentar vender porta a porta ou via Instagram.", points: 1 },
                    { value: "q23_3", label: "Tenho um parceiro local que prometeu ajudar.", points: 3 },
                    { value: "q23_5", label: "Canais de distribuição B2B/B2C mapeados e contratos em negociação.", points: 5 },
                ],
            },
            {
                id: "q24",
                label: "Q24 — Concorrência Local",
                options: [
                    { value: "q24_1", label: "Não temos concorrentes diretos (ilusão).", points: 1 },
                    { value: "q24_3", label: "Conheço os grandes players, mas não os locais.", points: 3 },
                    { value: "q24_5", label: "Mapeamento profundo dos concorrentes, seus preços e fraquezas.", points: 5 },
                ],
            },
        ],
    },
    {
        id: "irce",
        title: "MÓDULO IRCE™ — Índice de Risco e Capacidade de Execução",
        description: "Análise de riscos financeiros e operacionais (Peso: 20%).",
        weight: 0.20,
        questions: [
            {
                id: "q25",
                label: "Q25 — Orçamento de Guerra (Caixa Isolado)",
                options: [
                    { value: "q25_1", label: "Vou usar o fluxo de caixa mensal da matriz para pagar a expansão.", points: 1 },
                    { value: "q25_3", label: "Tenho uma reserva, mas se acabar, pego da matriz.", points: 3 },
                    { value: "q25_5", label: "Orçamento de 18 meses 100% isolado; se acabar, a matriz não sofre.", points: 5 },
                ],
            },
            {
                id: "q26",
                label: "Q26 — Margem de Lucro da Matriz",
                options: [
                    { value: "q26_1", label: "Operamos no limite, margem muito apertada.", points: 1 },
                    { value: "q26_3", label: "Margem saudável, mas oscila com a economia.", points: 3 },
                    { value: "q26_5", label: "Alta lucratividade consistente nos últimos 3 anos.", points: 5 },
                ],
            },
            {
                id: "q27",
                label: "Q27 — Passivo Trabalhista/Tributário no Brasil",
                options: [
                    { value: "q27_1", label: "Temos muitos processos e dívidas fiscais ativas.", points: 1 },
                    { value: "q27_3", label: "Temos alguns passivos parcelados e controlados.", points: 3 },
                    { value: "q27_5", label: "Zero passivos; auditoria externa limpa.", points: 5 },
                ],
            },
            {
                id: "q28",
                label: "Q28 — Estrutura Societária Internacional",
                options: [
                    { value: "q28_1", label: "Vou abrir uma LLC no meu nome e mandar dinheiro via remessa.", points: 1 },
                    { value: "q28_3", label: "Falei com um contador para abrir a empresa mais barata.", points: 3 },
                    { value: "q28_5", label: "Estrutura Offshore/Holding desenhada para eficiência tributária e proteção.", points: 5 },
                ],
            },
            {
                id: "q29",
                label: "Q29 — Risco Cambial",
                options: [
                    { value: "q29_1", label: "Minhas despesas serão em dólar e minhas receitas em real.", points: 1 },
                    { value: "q29_3", label: "Tenho hedge cambial básico ou exporto um pouco.", points: 3 },
                    { value: "q29_5", label: "Operação estruturada para gerar receita em dólar rapidamente.", points: 5 },
                ],
            },
            {
                id: "q30",
                label: "Q30 — Engenharia de Vistos",
                options: [
                    { value: "q30_1", label: "Vou com visto de turista e depois vejo o que faço.", points: 1 },
                    { value: "q30_3", label: "Estou aplicando para um visto de estudante ou EB-2 NIW sem urgência.", points: 3 },
                    { value: "q30_5", label: "Estratégia de visto (L-1, E-2, etc.) alinhada com o plano de negócios.", points: 5 },
                ],
            },
            {
                id: "q31",
                label: "Q31 — Dependência de Clientes (Concentração)",
                options: [
                    { value: "q31_1", label: "80% do meu faturamento vem de 2 ou 3 clientes.", points: 1 },
                    { value: "q31_3", label: "Nenhum cliente representa mais de 20% da receita.", points: 3 },
                    { value: "q31_5", label: "Carteira altamente pulverizada e previsível (receita recorrente).", points: 5 },
                ],
            },
            {
                id: "q32",
                label: "Q32 — Plano de Saída (Exit Strategy)",
                options: [
                    { value: "q32_1", label: "Se der errado, eu fecho as portas e volto.", points: 1 },
                    { value: "q32_3", label: "Tenho um limite de perda financeira estabelecido.", points: 3 },
                    { value: "q32_5", label: "Plano de contingência claro com gatilhos de encerramento sem afetar a matriz.", points: 5 },
                ],
            },
        ],
    },
];

export function calculateBusinessScore(answers: Record<string, string>): {
    scores: Record<string, number>;
    normalizedScores: Record<string, number>;
    finalScore: number;
} {
    const scores: Record<string, number> = {};
    const normalizedScores: Record<string, number> = {};
    let finalScore = 0;

    for (const module of businessAssessmentModules) {
        let moduleScore = 0;
        for (const question of module.questions) {
            const answerId = answers[question.id];
            const answer = question.options.find(o => o.value === answerId);
            if (answer) {
                moduleScore += answer.points;
            }
        }
        
        scores[module.id] = moduleScore;
        
        // Passo 2 — Normalização 0 a 100
        // Score do Módulo = ((Soma Bruta - 8) / 32) × 100
        const normalizedScore = ((moduleScore - 8) / 32) * 100;
        normalizedScores[module.id] = Math.max(0, Math.min(100, normalizedScore)); // Clamp between 0 and 100
        
        // Passo 3 — Score Final Ponderado
        // Score Final = (IFI × 0,20) + (IEE × 0,30) + (IVG × 0,30) + (IRCE × 0,20)
        finalScore += normalizedScores[module.id] * module.weight;
    }

    return {
        scores,
        normalizedScores,
        finalScore: Math.round(finalScore)
    };
}
