---
title: "ICM-NPU"
collection: portfolio
period: "2025.09 - 2025.10"
code_url: "https://jj1kim.github.io/portfolio/portfolio-3/"
header:
  teaser: ICM-NPU.png
---

In this project, We developed a fast yet accurate image classification model for the ImageNet2012 dataset on the given DeepX NPU. We strategically leveraged the hardware characteristics of the NPU and advanced model training techniques to maximize performance. 
For example, we analyzed the computation flow and efficiency of common operations used in image classification models, tailored to the provided DeepX NPU architecture. Also, we manually rewrited parts of an existing high-performance image classification model using onnx-graphsurgeon to replace latency-inducing ops with a better structure. Finally, we retrained a high-performance image classification model using only NPU-friendly operations and appropriate post-training quantization.
Therefore, we obtained 80% accuracy and 1.689ms latency on the single NPU board, won 3rd place in [this competition](https://www.ai-bmt.com/micro2025-competition/overview) with it.
