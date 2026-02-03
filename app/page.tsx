'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Navbar scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Fade-in on scroll animation
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mqebrnke', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-brand">
            <Image
              src="/logo.png"
              alt="CineTax"
              width={200}
              height={75}
              className="navbar-logo"
              priority
              quality={100}
              unoptimized
              style={{ objectFit: 'contain' }}
            />
            <span className="navbar-slogan">Seu imposto em cena.</span>
          </div>
          <a href="#hero-form" className="btn-cta">
            Falar com Especialista
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="grid-pattern"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>TaxTech para o Audiovisual</span>
            </div>
            <p className="hero-cav-intro">Você conhece o Certificado de Investimento Audiovisual (CAV)?</p>
            <h1 className="hero-title">
              Reduza sua carga tributária investindo em produções audiovisuais
            </h1>
            <p className="hero-subtitle">
              Abatimento como despesa operacional + Dedução total do IRPJ + Retorno potencial. Com a CineTax, você ganha para investir. Descubra o lucro escondido na sua declaração.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-value">100%</div>
                <div className="stat-label">Abatimento como Despesa Operacional</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">100%</div>
                <div className="stat-label">Dedução do IRPJ</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">3X</div>
                <div className="stat-label">Vantagens Fiscais</div>
              </div>
            </div>
          </div>

          <div className="hero-form-wrapper" id="hero-form">
            <h3 className="hero-form-title">Solicite acesso antecipado</h3>
            <p className="hero-form-desc">
              Seja um dos primeiros a utilizar nossa plataforma e otimizar sua estratégia fiscal.
            </p>
            <form className="hero-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nome completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Seu nome"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail corporativo</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="seu@empresa.com.br"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="company">Empresa</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Nome da empresa"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="comments">Comentários ou observações (opcional)</label>
                <textarea
                  id="comments"
                  name="comments"
                  placeholder="Conte-nos um pouco sobre seu interesse ou tire suas dúvidas"
                  rows={4}
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit" disabled={formStatus === 'loading'}>
                  {formStatus === 'loading' ? 'Enviando...' :
                    formStatus === 'success' ? '✓ Enviado com sucesso!' :
                      'Quero Acesso Antecipado'}
                </button>

                <a
                  href="https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20investimento%20em%20CAV"
                  className="btn-whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </a>
              </div>

              {formStatus === 'success' && (
                <p className="form-success">
                  ✓ Obrigado! Entraremos em contato em breve.
                </p>
              )}

              {formStatus === 'error' && (
                <p className="form-error">
                  ✗ Erro no envio. Tente novamente.
                </p>
              )}

              {formStatus === 'idle' && (
                <p className="form-disclaimer">
                  Ao enviar, você concorda com nossa Política de Privacidade.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Value Proposition Section - Understand Real Value */}
      <section className="value-proposition">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-eyebrow">💰 O Lucro Escondido</span>
            <h2 className="section-title">Entenda o Valor Real do Investimento em CAV</h2>
            <p className="section-desc">
              Muito além da dedução do IRPJ: esta estratégia fiscal completa transforma seus impostos em investimento rentável.
            </p>
          </div>

          <div className="value-example">
            <div className="example-header">
              <h3>Exemplo prático: Investimento de R$ 100.000</h3>
              <p>Veja como funciona a tripla vantagem fiscal</p>
            </div>

            <div className="value-breakdown">
              <div className="value-card fade-in-left">
                <div className="value-card-number">1</div>
                <h4 className="value-card-title">Abatimento como Despesa Operacional</h4>
                <p className="value-card-desc">
                  Reduz o lucro real em <strong>R$ 100.000,00</strong>
                </p>
                <div className="value-calculation">
                  <div className="calc-item">
                    <span className="calc-label">Economia IRPJ (15%)</span>
                    <span className="calc-value">R$ 15.000,00</span>
                  </div>
                  <div className="calc-item">
                    <span className="calc-label">IRPJ Adicional (10%)*</span>
                    <span className="calc-value">R$ 10.000,00</span>
                  </div>
                  <div className="calc-total">
                    <span className="calc-label">Subtotal</span>
                    <span className="calc-value gold">R$ 25.000,00</span>
                  </div>
                </div>
                <p className="value-footnote">*Sobre lucro superior a R$ 240k/ano</p>
              </div>

              <div className="value-card fade-in">
                <div className="value-card-number">2</div>
                <h4 className="value-card-title">Dedução total do IRPJ</h4>
                <p className="value-card-desc">
                  100% dedutível do Imposto de Renda devido
                </p>
                <div className="value-calculation">
                  <div className="calc-item">
                    <span className="calc-label">Dedução IR</span>
                    <span className="calc-value">R$ 100.000,00</span>
                  </div>
                  <div className="calc-item highlight">
                    <span className="calc-label">Limite máximo</span>
                    <span className="calc-value">3% do IR devido</span>
                  </div>
                </div>
                <p className="value-benefit">✓ Valor que seria pago ao governo vai para a atividade audiovisual</p>
              </div>

              <div className="value-card fade-in-right">
                <div className="value-card-number">3</div>
                <h4 className="value-card-title">Retorno Potencial</h4>
                <p className="value-card-desc">
                  Participação nos lucros comerciais da obra
                </p>
                <div className="value-calculation">
                  <div className="calc-item">
                    <span className="calc-label">Bilheteria</span>
                    <span className="calc-value">Variável</span>
                  </div>
                  <div className="calc-item">
                    <span className="calc-label">Streaming</span>
                    <span className="calc-value">Variável</span>
                  </div>
                  <div className="calc-item">
                    <span className="calc-label">Vendas internacionais</span>
                    <span className="calc-value">Variável</span>
                  </div>
                </div>
                <p className="value-benefit">✓ ROI adicional potencial</p>
              </div>
            </div>

            <div className="value-result">
              <div className="result-box">
                <div className="result-label">Lucro Escondido</div>
                <div className="result-value">R$ 25.000,00</div>
                <p className="result-desc">
                  Após o abatimento como despesa operacional e a dedução total do imposto devido, você não só recupera 100% do investimento, mas também deixa de pagar 25% de IRPJ sobre o valor investido.
                  <br /><strong>Dessa forma, a empresa tem seu lucro garantido.</strong>
                </p>
              </div>
              <div className="result-highlight">
                <span className="highlight-icon">💡</span>
                <p>
                  <strong>Resultado:</strong> Você investe na produção audiovisual, ganha visibilidade ESG e ainda deixa de pagar uma parte do imposto. Esse é o lucro escondido que poucos conhecem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-eyebrow">🎯 Vantagens Competitivas</span>
            <h2 className="section-title">Por que investir em CAV com a CineTax?</h2>
            <p className="section-desc">
              Esta abordagem transforma obrigações fiscais em verdadeiras oportunidades de negócio, indo muito além da simples economia de impostos.
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card fade-in delay-1">
              <div className="benefit-icon">🎯</div>
              <h3 className="benefit-title">Tripla vantagem fiscal</h3>
              <p className="benefit-desc">
                Abatimento como despesa operacional + Dedução total do IRPJ + Retorno potencial. Economia gerada de 0,45% da carga tributária total. É a única modalidade de investimento que oferece todas essas vantagens.
              </p>
            </div>

            <div className="benefit-card fade-in delay-2">
              <div className="benefit-icon">💸</div>
              <h3 className="benefit-title">Lucro Escondido</h3>
              <p className="benefit-desc">
                Utilizando a tripla vantagem, você não só recupera todo o seu investimento, mas também garante lucro para sua empresa. Seus ganhos ainda podem se multiplicar com o potencial de retorno da obra audiovisual.
              </p>
            </div>

            <div className="benefit-card fade-in delay-3">
              <div className="benefit-icon">🚀</div>
              <h3 className="benefit-title">ROI + ESG + Branding</h3>
              <p className="benefit-desc">
                Além dos benefícios fiscais, você ganha participação nos lucros da obra, fortalecendo sua ESG investindo em produções audiovisuais. Múltiplos ganhos em uma única estratégia.
              </p>
            </div>
          </div>

          <div className="benefits-cta fade-in">
            <a href="#hero-form" className="btn-cta">
              Quero investir agora
            </a>
          </div>
        </div>
      </section>

      {/* Competitor Alert Section */}
      <section className="competitor-alert">
        <div className="container">
          <div className="competitor-alert-content fade-in">
            <div className="alert-icon">⚠️</div>
            <h2 className="alert-title">Você sabia que seu concorrente já investiu e largou na sua frente?</h2>
            <p className="alert-text">
              Entre em contato conosco para conferir as empresas que já utilizaram esse benefício fiscal.
            </p>
            <a href="#hero-form" className="btn-alert">
              Quero saber mais
            </a>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-eyebrow">🚀 Processo Simples</span>
            <h2 className="section-title">Como funciona</h2>
            <p className="section-desc">
              Em apenas três passos, sua empresa já estará investindo no audiovisual brasileiro.
            </p>
          </div>

          <div className="timeline">
            <div className="timeline-step fade-in-left">
              <div className="step-number"><span>1</span></div>
              <div className="step-content">
                <h4 className="step-title">Escolha o projeto</h4>
                <p className="step-desc">
                  Navegue por projetos audiovisuais aprovados pela Ancine e selecione aqueles que mais se alinham com sua estratégia.
                </p>
              </div>
            </div>

            <div className="timeline-step fade-in">
              <div className="step-number"><span>2</span></div>
              <div className="step-content">
                <h4 className="step-title">Realize o aporte</h4>
                <p className="step-desc">
                  Invista diretamente pela nossa plataforma digital, com total segurança e transparência em todo o processo.
                </p>
              </div>
            </div>

            <div className="timeline-step fade-in-right">
              <div className="step-number"><span>3</span></div>
              <div className="step-content">
                <h4 className="step-title">Receba o certificado</h4>
                <p className="step-desc">
                  Obtenha o Certificado de Investimento Audiovisual (CAV) e já está pronto para aproveitar todos os benefícios fiscais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust">
        <div className="container">
          <div className="trust-content fade-in">
            <div className="trust-icon">🛡️</div>
            <h2 className="trust-title">Segurança jurídica e conformidade total</h2>
            <p className="trust-text">
              A CineTax opera em total conformidade com a legislação brasileira, incluindo a Lei do Audiovisual (Lei nº 8.685/93), normativas da <strong>Comissão de Valores Mobiliários (CVM)</strong> e regulamentação da <strong>Agência Nacional do Cinema (ANCINE)</strong>.
              Todos os projetos disponíveis em nossa plataforma passam por rigorosa análise de compliance antes de serem oferecidos aos investidores.
            </p>
            <div className="trust-badges">
              <div className="trust-badge">
                <div className="trust-badge-icon">✓</div>
                <span className="trust-badge-text">Conformidade CVM</span>
              </div>
              <div className="trust-badge">
                <div className="trust-badge-icon">✓</div>
                <span className="trust-badge-text">Aprovação Ancine</span>
              </div>
              <div className="trust-badge">
                <div className="trust-badge-icon">✓</div>
                <span className="trust-badge-text">Lei do Audiovisual</span>
              </div>
              <div className="trust-badge">
                <div className="trust-badge-icon">✓</div>
                <span className="trust-badge-text">Auditoria Contábil</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-eyebrow">❓ Dúvidas</span>
            <h2 className="section-title">Perguntas Frequentes</h2>
            <p className="section-desc">
              Entenda tudo sobre o investimento em CAV e como sua empresa pode se beneficiar.
            </p>
          </div>

          <div className="faq-list">
            <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => setActiveFaq(activeFaq === 0 ? null : 0)}>
                <span>O que é o Certificado de Investimento Audiovisual (CAV)?</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <div>
                  <p>
                    O CAV é um título emitido por produtoras de obras audiovisuais brasileiras, que permite às empresas investidoras adquirir quotas representativas de direitos de comercialização de obras e projetos específicos da área audiovisual cinematográfica brasileira de produção independente, bem como os de exibição, distribuição e infraestrutura técnica, apresentados por empresa brasileira de capital nacional. Essa modalidade de investimento foi instituída pela Lei nº 8.685/1993, art. 1º, que garante à empresa investidora a possibilidade de abatimento do valor investido como despesa operacional e a dedução integral do IRPJ até o limite de 3% do imposto devido.
                  </p>
                </div>
              </div>
            </div>

            <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}>
                <span>Quem pode investir em CAV?</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <div>
                  <p>
                    Qualquer empresa pode investir em CAV, mas somente as empresas tributadas pelo regime de Lucro Real têm direito aos benefícios fiscais. É uma excelente opção para quem busca otimizar sua carga tributária enquanto apoia a produção audiovisual brasileira.
                  </p>
                </div>
              </div>
            </div>

            <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}>
                <span>Como funciona o benefício fiscal?</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <div>
                  <p>
                    As empresas tributadas pelo regime de lucro real podem deduzir a quantia investida do seu IRPJ até o limite de 3% do imposto de renda devido, antes do adicional, com base:
                  </p>
                  <p>
                    a) no lucro real trimestral; ou<br />
                    b) no lucro real apurado no ajuste anual.
                  </p>
                  <p>
                    A dedução também se aplica ao imposto determinado com base no lucro estimado, calculado com base na receita bruta e acréscimos. Porém, o valor deduzido do imposto com base no lucro estimado:
                  </p>
                  <p>
                    a) não será considerado imposto pago por estimativa; e<br />
                    b) deve compor o valor a ser deduzido do imposto devido no ajuste anual.
                  </p>
                  <p>
                    Eventuais excessos ao limite de 3% de dedução não poderão ser deduzidos do imposto devido em períodos de apuração posteriores.
                  </p>
                  <p>
                    <strong>Além disso, a maior vantagem:</strong> sua empresa ainda pode abater o investimento em CAV como despesa operacional para fins de determinação do lucro real. Isso significa que você deixa de pagar IRPJ sobre o valor investido, reduzindo sua carga tributária e aumentando o lucro final da empresa.
                  </p>
                </div>
              </div>
            </div>

            <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => setActiveFaq(activeFaq === 3 ? null : 3)}>
                <span>Como calculo o valor a ser investido em CAV?</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <div>
                  <p>
                    A dedução é limitada a 3% do IRPJ devido antes do adicional, portanto o imposto considerado para o cálculo é de 15%.
                  </p>
                  <p>
                    Então é só calcular o Lucro Líquido x 15% x 3%? Não! Lembre-se de que você também pode abater o valor investido para fins de determinação do Lucro Real. Logo, o cálculo deverá observar todas as vantagens fiscais:
                  </p>
                  <p>
                    <strong>Valor Investido = (Lucro Líquido - Valor Investido) x 15% x 3%</strong>
                  </p>
                  <p>
                    A partir da fórmula, você chegará ao seguinte resultado:
                  </p>
                  <p>
                    <strong>Valor Investido = Lucro Líquido x 0,44798407%</strong>
                  </p>
                  <p>
                    Dessa forma, você deverá utilizar o valor do Lucro Líquido antes do abatimento e multiplicá-lo pelo coeficiente acima para obter o valor máximo a ser investido pela empresa.
                  </p>
                </div>
              </div>
            </div>

            <div className={`faq-item ${activeFaq === 4 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => setActiveFaq(activeFaq === 4 ? null : 4)}>
                <span>Além do CAV, posso também incentivar a atividade audiovisual por meio de patrocínio com finalidade promocional?</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <div>
                  <p>
                    Sim. A Lei nº 8.685/1993 permite o incentivo a título de patrocínio em seu art. 1º-A, com dedução total do IRPJ, assim como para valores investidos em CAV. Mas há uma diferença importante: os patrocínios não permitem abatimento da despesa operacional, tendo em vista que a empresa já terá, nesse caso, o benefício decorrente do acordo promocional.
                  </p>
                  <p>
                    <strong>Portanto, para maximizar suas vantagens, recomenda-se que a empresa utilize primeiramente os investimentos em CAV, no limite de 3% do IRPJ, e em seguida complemente os incentivos com patrocínio, até o limite de 1%.</strong> O total dessas deduções não poderá exceder a 4% do imposto devido.
                  </p>
                </div>
              </div>
            </div>

            <div className={`faq-item ${activeFaq === 5 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => setActiveFaq(activeFaq === 5 ? null : 5)}>
                <span>É possível ter retorno financeiro além do benefício fiscal?</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <div>
                  <p>
                    Sim! Ao adquirir um CAV, a empresa investidora também passa a ter direito a uma participação nos resultados comerciais da obra audiovisual. Isso significa que, além do benefício fiscal imediato, há potencial de retorno financeiro caso a obra tenha sucesso comercial em bilheteria, streaming, vendas internacionais e outros canais de distribuição.
                  </p>
                </div>
              </div>
            </div>

            <div className={`faq-item ${activeFaq === 6 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => setActiveFaq(activeFaq === 6 ? null : 6)}>
                <span>Qual o papel da CineTax nesse processo?</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <div>
                  <p>
                    A CineTax é uma plataforma tecnológica que conecta empresas investidoras a projetos audiovisuais aprovados pela Ancine. Nós simplificamos todo o processo: desde a seleção de projetos até a emissão dos certificados, passando pela análise de conformidade e acompanhamento do investimento. Nossa missão é tornar o investimento no audiovisual acessível, seguro e rentável.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta">
        <div className="container">
          <h2 className="final-cta-title">
            Pronto para transformar seu IRPJ em investimento no audiovisual?
          </h2>
          <p className="final-cta-text">
            Junte-se às empresas que já descobriram o poder do audiovisual como estratégia fiscal.
          </p>
          <a href="#hero-form" className="btn-final-cta">
            Quero Começar Agora
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <Image
                src="/logo.png"
                alt="CineTax"
                width={180}
                height={68}
                className="footer-logo"
                quality={100}
                unoptimized
                style={{ objectFit: 'contain' }}
              />
              <p className="footer-desc">
                A TaxTech que conecta sua empresa ao universo audiovisual brasileiro, transformando impostos em investimento com propósito.
              </p>
              <div className="footer-social">
                <a href="#" className="social-link" aria-label="LinkedIn">in</a>
                <a href="#" className="social-link" aria-label="Instagram">📷</a>
                <a href="#" className="social-link" aria-label="Twitter">𝕏</a>
              </div>
            </div>

            <div className="footer-column">
              <h4>Plataforma</h4>
              <ul className="footer-links">
                <li><a href="#">Como Funciona</a></li>
                <li><a href="#">Projetos</a></li>
                <li><a href="#">Simulador</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Empresa</h4>
              <ul className="footer-links">
                <li><a href="#">Sobre Nós</a></li>
                <li><a href="#">Contato</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Carreiras</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Legal</h4>
              <ul className="footer-links">
                <li><a href="#">Termos de Uso</a></li>
                <li><a href="#">Política de Privacidade</a></li>
                <li><a href="#">Compliance</a></li>
                <li><a href="#">Regulamentação</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-legal">
              <p className="copyright">
                © 2026 CineTax. Todos os direitos reservados.
              </p>
              <p className="legal-text">
                Investimentos em CAV envolvem riscos. Retornos passados não são garantia de resultados futuros.
                A CineTax não presta consultoria tributária ou financeira. Consulte seu contador ou advogado
                antes de tomar decisões de investimento. Produtos sujeitos à aprovação da CVM e Ancine.
              </p>
            </div>
          </div>
        </div>
      </footer>
      <Analytics />
    </>
  );
}
