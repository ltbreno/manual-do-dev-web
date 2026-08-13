export const metadata = {
  title: "Política de Privacidade — Manual do Brasileiro",
  description: "Política de privacidade da plataforma Manual do Brasileiro.",
};

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-[var(--background)] px-4 pt-28 pb-16">
      <div className="max-w-3xl mx-auto prose-blog">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Política de Privacidade</h1>
        <p className="text-sm text-[var(--muted-foreground)] mb-8">Última atualização: agosto de 2026</p>

        <h2>1. Dados que coletamos</h2>
        <p>
          Coletamos informações fornecidas diretamente por você, como nome, e-mail, telefone e respostas do
          formulário de diagnóstico ("Raio-X"), além de dados técnicos básicos de navegação (endereço IP, tipo de
          navegador, páginas visitadas).
        </p>

        <h2>2. Como usamos seus dados</h2>
        <ul>
          <li>Criar e autenticar sua conta na plataforma;</li>
          <li>Gerar e enviar seu diagnóstico personalizado por e-mail;</li>
          <li>Enviar conteúdo da newsletter, caso você se inscreva;</li>
          <li>Melhorar a experiência e o conteúdo do site;</li>
          <li>Cumprir obrigações legais e regulatórias.</li>
        </ul>

        <h2>3. Compartilhamento de dados</h2>
        <p>
          Não vendemos seus dados pessoais. Podemos compartilhar informações com prestadores de serviço que nos
          ajudam a operar a plataforma (como provedores de e-mail e hospedagem), sempre sob obrigações de
          confidencialidade.
        </p>

        <h2>4. Cookies</h2>
        <p>
          Utilizamos cookies essenciais para manter sua sessão autenticada e cookies de preferência para lembrar
          configurações da sua visita. Você pode gerenciar cookies nas configurações do seu navegador.
        </p>

        <h2>5. Segurança</h2>
        <p>
          Senhas são armazenadas de forma criptografada (hash), e o acesso à conta é protegido por sessão segura.
          Adotamos medidas técnicas razoáveis para proteger seus dados contra acesso não autorizado.
        </p>

        <h2>6. Seus direitos</h2>
        <p>
          Você pode solicitar acesso, correção ou exclusão dos seus dados pessoais a qualquer momento, entrando em
          contato conosco pelo e-mail abaixo, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
        </p>

        <h2>7. Contato</h2>
        <p>
          Dúvidas sobre esta política podem ser enviadas para{" "}
          <a href="mailto:contato@manualdobrasileiro.com">contato@manualdobrasileiro.com</a>.
        </p>
      </div>
    </div>
  );
}
