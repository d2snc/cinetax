'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

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
            <h1 className="hero-title">
              Reduza sua Carga Tributária em até <span className="highlight">40%</span> Investindo em Cultura
            </h1>
            <p className="hero-subtitle">
              Dedução operacional (IRPJ + CSLL) + Abatimento no IR + Retorno potencial. Com a CineTax, o custo real do seu investimento em CAV pode ser ZERO ou até negativo. Descubra o lucro escondido na sua declaração.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-value">Até 40%</div>
                <div className="stat-label">Economia Tributária Total</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">R$ 0</div>
                <div className="stat-label">Custo Real Líquido</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">3X</div>
                <div className="stat-label">Vantagens Fiscais</div>
              </div>
            </div>
          </div>

          <div className="hero-form-wrapper" id="hero-form">
            <h3 className="hero-form-title">Solicite Acesso Antecipado</h3>
            <p className="hero-form-desc">
              Seja um dos primeiros a utilizar nossa plataforma e otimizar sua estratégia fiscal.
            </p>
            <form className="hero-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nome Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Seu nome"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail Corporativo</label>
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
              <button type="submit" className="btn-submit" disabled={formStatus === 'loading'}>
                {formStatus === 'loading' ? 'Enviando...' :
                  formStatus === 'success' ? '✓ Enviado com sucesso!' :
                    'Quero Acesso Antecipado'}
              </button>

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
              Não é apenas dedução de IR. É uma estratégia fiscal completa que transforma impostos em investimento rentável.
            </p>
          </div>

          <div className="value-example">
            <div className="example-header">
              <h3>Exemplo Prático: Investimento de R$ 100.000</h3>
              <p>Veja como funciona a tripla vantagem fiscal</p>
            </div>

            <div className="value-breakdown">
              <div className="value-card fade-in-left">
                <div className="value-card-number">1</div>
                <h4 className="value-card-title">Dedução Operacional</h4>
                <p className="value-card-desc">
                  Reduz o lucro tributável em <strong>R$ 100.000</strong>
                </p>
                <div className="value-calculation">
                  <div className="calc-item">
                    <span className="calc-label">Economia IRPJ (15%)</span>
                    <span className="calc-value">R$ 15.000</span>
                  </div>
                  <div className="calc-item">
                    <span className="calc-label">Economia CSLL (9%)</span>
                    <span className="calc-value">R$ 9.000</span>
                  </div>
                  <div className="calc-item">
                    <span className="calc-label">IRPJ Adicional (10%)*</span>
                    <span className="calc-value">~R$ 10.000</span>
                  </div>
                  <div className="calc-total">
                    <span className="calc-label">Subtotal</span>
                    <span className="calc-value gold">R$ 34.000</span>
                  </div>
                </div>
                <p className="value-footnote">*Sobre lucro superior a R$ 240k/ano</p>
              </div>

              <div className="value-card fade-in">
                <div className="value-card-number">2</div>
                <h4 className="value-card-title">Abatimento Direto no IR</h4>
                <p className="value-card-desc">
                  100% dedutível do Imposto de Renda devido
                </p>
                <div className="value-calculation">
                  <div className="calc-item">
                    <span className="calc-label">Abatimento IR</span>
                    <span className="calc-value">R$ 100.000</span>
                  </div>
                  <div className="calc-item highlight">
                    <span className="calc-label">Limite máximo</span>
                    <span className="calc-value">3% do IR devido</span>
                  </div>
                </div>
                <p className="value-benefit">✓ Valor que seria pago ao governo vai para cultura</p>
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
                <div className="result-label">Custo Real Líquido</div>
                <div className="result-value">R$ 66.000 a R$ 0</div>
                <p className="result-desc">
                  Após dedução operacional de ~R$ 34k, o investimento de R$ 100k passa a custar R$ 66k. Com o abatimento do IR, esse valor pode chegar a <strong>ZERO ou até ser NEGATIVO</strong> com o retorno potencial da obra.
                </p>
              </div>
              <div className="result-highlight">
                <span className="highlight-icon">💡</span>
                <p>
                  <strong>Resultado:</strong> Você investe em cultura, ganha visibilidade ESG, e pode ter custo zero ou até lucro.
                  Esse é o lucro escondido que poucos conhecem.
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
              Não é apenas sobre pagar menos impostos. É sobre transformar obrigações fiscais em oportunidades de negócio.
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card fade-in delay-1">
              <div className="benefit-icon">🎯</div>
              <h3 className="benefit-title">Tripla Vantagem Fiscal</h3>
              <p className="benefit-desc">
                Dedução operacional (IRPJ + CSLL) + Abatimento direto no IR + Retorno potencial.
                Economia combinada de até 40% da carga tributária total. É a única modalidade de investimento que oferece benefícios fiscais triplos.
              </p>
            </div>

            <div className="benefit-card fade-in delay-2">
              <div className="benefit-icon">💸</div>
              <h3 className="benefit-title">Custo Real Zero</h3>
              <p className="benefit-desc">
                Com a dedução operacional reduzindo o custo inicial e o abatimento do IR recuperando o investimento, o desembolso líquido pode ser ZERO.
                Adicione o potencial de retorno da obra e você pode até ter lucro.
              </p>
            </div>

            <div className="benefit-card fade-in delay-3">
              <div className="benefit-icon">🚀</div>
              <h3 className="benefit-title">ROI + ESG + Branding</h3>
              <p className="benefit-desc">
                Além dos benefícios fiscais, você ganha participação nos lucros da obra, fortalece sua imagem ESG investindo em cultura,
                e pode ter seu logo aparecendo nos créditos. Múltiplos ganhos em uma única estratégia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-eyebrow">🚀 Processo Simples</span>
            <h2 className="section-title">Como Funciona</h2>
            <p className="section-desc">
              Em apenas três passos, sua empresa já estará investindo no audiovisual brasileiro.
            </p>
          </div>

          <div className="timeline">
            <div className="timeline-step fade-in-left">
              <div className="step-number"><span>1</span></div>
              <div className="step-content">
                <h4 className="step-title">Escolha o Projeto</h4>
                <p className="step-desc">
                  Navegue por projetos audiovisuais aprovados pela Ancine e selecione aqueles que mais se alinham com sua estratégia.
                </p>
              </div>
            </div>

            <div className="timeline-step fade-in">
              <div className="step-number"><span>2</span></div>
              <div className="step-content">
                <h4 className="step-title">Realize o Aporte</h4>
                <p className="step-desc">
                  Invista diretamente pela nossa plataforma digital, com total segurança e transparência em todo o processo.
                </p>
              </div>
            </div>

            <div className="timeline-step fade-in-right">
              <div className="step-number"><span>3</span></div>
              <div className="step-content">
                <h4 className="step-title">Receba o Certificado</h4>
                <p className="step-desc">
                  Obtenha o CAV - Certificado de Investimento Audiovisual para abatimento direto no cálculo do seu IR.
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
            <h2 className="trust-title">Segurança Jurídica e Conformidade Total</h2>
            <p className="trust-text">
              A CineTax opera em total conformidade com a legislação brasileira, incluindo a Lei do Audiovisual (Lei nº 8.685/93), normativas da <strong>CVM (Comissão de Valores Mobiliários)</strong> e regulamentação da <strong>ANCINE (Agência Nacional do Cinema)</strong>.
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
                <span>Qual é o custo real do investimento em CAV?</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <div>
                  <p>
                    <strong>O custo real pode ser ZERO ou até negativo.</strong> Veja como: ao investir R$ 100k em CAV, você primeiro deduz como despesa operacional, economizando ~R$ 34k em IRPJ e CSLL. Seu custo passa para R$ 66k. Depois, você abate 100% do valor (R$ 100k) do seu IR devido. Com esses dois benefícios combinados, o desembolso líquido pode chegar a zero. Adicionalmente, você ainda pode ter retorno financeiro com a participação nos lucros da obra audiovisual. É por isso que chamamos de "lucro escondido" — muitas empresas pagam impostos sem saber que poderiam reinvestir esse valor de forma inteligente.
                  </p>
                </div>
              </div>
            </div>

            <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}>
                <span>O que é CAV (Certificado de Investimento Audiovisual)?</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <div>
                  <p>
                    O CAV é um título emitido por empresas produtoras de obras audiovisuais brasileiras, que permite às empresas investidoras receber participação nos resultados comerciais da obra. O investimento em CAV pode ser deduzido do Imposto de Renda devido por empresas tributadas pelo Lucro Real, até o limite de 3% do imposto devido, conforme estabelecido pela Lei do Audiovisual (Lei nº 8.685/93).
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
                    Podem investir em CAV empresas tributadas pelo regime de Lucro Real que possuam Imposto de Renda devido. O investimento é limitado a 3% do imposto de renda devido, antes de qualquer incentivo fiscal. É uma excelente opção para empresas que buscam otimizar sua carga tributária enquanto apoiam a cultura brasileira.
                  </p>
                </div>
              </div>
            </div>

            <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => setActiveFaq(activeFaq === 3 ? null : 3)}>
                <span>Como funciona o abatimento fiscal?</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <div>
                  <p>
                    Ao investir em CAV, sua empresa pode deduzir 100% do valor investido diretamente do Imposto de Renda devido, respeitando o limite de 3% do IR antes de outros incentivos. Ou seja, o valor investido não representa um custo adicional para a empresa — é uma realocação do imposto que seria pago ao governo para o fomento do audiovisual brasileiro.
                  </p>
                </div>
              </div>
            </div>

            <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => setActiveFaq(activeFaq === 3 ? null : 3)}>
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

            <div className={`faq-item ${activeFaq === 5 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => setActiveFaq(activeFaq === 5 ? null : 5)}>
                <span>Qual o papel da CineTax nesse processo?</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <div>
                  <p>
                    A CineTax é uma plataforma tecnológica que conecta empresas investidoras a projetos audiovisuais aprovados pela Ancine. Nós simplificamos todo o processo: desde a seleção de projetos até a emissão dos certificados, passando pela análise de conformidade e acompanhamento do investimento. Nossa missão é tornar o investimento em cultura acessível, seguro e rentável.
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
            Pronto para transformar seu IR em investimento cultural?
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
    </>
  );
}
