import { useState } from "react";
import Reveal from "../Reveal/Reveal";
import styles from "./BlogSection.module.css";

function BlogArticle({ article }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal>
      <article className={styles.article}>
        <p className={styles.numeral} aria-hidden="true">
          {article.numeral}
        </p>
        <div>
          <p className={styles.kicker}>{article.subtitle}</p>
          <h3 className={styles.title}>{article.title}</h3>
          <p className={styles.body}>{article.content}</p>
          {open && <p className={styles.more}>{article.moreContent}</p>}
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Leer menos" : "Leer más"}
          </button>
        </div>
      </article>
    </Reveal>
  );
}

export default BlogArticle;
