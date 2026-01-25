---
title: "CAD-CNN"
collection: portfolio
period: "2025.04 - 2025.06"
code_url: "https://jj1kim.github.io/portfolio/portfolio-5/"
header:
  teaser: CAD-CNN.png
---

The primary objective of this project was to design and optimize an Amaranth-based hardware system capable of performing MNIST image classification using a CNN. To achieve this, a systolic array architecture was implemented using a Finite State Machine to manage the instruction lifecycle, supported by a specialized compiler that translates matrix multiplications into machine code. Performance was significantly enhanced through four key strategies: reducing data precision to INT4 quantization to halve memory access, implementing data reuse in local buffers to save cycles on weight loading, enabling parallel memory access via multiple ports, and utilizing zero skipping to bypass unnecessary multiplications.  

The implementation proved highly successful, achieving a verified 1.0 accuracy on the MNIST dataset for all test runs. Through these architectural optimizations, the execution efficiency improved dramatically; while the baseline was 323,759 cycles, the most optimized configuration reduced this to just 752 cycles. Although the simulation overhead for managing multiple memory ports increased initial setup time, the final system met all correctness criteria while drastically cutting the total number of execution cycles required for inference.  

This project carried out as the final project for the Hardware System Design course in SNU. The code for this project is currently deprecated due to requests from the course. (will be reopened again soon)