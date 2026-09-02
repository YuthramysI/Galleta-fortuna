import Reveal from "../Reveal/Reveal";
import { ARTICLES } from "../../data/content";
import BlogArticle from "./BlogArticle";
import styles from "./BlogSection.module.css";

function BlogSection() {
  return (
    <section id="blog" className={styles.section} aria-labelledby="blog-heading">
      <Reveal>
        <div className={styles.head}>
          <h2 id="blog-heading" className={styles.heading}>
            Blog Esotérico
          </h2>
          <span className={styles.eyebrow}>Cuatro lecturas</span>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <p className={styles.intro}>
          Descubre cómo las energías cósmicas, la astrología y la sabiduría ancestral se
          entrelazan para revelar secretos profundos sobre nuestro destino.
        </p>
      </Reveal>
      {ARTICLES.map((article) => (
        <BlogArticle key={article.title} article={article} />
      ))}
    </section>
  );
}

export default BlogSection;
