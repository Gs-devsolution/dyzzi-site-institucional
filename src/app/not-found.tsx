import Link from "next/link";
import styles from "@/app/cases/cases.module.css";

export default function NotFound() {
  return (
    <main className={styles.notFound}>
      <div>
        <h1>Conteúdo não encontrado</h1>
        <p>A página solicitada não existe ou ainda não está disponível.</p>
        <Link className="button button-light" href="/">
          <span className="cta-label">Voltar à página inicial</span>
        </Link>
      </div>
    </main>
  );
}
