---
layout: archive
title: ""
permalink: /edu-experience/
author_profile: true
---

{% include base_path %}

Education
======
* **B.S.** in Seoul National University, 2029 (Expected)
  * Major in Computer Science & Engineering, Minor in Cvill & Environmental Engineering

* **High School Diploma** in Sejong Science High School, 2022
  * Top STEM-based school in South Korea
  * Early Graduate in 2 year (academic excellance)

Research experience
======
* Dec 2025 - Current : **Undergraduate Researcher**
  * SNU Real-Time Ubiquitous System Laboratory
  * Research about efficient computing system for Mobile SoC with Heterogeneous Accelerator
  * Supervisor : Chang-Gun Lee

* June 2025 – Nov 2025 : **Research Intern**
  * SNU Scalable Computer Architecture Laboratory
  * Research about efficient serving system for LLM using MoE
  * Supervisor : Jung Ho Ahn
  
Honors & Awards
======
* **MICRO 2025 AI Model Benchmarking Competition**, 3rd place, Oct 2025
  * Organized by IEEE/ACM International Symposium on Microarchitecture
  * Participated in MICRO 2025 held in Seoul and achieved 3rd place in the AI Benchmarking Competition
  * Developed an AI model that optimized both inference latency and accuracy for image classification tasks on the given NPU

* **HACK SNU 2025**, 1st place, Oct 2025
  * Organized by Primer, Korea's first startup accelerator
  * Participated as GPU system engineer, one of AER team
  * Developed a service that, when deployed on a GPU cluster, lets users use GPUs conveniently while also boosting overall GPU utilization

* **ESG Smartcity Startup Hackerthon**, 2nd place, Jun 2023
  * Organized by Korean Standards Association
  * Discovered untapped spatial temperature distribution data within the company’s database and proposed a data-sharing partnership with the interior design industry
  * Contributed to designing and implementing the data refinement and analysis pipeline, which led to measurable improvements in the partner company’s business model and revenue

Club Experience
======
* **Bacchus**, Mar 2024 – Current
  * Served as the president of Bacchus, a student system administration club, and oversaw the full operation of all GPU and CPU servers within the university’s Computer Science department
  * Clustered all servers with Kubernetes, Developed integrated dashboards and logging systems
  * Developed a Kubernetes-native GPU resource scheduler to automate allocation and ensure fair, efficient usage for all students in the department
  * Maintained essential student services such as account management and community platforms, incorporating ongoing feedback from administrative staff and users


* **WaffleStudio**, Sep 2023 – Jul 2025
  * Provided Kotlin Springboot training to fellow students and collaboratively developed an internal community service platform
  * Participated in the development of a software solution to provide resource-efficient isolation environments within computer systems
  * Managed system components and resources in Kubernetes infrastructure

* **SNU LikeLion**, Mar 2024 – Current
  * Educated students about infrastructure and backend development as part of a tech entrepreneurship club, SNU LiekLion
  * Held several ideathons to find real problems that can be solved by technological solutions, and based on the results, built services quickly to see how the market responds
  * Managed overall operations of the club as Administator


TA
======
* **Server System Management TA**, SNU Semiconductor Specialized University, Mar 2024 – Sep 2025
  * Participated as a member of the Semiconductor Specialized University initiative and oversaw end-to-end management of GPU servers
  * Led the deployment of GPU clusters and implemented usability-enhancing systems such as automated resource allocation and activity logging
  * Provided technical consultation for key infrastructure decisions and educated students on effective and responsible use of GPU resources

Scholarship
======
* **Full Merit Scholarship**, Hyungae Scholarship Foundation, Feb 2024 – Current
  * Received the scholarship upon being selected as one of the top 10 undergraduate students across the entire university.
  * The scholarship guarantees full tuition coverage until graduation, amounting to over $17,000 in total.
* **Full Merit Scholarship**, Seoul National University Alumni Association, Aug 2023
  * Received the scholarship as the highest-ranked student in the CS undergraduate cohort

<!-- Scroll Navigation Modal -->
<div id="scroll-nav-modal" class="scroll-nav-modal">
  <ul class="scroll-nav-list">
    <li><a href="#education-section" class="scroll-nav-link">Education</a></li>
    <li><a href="#research-experience-section" class="scroll-nav-link">Research experience</a></li>
    <li><a href="#honors-awards-section" class="scroll-nav-link">Honors & Awards</a></li>
    <li><a href="#club-experience-section" class="scroll-nav-link">Club Experience</a></li>
    <li><a href="#ta-section" class="scroll-nav-link">TA</a></li>
    <li><a href="#scholarship-section" class="scroll-nav-link">Scholarship</a></li>
  </ul>
</div>

<style>
.scroll-nav-modal {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1em;
  min-width: 180px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.scroll-nav-modal.visible {
  opacity: 1;
  visibility: visible;
}

.scroll-nav-modal:hover {
  opacity: 1;
  visibility: visible;
}

.scroll-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.scroll-nav-list li {
  margin-bottom: 0.5em;
}

.scroll-nav-list li:last-child {
  margin-bottom: 0;
}

.scroll-nav-link {
  display: block;
  color: var(--global-text-color);
  text-decoration: none;
  padding: 0.5em 0.75em;
  border-radius: 6px;
  transition: background-color 0.2s ease, color 0.2s ease;
  font-size: 0.9em;
  line-height: 1.4;
}

.scroll-nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--global-link-color);
}

html:not([data-theme="dark"]) .scroll-nav-modal {
  background-color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

html:not([data-theme="dark"]) .scroll-nav-link:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>

<script>
(function() {
  // Map section titles to IDs
  const sectionMap = {
    'Education': 'education-section',
    'Research experience': 'research-experience-section',
    'Honors & Awards': 'honors-awards-section',
    'Club Experience': 'club-experience-section',
    'TA': 'ta-section',
    'Scholarship': 'scholarship-section'
  };

  // Add IDs to h2 headings dynamically
  function addSectionIds() {
    const h2Elements = document.querySelectorAll('.archive h2');
    h2Elements.forEach(h2 => {
      const text = h2.textContent.trim();
      if (sectionMap[text]) {
        h2.id = sectionMap[text];
      }
    });
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addSectionIds);
  } else {
    addSectionIds();
  }

  const modal = document.getElementById('scroll-nav-modal');
  const links = document.querySelectorAll('.scroll-nav-link');
  let scrollTimeout;
  let isScrolling = false;
  let hideTimeout;

  // Smooth scroll to section
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 100; // Offset for better visibility
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Show modal on scroll
  function showModal() {
    if (modal) {
      modal.classList.add('visible');
      isScrolling = true;
      
      // Clear existing hide timeout
      clearTimeout(hideTimeout);
    }
  }

  // Hide modal after scroll stops
  function scheduleHide() {
    if (!modal) return;
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      // Only hide if not hovering
      if (!modal.matches(':hover')) {
        modal.classList.remove('visible');
      }
    }, 3000);
  }

  // Scroll event handler
  let scrollTimer;
  window.addEventListener('scroll', function() {
    showModal();
    
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function() {
      isScrolling = false;
      scheduleHide();
    }, 150); // Wait 150ms after scroll stops
  });

  // Keep modal visible on hover
  if (modal) {
    modal.addEventListener('mouseenter', function() {
      clearTimeout(hideTimeout);
    });

    modal.addEventListener('mouseleave', function() {
      if (!isScrolling) {
        scheduleHide();
      }
    });
  }
})();
</script>
