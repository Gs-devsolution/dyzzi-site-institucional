"use client";

import {
  type KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  seoKeywordGroups,
  seoSearchGroups,
  type SeoCatalogGroup,
  type SeoCatalogTab,
} from "@/content/seo-catalog";
import styles from "@/components/seo-easter-egg.module.css";

function normalizeTerm(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}

function filterGroups(groups: readonly SeoCatalogGroup[], query: string) {
  if (!query) return groups;

  return groups.flatMap((group) => {
    const terms = group.terms.filter((item) =>
      normalizeTerm(item).includes(query),
    );

    return terms.length ? [{ ...group, terms }] : [];
  });
}

function countGroupTerms(groups: readonly SeoCatalogGroup[]) {
  return groups.reduce((total, group) => total + group.terms.length, 0);
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.75" cy="10.75" r="5.75" />
      <path d="m15 15 4.25 4.25" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6.5 6.5 11 11M17.5 6.5l-11 11" />
    </svg>
  );
}

export function SeoEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SeoCatalogTab>("phrases");
  const [query, setQuery] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const normalizedQuery = normalizeTerm(query.trim());
  const phraseGroups = useMemo(
    () => filterGroups(seoSearchGroups, normalizedQuery),
    [normalizedQuery],
  );
  const keywordGroups = useMemo(
    () => filterGroups(seoKeywordGroups, normalizedQuery),
    [normalizedQuery],
  );

  const activeCount =
    activeTab === "phrases"
      ? countGroupTerms(phraseGroups)
      : countGroupTerms(keywordGroups);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      window.requestAnimationFrame(() => closeRef.current?.focus());
      return;
    }

    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  function closeDialog() {
    setIsOpen(false);
  }

  function handleDialogClose() {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    const nextTab: SeoCatalogTab =
      activeTab === "phrases" ? "keywords" : "phrases";
    setActiveTab(nextTab);
    document.getElementById(`seo-tab-${nextTab}`)?.focus();
  }

  return (
    <>
      <div className={styles.dock}>
        <button
          ref={triggerRef}
          className={styles.trigger}
          type="button"
          aria-label="Abrir mapa SEO de soluções da DYZZI"
          aria-haspopup="dialog"
          aria-controls="seo-discovery-dialog"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
        >
          <span>SEO</span>
        </button>
      </div>

      <dialog
        ref={dialogRef}
        id="seo-discovery-dialog"
        className={styles.dialog}
        aria-labelledby="seo-dialog-title"
        aria-describedby="seo-dialog-description"
        onCancel={closeDialog}
        onClose={handleDialogClose}
        onKeyDown={(event) => {
          if (event.key !== "Escape") return;
          event.preventDefault();
          closeDialog();
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeDialog();
        }}
      >
        <div className={styles.panel}>
          <div className={styles.orbit} aria-hidden="true" />
          <header className={styles.header}>
            <div>
              <p className={styles.eyebrow}>Easter egg · DYZZI Discovery</p>
              <h2 id="seo-dialog-title">Encontre a solução certa</h2>
              <p id="seo-dialog-description" className={styles.intro}>
                Explore serviços, especialidades e buscas relacionadas ao que a
                DYZZI desenvolve para marcas e empresas.
              </p>
            </div>
            <button
              ref={closeRef}
              className={styles.close}
              type="button"
              aria-label="Fechar mapa de soluções"
              onClick={closeDialog}
            >
              <CloseIcon />
            </button>
          </header>

          <div className={styles.tools}>
            <div className={styles.tabs} role="tablist" aria-label="Categorias">
              <button
                id="seo-tab-phrases"
                type="button"
                role="tab"
                aria-selected={activeTab === "phrases"}
                aria-controls="seo-panel-phrases"
                tabIndex={activeTab === "phrases" ? 0 : -1}
                onClick={() => setActiveTab("phrases")}
                onKeyDown={handleTabKeyDown}
              >
                Buscas de serviços <span>100</span>
              </button>
              <button
                id="seo-tab-keywords"
                type="button"
                role="tab"
                aria-selected={activeTab === "keywords"}
                aria-controls="seo-panel-keywords"
                tabIndex={activeTab === "keywords" ? 0 : -1}
                onClick={() => setActiveTab("keywords")}
                onKeyDown={handleTabKeyDown}
              >
                Palavras-chave <span>100</span>
              </button>
            </div>

            <label className={styles.search}>
              <span className={styles.visuallyHidden}>Filtrar termos</span>
              <SearchIcon />
              <input
                type="search"
                value={query}
                placeholder="Pesquisar no mapa"
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
          </div>

          <div className={styles.results}>
            <p className={styles.resultCount} aria-live="polite">
              {activeCount} {activeCount === 1 ? "resultado" : "resultados"}
            </p>

            <SeoTermList
              id="seo-panel-phrases"
              labelledBy="seo-tab-phrases"
              groups={phraseGroups}
              hidden={activeTab !== "phrases"}
            />
            <SeoTermList
              id="seo-panel-keywords"
              labelledBy="seo-tab-keywords"
              groups={keywordGroups}
              hidden={activeTab !== "keywords"}
            />
          </div>

          <footer className={styles.footer}>
            <span aria-hidden="true" />
            <p>
              Cada projeto começa com um briefing. A combinação ideal de
              serviços é definida de acordo com o objetivo de cada marca.
            </p>
          </footer>
        </div>
      </dialog>
    </>
  );
}

function SeoTermList({
  id,
  labelledBy,
  groups,
  hidden,
}: {
  readonly id: string;
  readonly labelledBy: string;
  readonly groups: readonly SeoCatalogGroup[];
  readonly hidden: boolean;
}) {
  return (
    <div
      id={id}
      role="tabpanel"
      aria-labelledby={labelledBy}
      hidden={hidden}
    >
      {groups.length ? (
        <div className={styles.groups}>
          {groups.map((group) => (
            <section className={styles.group} key={group.id}>
              <header className={styles.groupHeader}>
                <h3>{group.title}</h3>
                <span>{group.terms.length}</span>
              </header>
              <ol className={styles.list}>
                {group.terms.map((term, index) => (
                  <li key={term}>
                    <span aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <strong>{term}</strong>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      ) : (
        <p className={styles.empty}>Nenhum termo encontrado nessa categoria.</p>
      )}
    </div>
  );
}
