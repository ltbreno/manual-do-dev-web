export const metadata = {
  title: "Termos de Uso — Manual do Brasileiro",
  description: "Termos de uso da plataforma Manual do Brasileiro.",
};

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] px-4 pt-28 pb-16">
      <div className="max-w-3xl mx-auto prose-blog">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Termos de Uso</h1>
        <p className="text-sm text-[var(--muted-foreground)] mb-8">Última atualização: agosto de 2026</p>

        <h2>1. Aceitação dos termos</h2>
        <p>
          Ao acessar e utilizar o Manual do Brasileiro, você concorda com estes Termos de Uso. Caso não concorde
          com alguma disposição, recomendamos que não utilize a plataforma.
        </p>

        <h2>2. Descrição do serviço</h2>
        <p>
          O Manual do Brasileiro oferece conteúdo informativo, ferramentas de autoavaliação ("Raio-X") e conteúdo
          de blog voltados a brasileiros que desejam viver, trabalhar, investir ou estudar nos Estados Unidos. As
          informações fornecidas têm caráter educacional e não substituem aconselhamento jurídico, contábil ou
          migratório profissional.
        </p>

        <h2>3. Cadastro e conta de usuário</h2>
        <p>
          Para acessar determinadas funcionalidades, pode ser necessário criar uma conta com nome, e-mail e senha.
          Você é responsável por manter a confidencialidade das suas credenciais e por todas as atividades
          realizadas em sua conta.
        </p>

        <h2>4. Uso aceitável</h2>
        <p>
          Você concorda em não utilizar a plataforma para fins ilegais, fraudulentos ou que violem direitos de
          terceiros, e em não tentar acessar áreas restritas do sistema sem autorização.
        </p>

        <h2>5. Propriedade intelectual</h2>
        <p>
          Todo o conteúdo publicado — textos, marca, layout e ferramentas — é de propriedade do Manual do
          Brasileiro ou de seus licenciadores, sendo protegido pela legislação de direitos autorais aplicável.
        </p>

        <h2>6. Limitação de responsabilidade</h2>
        <p>
          O Manual do Brasileiro não garante resultados específicos em processos migratórios, empresariais ou
          financeiros. As decisões tomadas com base no conteúdo da plataforma são de responsabilidade exclusiva do
          usuário.
        </p>

        <h2>7. Alterações nos termos</h2>
        <p>
          Estes termos podem ser atualizados periodicamente. O uso continuado da plataforma após alterações
          constitui aceitação dos novos termos.
        </p>

        <h2>8. Contato</h2>
        <p>
          Dúvidas sobre estes termos podem ser enviadas para{" "}
          <a href="mailto:contato@manualdobrasileiro.com">contato@manualdobrasileiro.com</a>.
        </p>
      </div>
    </div>
  );
}
