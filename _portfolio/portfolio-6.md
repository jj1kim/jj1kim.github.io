---
title: "Hodu"
collection: portfolio
period: "2024.07 - 2024.09"
code_url: "https://github.com/wafflestudio/hodu"
header:
  teaser: hodu.png
---

Hodu is a secure, resource-efficient, and high-speed coding test grading server using custom lightweight isolation techniques. Based on open-source project “isolate” (https://github.com/ioi/isolate), we built custom sandbox to safely run untrusted executables. Also, for efficient sandbox management, we developed an internal sandbox manager maintains a prewarmed pool of isolated environments to improve performance and scalability. The whole project was developed with Rust, and we provisioned API with GRPC. In this project, we applyed Rust-specific performance optimizations and thread pool designs to safely and scalably handle sudden traffic spikes.
This project carried out as part of WaffleStudio, the student club of web developers in Seoul National University.




