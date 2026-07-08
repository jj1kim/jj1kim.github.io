---
permalink: /
title: "Jiwon Kim"
author_profile: false
redirect_from: 
  - /about/
  - /about.html
---

<style>
/* ===== Home (about) page ===== */
/* Hide the layout's auto title — a custom header is rendered below */
.page__title { display: none; }
#main { margin-top: 1.5em; }

.home-wrap {
  max-width: 50rem;
  margin: 0 auto;
}

/* Name + social icons */
.home-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem 1rem;
  margin-bottom: 0.75rem;
}
.home-name {
  margin: 0;
  font-size: 2.4rem;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--global-text-color);
}
.home-social {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}
.home-social a {
  display: inline-flex;
  color: var(--global-fig-caption-color);
  font-size: 1.35rem;
  text-decoration: none !important;
  border-bottom: none !important;
  transition: color 0.15s ease, transform 0.15s ease;
}
.home-social a:hover {
  color: var(--global-link-color);
  transform: translateY(-2px);
}

/* Objective affiliation */
.home-affiliation {
  margin: 0;
  color: var(--global-fig-caption-color);
  font-size: 1.02rem;
  line-height: 1.75;
}
.home-affiliation strong {
  color: var(--global-text-color);
  font-weight: 600;
}
.home-affiliation a {
  color: var(--global-fig-caption-color);
}

/* Photo */
.home-photo {
  display: block;              /* override the theme's flex figure so the image can center */
  margin: 2.25rem 0 1.75rem;
  text-align: center;
}
.home-photo img {
  display: block;
  width: 65%;
  max-width: 340px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
}
.home-photo figcaption {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: var(--global-fig-caption-color);
}

/* Goals / values */
.home-goals {
  font-size: 1.02rem;
  line-height: 1.8;
}
.home-goals p { margin: 0 0 1.15rem; }
.home-goals p:last-child { margin-bottom: 0; }

@media (max-width: 600px) {
  .home-name { font-size: 2rem; }
}
</style>

<div class="home-wrap">

  <div class="home-header">
    <h1 class="home-name">Jiwon Kim</h1>
    <div class="home-social">
      <a href="mailto:jeewonbob@snu.ac.kr" aria-label="Email"><i class="fas fa-envelope"></i></a>
      <a href="https://github.com/jj1kim" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i class="fab fa-github"></i></a>
      <a href="https://www.linkedin.com/in/jiwon-kim-2957712a6/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
    </div>
  </div>

  <p class="home-affiliation">
    <strong>AI Inference Engineer</strong> at <a href="https://friendli.ai/" target="_blank" rel="noopener noreferrer">FriendliAI</a><br>
    <strong>Undergraduate Researcher</strong>, Computer Science &amp; Engineering — Seoul National University<br>
    Seoul, South Korea
  </p>

  <figure class="home-photo">
    <img src="/images/new_main_image.png" alt="Jiwon Kim in front of a Japanese castle">
  </figure>

  <div class="home-goals">
    <p>I am fascinated by the belief that <strong>computing systems of extreme scales — either very large or very small — will become central to the world</strong>, and by the goal of enabling such systems to <strong>deliver high performance while faithfully reflecting the demands of the real world.</strong> Toward this, I work to solve real-world problems through both research and entrepreneurship, and I stay actively engaged with Korea's startup communities. <em>(For more about my dreams and goals, see this <a href="/posts/2025/12/25/About-My-Goal">blog post</a>.)</em></p>
    <p>If you share similar dreams or ways of thinking, I would be delighted to connect — via <a href="mailto:jeewonbob@snu.ac.kr">email</a> or any other way. Even if not, you are always welcome to reach out. You can also find more of my thoughts across my <a href="/blog/">blog posts</a>. <em>(From time to time, I also post miscellaneous writings about daily life 😊)</em></p>
  </div>

</div>
